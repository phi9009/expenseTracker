/**
 * The backbone of the expense tracker app, this component is
 * the highest elevation of state in the entire system.
 */

// actual JS dependencies
import dayjs from "dayjs";

// react, state and effect
import { useState, useEffect } from "react";

// Material UI stuff
import Box from "@mui/material/Box";
import ButtonRight from "./ButtonRight";
import ButtonLeft from "./ButtonLeft";
import Typography from "@mui/material/Typography";
import TrackedItem from "./TrackedItem";
import ItemsTotal from "./ItemsTotal";
import AddItem from "./AddItem";
import TagCharts from "./TagCharts";
import TrackStats from "./TrackStats";

// CSS import
import "./Tracker.css";

// the actual component.
export default function Tracker() {
	// initialize state
	const [trackedItems, updateItems] = useState([]);
	const [currentMonth, updateMonth] = useState(2);

	// grab the actual data from the backend
	useEffect(() => {
		fetch("./month", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				// since the data is saved so that the day.js objects get converted to the DATE format
				// convert the DATE format back into more usable Day.js objects then update state.
				const parsedData = data.map((oldItem) => {
					return { ...oldItem, date: dayjs(oldItem.date) };
				});
				updateItems(parsedData);
			})
			.catch((error) => console.log(error));
	}, []);

	// pallete used for piecharts.
	const pallete = [
		"#bb0000",
		"#00bb00",
		"#0000bb",
		"#bbbb00",
		"#880088",
		"#bb7700",
	];
	// months used to display.
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	/* DATA MANIPULATION and TALLYING  */

	// data to be handed to pie charts and other trackers.
	let budgetTotal = 0;
	let expenseTotal = 0;
	let incomeTotal = 0;
	let expenseCount = 0;
	let incomeCount = 0;
	const incomeData = [];
	const expenseData = [];

	// break down the current data to the specific month
	const monthItems = trackedItems.filter((item) => {
		return item.date.get("month") === currentMonth;
	});

	// create a list of only expenses and also total them.
	// as well as create a list of only income and total that too.
	for (let i of monthItems) {
		if (i.isExpense === true) {
			budgetTotal -= i.value;
			expenseTotal += i.value;
			expenseCount++;
			const checkExpense = expenseData.find((e) => {
				if (e.label === i.category) return true;
				else return false;
			});
			if (checkExpense) {
				checkExpense.value += i.value;
			} else {
				expenseData.push({
					id: expenseData.length,
					value: i.value,
					label: i.category,
				});
			}
		} else {
			budgetTotal += i.value;
			incomeTotal += i.value;
			incomeCount++;
			const checkIncome = incomeData.find((e) => {
				if (e.label === i.category) return true;
				else return false;
			});
			if (checkIncome) {
				checkIncome.value += i.value;
			} else {
				incomeData.push({
					id: incomeData.length,
					value: i.value,
					label: i.category,
				});
			}
		}
	}
	// sort the list after they've been created.
	if (expenseData.length > 1) {
		expenseData.sort((a, b) => {
			if (a.value < b.value) return 1;
			else if (a.value > b.value) return -1;
			else return 0;
		});
	}
	if (incomeData.length > 1) {
		incomeData.sort((a, b) => {
			if (a.value < b.value) return 1;
			else if (a.value > b.value) return -1;
			else return 0;
		});
	}

	/* STATE MANIPULATION AND SERVER QUERYING  */

	// Query's the server with a fetch request to delete a specific id
	const removeItem = (id) => {
		fetch(`./item/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				// the most cut and dry return in mongoose so I just passed it through
				// if something was deleted do the same logic on this side (it's alright
				// the tracker will refresh and query the DB again anyway)
				if (data.deletedCount > 0) {
					updateItems((prevItems) => {
						return prevItems.filter((t) => t._id !== id);
					});
				}
			})
			.catch((error) => console.log(error));
	};

	//  Query the server with a put request to update an entry with a specific id.
	const updateItem = (id, i) => {
		fetch(`./item/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(i),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.success) {
					// since mongoose will throw an error on this one if it fails
					// I sent back a json object with a value key of "success: boolean"
					updateItems((prevItems) => {
						return prevItems.map((item) => {
							if (item.id === id) {
								return i;
							} else {
								return item;
							}
						});
					});
				}
			})
			.catch((error) => console.log(error));
	};

	//  Query the server with a post request to add an entry. the only reason I have an "id" parameter
	// on this one is because it and the updateItem function are used in the same place to allow me to reuse
	// the form to update and create together, it's ignored in this one but needs to be there cause I wrote
	// the update function first and had id first in that one.
	const addItem = (id, item) => {
		fetch(`./item`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(item),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				// again I sent back the record _since it has the new _id value!
				// if it exists put it in state!
				if (data != undefined) {
					// once again. day.js objects get converted to the DATE format before
					// getting pased to Mongoose so we gotta convert back to a Day.js object before
					// working with this one again.
					updateItems((prevItems) => {
						return [...prevItems, { ...data, date: dayjs(data.date) }];
					});
				}
			})
			.catch((error) => console.log(error));
	};

	// changes the current month... seems really mundane compared to the last few asyncronous functions
	// just created
	const changeMonth = (month) => {
		if (month >= 12) month -= 12;
		if (month < 0) month += 12;
		updateMonth(month);
	};

	/* COMPONENT DEFINITION */

	return (
		<div className="fullTracker">
			<div className="Header">
				<Typography
					className="header"
					variant="h3"
					component="h3"
					sx={{ width: 1 }}
				>
					<ButtonLeft change={() => changeMonth(currentMonth - 1)} />
					<span className="Month">{months[currentMonth]}</span>
					<ButtonRight change={() => changeMonth(currentMonth + 1)} />
				</Typography>
			</div>
			<div className="Tracker">
				<Box className="item-stack">
					{monthItems.map((item, i) => (
						<TrackedItem
							key={item._id}
							value={item.value}
							isExpense={item.isExpense}
							title={item.title}
							description={item.description}
							date={item.date}
							category={item.category}
							remove={() => removeItem(item._id)}
							update={updateItem}
							id={item._id}
						/>
					))}
					<AddItem add={addItem} />
				</Box>
				<div className="data">
					<div className="text">
						<ItemsTotal
							className="Total"
							value={budgetTotal}
							incomeTotal={incomeTotal}
							incomeCount={incomeCount}
							expenseTotal={expenseTotal}
							expenseCount={expenseCount}
						/>
						<TrackStats title={"Expenses by Value"} data={expenseData} />
						<TrackStats title={"Income by Value"} data={incomeData} />
					</div>
					<div className="charts">
						<TagCharts
							incomeData={incomeData}
							expenseData={expenseData}
							pallete={pallete}
							title={"Monthly"}
						/>
						<TagCharts
							incomeData={incomeData}
							expenseData={expenseData}
							pallete={pallete}
							title={"Daily"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
