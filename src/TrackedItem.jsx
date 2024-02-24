
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './TrackedItem.css'
export default function TrackedItem( {value, isExpense, title, description}) {
	return (
		<Card variant='outlined'>
            <CardContent>
                <Typography variant='h5' component="div">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
                <Typography variant='h6' className={isExpense?"expense": ""}>
                {isExpense?"-": ""}${value}
                </Typography>
            </CardContent>
            <CardActions>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </CardActions>
        </Card>
	);
}
