import { useState } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";

import Typography from "@mui/material/Typography";

import TrackedItem from "./TrackedItem";
import ItemsTotal from "./ItemsTotal";
import AddItem from "./AddItem";

import "./Tracker.css";

function loadItems() {
	const test = dayjs();
	console.log(test);
	return [
		{
			value: 3002,
			isExpense: true,
			id: uuidv4(),
			title: "Rent",
			description: "my weekly rent contribution",
			date: dayjs(),
		},
		{
			value: 432,
			isExpense: false,
			id: uuidv4(),
			title: "Paycheck",
			description: "my paycheck from my job",
			date: dayjs(),
		},
		{
			value: 20,
			isExpense: true,
			id: uuidv4(),
			title: "fast food",
			description: "mmmmh, McDonalds",
			date: dayjs(),
		},
		{
			value: 3002,
			isExpense: true,
			id: uuidv4(),
			title: "Rent",
			description: "my weekly rent contribution",
			date: dayjs(),
		},
		{
			value: 432,
			isExpense: false,
			id: uuidv4(),
			title: "Paycheck",
			description: "my paycheck from my job",
			date: dayjs(),
		},
		{
			value: 20,
			isExpense: true,
			id: uuidv4(),
			title: "fast food",
			description: "mmmmh, McDonalds",
			date: dayjs(),
		},
		{
			value: 3002,
			isExpense: true,
			id: uuidv4(),
			title: "Rent",
			description: "my weekly rent contribution",
			date: dayjs(),
		},
		{
			value: 432,
			isExpense: false,
			id: uuidv4(),
			title: "Paycheck",
			description: "my paycheck from my job",
			date: dayjs(),
		},
		{
			value: 20,
			isExpense: true,
			id: uuidv4(),
			title: "fast food",
			description: "mmmmh, McDonalds",
			date: dayjs(),
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
	for (let i of trackedItems) {
		if (i.isExpense === true) {
			budgetTotal -= i.value;
			expenseTotal += i.value;
			expenseCount++;
		} else {
			budgetTotal += i.value;
			incomeTotal += i.value;
			incomeCount++;
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
				<Typography className="header" variant="h3" component="h3" sx={{width: 1}} >(Current Day)</Typography>
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
							remove={() => removeItem(item.id)}
							update={updateItem}
							id={item.id}
						/>
					))}
					<AddItem add={addItem} />
					
				
				</Box>
				
				<ItemsTotal
						className="Total"
						value={budgetTotal}
						incomeTotal={incomeTotal}
						incomeCount={incomeCount}
						expenseTotal={expenseTotal}
						expenseCount={expenseCount}
					/>
			</div>
		</div>
	);
}
