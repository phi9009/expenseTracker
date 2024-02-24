import { useState } from "react";

import Card from '@mui/material/Card';
import TrackedShow from './TrackedShow';
import TrackedUpdate from './TrackedUpdate';
import './TrackedItem.css'



export default function TrackedItem( {value, isExpense, title, description, remove, update, id}) {
    const [isBeingEditted, setEditted] = useState(false);

    const itemShow = (
        <TrackedShow 
            value={value}
            isExpense={isExpense}
            title={title}
            description={description}
            remove={remove}
            edit = {() => setEditted(true)}
        />
    )
    

    const itemUpdate = (
        <TrackedUpdate 
                value={value}
				isExpense={isExpense}
				title={title}
				description={description}
				
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
