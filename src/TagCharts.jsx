


import { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';

export default function TagCharts({incomeData, expenseData, title}){
    return(
        <Card variant='outlined' className='TrackedItem' sx={{display: "flex", p: 2, flexWrap: "wrap"}}>
            <Typography className="header" variant="h4" component="div" sx={{mb: 2, width: 1}}>{title}</Typography>
             <div>
             <Typography className="header" variant="h5" component="h5" sx={{mb: 2}}>Income</Typography>
             <PieChart
                series={[
                    {
                    data: incomeData,
                    outerRadius: 50
                    },
                ]}
                width={260}
                height={250}
                />
            </div>
            <div>
             <Typography className="header" variant="h5" component="h5" sx={{mb: 2}}>Expenses</Typography>
               <PieChart
                series={[
                    {
                    data: expenseData,
                    outerRadius: 50
                    },
                ]}
                width={260}
                height={250}
                />
            </div> 
        </Card>
        
    )
}