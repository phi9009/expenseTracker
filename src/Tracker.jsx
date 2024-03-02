import { useState } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import Typography from "@mui/material/Typography";

import TrackedItem from "./TrackedItem";
import ItemsTotal from "./ItemsTotal";
import AddItem from "./AddItem";
import TagCharts from "./TagCharts";

import "./Tracker.css";

function loadItems() {
	const test = dayjs();
	console.log(test);
	return [
		{
			value: 250,
			isExpense: true,
			id: uuidv4(),
			title: "Rent",
			description: "my weekly rent contribution",
			date: dayjs(),
			category: "housing",
		},
		{
			value: 672,
			isExpense: false,
			id: uuidv4(),
			title: "Paycheck",
			description: "my paycheck from my job",
			date: dayjs(),
			category: "work",
		},
		{
			value: 13.99,
			isExpense: true,
			id: uuidv4(),
			title: "McDonalds",
			description: "mmmmh, McDonalds",
			date: dayjs(),
			category: "fast food",
		},
		{
			value: 250,
			isExpense: true,
			id: uuidv4(),
			title: "Rent",
			description: "my weekly rent contribution",
			date: dayjs(),
			category: "housing",
		},
		{
			value: 672,
			isExpense: false,
			id: uuidv4(),
			title: "Paycheck",
			description: "my paycheck from my job",
			date: dayjs(),
			category: "work",
		},
		{
			value: 13.99,
			isExpense: true,
			id: uuidv4(),
			title: "McDonalds",
			description: "mmmmh, McDonalds",
			date: dayjs(),
			category: "fast food",
		},
	];
}

export default function Tracker() {
	const [trackedItems, updateItems] = useState(loadItems);

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
			const checkExpense = expenseData.find( (e) => {
				console.log(i);
				if(e.label === i.category)return true;
				else return false;
			}) 
			if(checkExpense){
				checkExpense.value += i.value;
			}else{
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
			const checkIncome = incomeData.find( (e) => {
				console.log(i);
				if(e.label === i.category)return true;
				else return false;
			}) 
			if(checkIncome){
				checkIncome.value += i.value;
			}else{
			incomeData.push({
				id: incomeData.length,
				value: i.value,
				label: i.category,
			});
			}
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

	return (
		<div className="fullTracker">
			<div className="Header">
				<Typography
					className="header"
					variant="h3"
					component="h3"
					sx={{ width: 1 }}
				>
					(Current Month)
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
					</div>
					<div className="charts">
						<TagCharts
							incomeData={incomeData}
							expenseData={expenseData}
							title={"Monthly"}
						/>
						<TagCharts
							incomeData={incomeData}
							expenseData={expenseData}
							title={"Daily"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
