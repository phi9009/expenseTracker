


import { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';

export default function TagCharts({incomeData, expenseData, title}){
    return(
        <Card variant='outlined' className='TrackedItem' sx={{display: "flex", p: 2, flexWrap: "wrap"}}>
            <Typography className="header" variant="h4" component="div" sx={{mb: 3, width: 1}}>{title}</Typography>
             <div>
             <Typography className="header" variant="h5" component="h5" sx={{mb: 3}}>Income</Typography>
             <PieChart
                series={[
                    {
                    data: incomeData
                    },
                ]}
                width={260}
                height={100}
                />
            </div>
            <div>
             <Typography className="header" variant="h5" component="h5" sx={{mb: 3}}>Expenses</Typography>
               <PieChart
                series={[
                    {
                    data: expenseData
                    },
                ]}
                width={260}
                height={100}
                />
            </div> 
        </Card>
        
    )
}