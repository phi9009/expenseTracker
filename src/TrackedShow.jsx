import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

export default function TrackedShow({value, isExpense, title, description,date, remove, edit}){ 
    
    return (
    <>
    <CardContent>
                <Typography variant='h5' component="div">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
                <Typography variant="body3">
                    {date.$M+1} - {date.$D} - {date.$y} 
                </Typography>
                <Typography variant='h6' className={isExpense?"expense": ""}>
                {isExpense?"-": ""}${value}
                </Typography>
            </CardContent>
        <CardActions>
                <Button onClick={edit}>Edit</Button>
                <Button onClick={remove}>Delete</Button>
        </CardActions>
    </>
    )
}