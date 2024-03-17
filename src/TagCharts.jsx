/** this is the pie chart component that gave me such trouble 
 * it's really just a settings object and the basic components with
 * not even a bit of state.
 */


import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';

export default function TagCharts({incomeData, expenseData, title, pallete}){

    const legendPlacement = {
        slotProps: {
          legend: {
            position: {
              vertical: 'middle',
              horizontal: 'right',
            },
            direction: 'column',
            itemGap: 2,
          },
        },
        margin: {
          top: 20,
          right: 150,
          left: 20,
        },
      };
      
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
                colors={pallete}
                {...legendPlacement}
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
                colors={pallete}
                {...legendPlacement}
                />
            </div> 
        </Card>
        
    )
}