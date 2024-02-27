import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
export default function TrackedShow({value, isExpense, title, description,date, remove, edit}){ 
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return (
    <>
    <CardContent>
                <Typography variant='h5' component="div">
                    {title}
                </Typography>
                <Divider sx={{m: 2}}/>
                <Typography variant="body2">
                    {description}
                </Typography>
                <Typography variant="body3">
                    {months[date.$M]} - {date.$D} - {date.$y} 
                </Typography>
                <Divider sx={{m: 1}}/>
                <Typography variant='h6' className={isExpense?"expense": ""}>
                {isExpense?"-": ""}${value.toFixed(2)}
                </Typography>
            </CardContent>
            <Divider sx={{m: 2}}/>
        <CardActions>
                <Button onClick={edit}>Edit</Button>
                <Button onClick={remove}>Delete</Button>
        </CardActions>
    </>
    )
}