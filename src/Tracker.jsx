import { useState } from "react";
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

function randomNumber(val){
    return(Math.floor(Math.random() * val))
}

const titles = ["Rent", "food", "groceries", "computer", "games", "electricity", "water", "internet"]

function seedItems(num){
    const returnArray = [];
    for(let i = 0; i < num; i++ ){
		console.log(i);
        returnArray.push(
            {
                value: randomNumber(1000),
                isExpense: randomNumber(2)?1:0,
                id: uuidv4(),
                title: titles[randomNumber(titles.length)],
                description: titles[randomNumber(titles.length)],
                date: dayjs().set('month', randomNumber(12)).set('day', randomNumber(28)).set('year', 2024),
                category: titles[randomNumber(titles.length)],
            }
        )
    }
    console.log(returnArray);
    return returnArray;
}


function loadItems() {
	const topLevelItems = seedItems[200];
	
	return topLevelItems;
}

export default function Tracker() {
	const [trackedItems, updateItems] = useState(loadItems);
	const [currentMonth, updateMonth] = useState(2);

	const pallete = [
		"#bb0000",
		"#00bb00",
		"#0000bb",
		"#bbbb00",
		"#880088",
		"#bb7700",
	];
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]



	let budgetTotal = 0;
	let expenseTotal = 0;
	let incomeTotal = 0;
	let expenseCount = 0;
	let incomeCount = 0;
	const incomeData = [];
	const expenseData = [];
	for (let i of trackedItems) {
		if (i.isExpense === true) {
			budgetTotal -= i.value;
			expenseTotal += i.value;
			expenseCount++;
			const checkExpense = expenseData.find((e) => {
				console.log(i);
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
				console.log(i);
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
		updateItems((prevItems) => {
			return prevItems.filter((t) => t.id !== id);
		});
	};

	const updateItem = (id, i) => {
		updateItems((prevItems) => {
			return prevItems.map((item) => {
				if (item.id === id) {
					return i;
				} else {
					return item;
				}
			});
		});
	};

	const addItem = (id, item) => {
		updateItems((prevItems) => {
			return [...prevItems, { ...item, id: uuidv4() }];
		});
	};


	const changeMonth = (month) => {
		if(month >= 12)month -= 12;
		if(month < 0)month += 12; 
		updateMonth(month);
	}

	return (
		<div className="fullTracker">
			<div className="Header">
				<Typography
					className="header"
					variant="h3"
					component="h3"
					sx={{ width: 1 }}
				>
					<ButtonLeft change={() => (changeMonth(currentMonth-1))} />
						<span className="Month">
							{months[currentMonth]}
						</span>
					<ButtonRight change={() => (changeMonth(currentMonth+1))} />
				</Typography>
			</div>
			<div className="Tracker">
				<Box className="item-stack">
					{trackedItems.map((item, i) => (
						<TrackedItem
							key={item.id}
							value={item.value}
							isExpense={item.isExpense}
							title={item.title}
							description={item.description}
							date={item.date}
							category={item.category}
							remove={() => removeItem(item.id)}
							update={updateItem}
							id={item.id}
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
