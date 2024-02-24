import { useState } from "react";

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';


export default function TrackedUpdate({value, isExpense, title, description, back, update, id}){ 
    
    const [item, updateItem] = useState({value, isExpense, title, description});

    const handleToggle = (event) => {
        const newItem = {...item, isExpense: event.target.checked};
        updateItem(newItem);
    };

    const handleUpdate = (event) => {
        update(id, item);
        back();
    }
    
    const changeTitle = (event) => {
        const newItem = {...item, title: event.target.value};
        updateItem(newItem);
    }

    const changeDesc = (event) => {
        const newItem = {...item, description: event.target.value};
        updateItem(newItem);
    }

    const changeValue = (event) => {
        const newItem = {...item, value: parseFloat(event.target.value)};
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
        />
        <TextField
            id="outlined-required"
            label="Description"
            value={item.description}
            onChange={changeDesc}
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
        />
         <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            value={item.value}
            onChange={changeValue}
          />
        </FormControl>
                
            </CardContent>
        <CardActions>
                <Button onClick={handleUpdate}>Finish</Button>
                <Button onClick={back}>Back</Button>
        </CardActions>
    </>
    )
}