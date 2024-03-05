import { ChevronRight } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';

export default function ButtonRight({change}){
    return <span className="LeftButton" >
        <IconButton aria-label="delete" size="large" onClick={change}>
            <ChevronRight fontSize="inherit" />
        </IconButton>
    </span  >
}