/** this the componenet that is shown a the bottom of the income/expense list
 * for adding a new item. it does some logic and has state but doesn't do a whole
 * lot and is mostly passes things through itself.
  */

// react import state
import { useState } from "react";

// MUI import stuff
import Button from "@mui/material/Button";
import { AddCircle } from "@mui/icons-material";
import TrackedUpdate from "./TrackedUpdate";
import "./AddItem.css";

export default function AddItem({ add }) {
	// define state
    const [isAdding, setAdding] = useState(false);

    // change state if the user clicks the button
	const clickHandle = (event) => {
		setAdding(true);
	};
    // the state can be reversed if the player clicks back
    // on the form since back has been set to an anonymous function 
    // that just undoes what clickHandle does.

    // set this up so we can use a basic ternary operator to choose display the correct component.
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

    // see this is what I meant in the "TrackedUpdate" component. it's the same 
    // component but the function it's being given is different. This time it's the Add function
    // from the tracker component.
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
