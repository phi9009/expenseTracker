/** one of the plain text data displaying compents. it has no state, it mearly displays things */
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import "./itemsTotal.css"


export default function ItemsTotal( {value, expenseTotal, expenseCount, incomeTotal, incomeCount}) {
	return (
		<Card variant='outlined' className='ItemsTotal'>
            <CardContent>
                <Typography variant='h6' component='h6' className={(value < 0) ? "negative" : "positive"} >
                    Total: {(value < 0) ? "-" : ""}${Math.abs(value).toFixed(2)}
                </Typography>
                <Divider sx={{m: 2}}/>
                <Typography variant="body2">
                    Total expenses: ${expenseTotal.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                    Number of expenses items: {expenseCount}
                </Typography>
                <Divider sx={{m: 2}}/>
                <Typography variant="body2">
                    Total income: ${incomeTotal.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                    Number of income items: {incomeCount}
                </Typography>
                
            </CardContent>
        </Card>
	);
}