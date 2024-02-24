import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import Divider from "@mui/material/Divider";

import Typography from "@mui/material/Typography";

import TrackedItem from "./TrackedItem";
import ItemsTotal from "./ItemsTotal";
import AddItem from "./AddItem";

import "./Tracker.css";

function loadItems() {
	return [
		{
			value: 3002,
			isExpense: true,
			id: uuidv4(),
			title: "Rent",
			description: "my weekly rent contribution",
		},
		{
			value: 432,
			isExpense: false,
			id: uuidv4(),
			title: "Paycheck",
			description: "my paycheck from my job",
		},
		{
			value: 20,
			isExpense: true,
			id: uuidv4(),
			title: "fast food",
			description: "mmmmh, McDonalds",
		},
	];
}

export default function Tracker() {
	const [trackedItems, updateItems] = useState(loadItems);

	let budgetTotal = 0;
	for (let i of trackedItems) {
		if (i.isExpense === true) {
			budgetTotal -= i.value;
		} else {
			budgetTotal += i.value;
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
                if(item.id === id){
                    return i;
                }else{
                    return item;
                }
            })
        });
    }

    const addItem = (id,    item) => {
        updateItems((prevItems) => {
            return [...prevItems, {...item, id: uuidv4()}];
        });
    }

	return (
		<div className="Tracker">
			<Typography variant="h3" component="h1" className="Header">
				Expense Tracker
			</Typography>
			{trackedItems.map((item, i) => (
				<TrackedItem
					key={item.id}
					value={item.value}
					isExpense={item.isExpense}
					title={item.title}
					description={item.description}
					remove={() => removeItem(item.id)}
                    update={updateItem}
                    id = {item.id}
                    
				/>
			))}
			<AddItem add = {addItem} />
			<Divider>Total</Divider>
			<ItemsTotal value={budgetTotal} />
		</div>
	);
}
