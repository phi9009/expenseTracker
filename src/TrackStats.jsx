import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

export default function TrackStats({ title, data }) {
	return (
		<Card variant="outlined" className="ItemsTotal">
			<CardContent>
				<Typography variant="h6" component="h6">
					{title}
				</Typography>
				<Divider sx={{ m: 2 }} />

				{data.map((item, i) => (
					<Typography variant="body2">
						{item.label} - ${item.value}
					</Typography>
				))}
			</CardContent>
		</Card>
	);
}
