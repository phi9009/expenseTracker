import { useState ,useEffect  } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ButtonRight from "./ButtonRight";
import ButtonLeft from "./ButtonLeft";
import Typography from "@mui/material/Typography";

import TrackedItem from "./TrackedItem";
import ItemsTotal from "./ItemsTotal";
import AddItem from "./AddItem";
import TagCharts from "./TagCharts";
import TrackStats from "./TrackStats";

import "./Tracker.css";

function randomNumber(val) {
	return Math.floor(Math.random() * val);
}

const titles = [
	"Rent",
	"food",
	"groceries",
	"computer",
	"games",
	"electricity",
	"water",
	"internet",
];

function seedItems(num) {
	const returnArray = [];
	for (let i = 0; i < num; i++) {
		returnArray.push({
			value: randomNumber(1000),
			isExpense: randomNumber(2) ? true : false,
			id: uuidv4(),
			title: titles[randomNumber(titles.length)],
			description: titles[randomNumber(titles.length)],
			date: dayjs()
				.set("month", randomNumber(12))
				.set("day", randomNumber(28))
				.set("year", 2024),
			category: titles[randomNumber(titles.length)],
		});
	}
	return returnArray;
}

function loadItems() {
	const topLevelItems = seedItems(200);
	
	return topLevelItems;
}

export default function Tracker() {

	
	const [trackedItems, updateItems] = useState([]);
	const [currentMonth, updateMonth] = useState(2);
	useEffect(() => {
		fetch("./month", {
		method: "GET",
		headers: {
			'Content-Type': 'application/json'
			
		},
		})
		.then((response) => {
			console.log(response);
			return response.json()
		
		})
		.then((data) => {

			const parsedData = data.map( (oldItem) => {
				return {...oldItem, date : dayjs(oldItem.date) }
			})
			console.log( "pre");
			updateItems(parsedData);
			console.log(parsedData);
			console.log( "success");
		})
		.catch((error) => console.log(error));
	}, []);
	console.log(trackedItems);
	const pallete = [
		"#bb0000",
		"#00bb00",
		"#0000bb",
		"#bbbb00",
		"#880088",
		"#bb7700",
	];
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

	let budgetTotal = 0;
	let expenseTotal = 0;
	let incomeTotal = 0;
	let expenseCount = 0;
	let incomeCount = 0;
	const incomeData = [];
	const expenseData = [];
	const monthItems = trackedItems.filter(
		(item) => {
			return( item.date.get("month") === currentMonth)
		});



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
	}

	const removeItem = (id) => {
		fetch(`./item/${id}`, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
				
			},
			})
			.then((response) => {
				console.log(response, id);
				return response.json()
			
			})
			.then((data) => {
	
				if(data.deletedCount > 0){
					console.log( "success");
					updateItems((prevItems) => {
						return prevItems.filter((t) => t._id !== id);
					});
				}
				
			})
			.catch((error) => console.log(error));
		
	};

	const updateItem = (id, i) => {
		console.log(i);
		fetch(`./item/${id}`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json',
				
			},
			body: JSON.stringify(i)
			})
			.then((response) => {
				console.log(response, id);
				return response.json()
			
			})
			.then((data) => {
	
				if(data.success){
					console.log( "success");
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

	const addItem = (id, item) => {
		fetch(`./item/${id}`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				
			},
			body: JSON.stringify(item)
			})
			.then((response) => {
				console.log(response, id);
				return response.json()
			
			})
			.then((data) => {
	
				if(data != undefined){
					console.log( data);
					console.log( "success");
					updateItems((prevItems) => {
						return [...prevItems, { ...data, date : dayjs(data.date)}];
					});
				}
				
			})
			.catch((error) => console.log(error));
		
	};

	const changeMonth = (month) => {
		if (month >= 12) month -= 12;
		if (month < 0) month += 12;
		updateMonth(month);
	};

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
