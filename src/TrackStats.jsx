/** Another component that displays text data. this one shows the data of what's passed in
 * it should be a list of categories in order from highest to lowest value
 */

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { v4 as uuidv4 } from "uuid";
export default function TrackStats({ title, data }) {
	return (
		<Card variant="outlined" className="ItemsTotal">
			<CardContent>
				<Typography variant="h6" component="h6">
					{title}
				</Typography>
				<Divider sx={{ m: 2 }} />

				{data.map((item, i) => (
					<Typography variant="body2" key={uuidv4()}>
						{item.label} - ${item.value}
					</Typography>
				))}
			</CardContent>
		</Card>
	);
}
