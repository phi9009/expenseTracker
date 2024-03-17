/** This component is the one used to show all of the items in the current expense/income list
 * I realize now that you could easily have multiple items open to edit at the same time. idk how to prevent that
 * Sounds like a fun weekend project. Not today.
 */

import { useState } from "react";

import Card from '@mui/material/Card';
import TrackedShow from './TrackedShow';
import TrackedUpdate from './TrackedUpdate';
import './TrackedItem.css'



export default function TrackedItem( {value, isExpense, title, description,date, remove, update, category, id}) {
    // initializing state
    const [isBeingEditted, setEditted] = useState(false);

    // same trick as the 'AddItem' component but now both choices are components in and off themselves.
    const itemShow = (
        <TrackedShow 
            value={value}
            isExpense={isExpense}
            title={title}
            description={description}
            category={category}
            remove={remove}
            date = {date}
            edit = {() => setEditted(true)}
        />
    )
    

    const itemUpdate = (
        <TrackedUpdate 
                value={value}
				isExpense={isExpense}
				title={title}
				description={description}
                category={category}
				date = {date}
                back = {() => setEditted(false)}
                update = {update}
                id = {id}
                />
    )

	return (
		<Card variant='outlined' className='TrackedItem'>
            
            {isBeingEditted? itemUpdate: itemShow}
                
        </Card>
	);
}
