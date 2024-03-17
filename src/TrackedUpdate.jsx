/** the form that works double duty as the input and update forms */

// react imports
import { useState } from "react";

// MUI imports
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// this is the component that works as a form for both the TrackedItem, and AddItem components.
export default function TrackedUpdate({value, isExpense, title, description, back,category, update,date, id}){ 
    
    // define state
    const [item, updateItem] = useState({value, isExpense, title, description, date, category});

        // handles the toggle for the expense/income toggle
    const handleToggle = (event) => {
        const newItem = {...item, isExpense: event.target.checked};
        updateItem(newItem);
    };
    // calls the 'update' function that was handed to it by the higher level component.
    const handleUpdate = (event) => {
        let newValue =  parseFloat(item.value); 
        const newItem = {...item, value : newValue};
        update(id, newItem);
        back();
    }
       // captures the title text field
    const changeTitle = (event) => {
        const newItem = {...item, title: event.target.value};
        updateItem(newItem);
    }
    // captures the category text field
    const changeCat = (event) => {
        const newItem = {...item, category: event.target.value};
        updateItem(newItem);
    }
    // captures the description text field
    const changeDesc = (event) => {
        const newItem = {...item, description: event.target.value};
        updateItem(newItem);
    }

    // captures the value text field
    const changeValue = (event) => {

        const newItem = {...item, value: event.target.value};
        updateItem(newItem);
        
    }

    // captures the date field
    const handleDate = (newDate) => {
        
        const newItem = {...item, date: newDate};
        updateItem(newItem);
    }


    
    return (
    <>
    <CardContent>
        <TextField
            required
            id="outlined-required"
            label="Title"
            value={item.title}
            onChange={changeTitle}
            sx={{margin: 2}}
        />
        
        <FormControlLabel 
            control={
                <Switch
                    checked={item.isExpense}
                    onChange={handleToggle}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            } 
            label="Expense?"
            sx={{margin: 2}}
            id={"expense"+item.id} 
        />
        <TextField
            fullWidth
            id="outlined-required"
            label="Description"
            value={item.description}
            onChange={changeDesc}
            sx={{ m: 1 }}
        />
        <TextField
            fullWidth
            id="outlined-required"
            label="Category"
            value={item.category}
            onChange={changeCat}
            sx={{ m: 1 }}
        />
         <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            value={item.value}
            precision={2}
            onChange={changeValue}
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker onChange={handleDate} />
        </LocalizationProvider>

            </CardContent>
        <CardActions>
                <Button onClick={handleUpdate}>Finish</Button>
                <Button onClick={back}>Back</Button>
        </CardActions>
    </>
    )
}