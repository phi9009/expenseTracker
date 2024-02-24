import  {v4 as uuidv4} from 'uuid';



import Typography from '@mui/material/Typography';

import TrackedItem from './TrackedItem';
import ItemsTotal from './ItemsTotal';
import AddItem from './AddItem';




export default function Tracker(){
    const trackedItems = [  {value: 3002,    isExpense:true,     id:uuidv4(),    title: "Rent"       , description: "my weekly rent contribution"},
    {value: 432,     isExpense:false,    id:uuidv4(),   title: "Paycheck"   , description: "my paycheck from my job"},
    {value: 20,     isExpense:true,     id:uuidv4(),    title: "fast food"  , description: "mmmmh, McDonalds"}];

    let budgetTotal = 0;
    for(let i of trackedItems){
        if(i.isExpense === true){
            budgetTotal -= i.value;
        }else{
            budgetTotal += i.value;
        }
    }
    return (
        <div>
            <Typography variant='h3' component="h1">
                Expense Tracker
            </Typography>
            { trackedItems.map((item, i) =>(
                
                <TrackedItem key={item.id} value={item.value} isExpense={item.isExpense} title={item.title} description={item.description} />

            ))}
            <AddItem />
            <ItemsTotal value={budgetTotal}/>
        </div>
    )
}