import { useState } from "react";

import Button from "@mui/material/Button";
import { AddCircle } from "@mui/icons-material";
import TrackedUpdate from "./TrackedUpdate";
import "./AddItem.css";

export default function AddItem({ add }) {
	const [isAdding, setAdding] = useState(false);

	const clickHandle = (event) => {
		setAdding(true);
	};

    const addShow = (
        <Button
                variant="contained"
                id="AddItem"
                fontSize="large"
                endIcon={<AddCircle fontSize="large" />}
                onClick={clickHandle}
            >
                Add Item
            </Button>
    )

    const addForm = (
        <TrackedUpdate 
        value={0}
        isExpense={true}
        title={"title"}
        description={""}
        back = {() => setAdding(false)}
        update = {add}
        id = {0}
        />
    )


	return (
        <>
             {isAdding? addForm: addShow}
        </>
    );
}
