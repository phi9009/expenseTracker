
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import "./itemsTotal.css"


export default function ItemsTotal( {value, expenseTotal, expenseCount, incomeTotal, incomeCount}) {
	return (
		<Card variant='outlined' className='ItemsTotal'>
            <CardContent>
                <Typography variant='h6' component='h6' className={(value < 0) ? "negative" : ""} >
                    Total: {(value < 0) ? "-" : ""}${Math.abs(value)}
                </Typography>
                <Divider sx={{m: 2}}/>
                <Typography variant="body2">
                    Total expenses: ${expenseTotal}
                </Typography>
                <Typography variant="body2">
                    Number of expenses items: {expenseCount}
                </Typography>
                <Divider sx={{m: 2}}/>
                <Typography variant="body2">
                    Total income: ${incomeTotal}
                </Typography>
                <Typography variant="body2">
                    Number of income items: {incomeCount}
                </Typography>
                
            </CardContent>
        </Card>
	);
}