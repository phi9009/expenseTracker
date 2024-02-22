
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
export default function TrackedItem() {
	return (
		<Card variant='outlined'>
            <CardContent>
                <Typography variant='h5' component="div">
                    Example Expense/income
                </Typography>
                <Typography variant="body2">
                    Description (optional)
                </Typography>
                <Typography variant='h6'>
                    $100.00
                </Typography>
            </CardContent>
            <CardActions>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </CardActions>
        </Card>
	);
}
