/** copied from the MUI docs honestly. simply there to look good */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
//import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";

export default function Navbar() {
	return (
		<Box className="Navbar" sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Expense Tracker
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

// maybe one day I'll add login/sessions/Authentication/authorization to this short and sweet project...
// today is not that day.
// so I'm removing this component and dropping it down here.

//<Button color="inherit">Login</Button>
