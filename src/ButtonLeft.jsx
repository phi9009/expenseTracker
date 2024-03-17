/** simple componenet that simple acts as a button for the user
 * to click on and change the month at the top
 */

import { ChevronLeft } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';

export default function ButtonLeft({change}){
    return <span className="LeftButton" >
        <IconButton aria-label="delete" size="large" onClick={change}>
            <ChevronLeft fontSize="inherit" />
        </IconButton>
    </span  >
}