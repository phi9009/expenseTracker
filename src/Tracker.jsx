
import Typography from '@mui/material/Typography';

import TrackedItem from './TrackedItem';
export default function Tracker(){

    return (
        <div>
            <Typography variant='h3' component="h1">
                Expense Tracker
            </Typography>
            <TrackedItem />
        </div>
    )
}