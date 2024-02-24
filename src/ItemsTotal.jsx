
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import "./itemsTotal.css"

export default function ItemsTotal( {value}) {
	return (
		<Card variant='outlined'>
            <CardContent>
                <Typography variant='h6' component='h6' className={(value < 0) ? "negative" : ""} >
                    Total: {(value < 0) ? "-" : ""}${Math.abs(value)}
                </Typography>
            </CardContent>
        </Card>
	);
}