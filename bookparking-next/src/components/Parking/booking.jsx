import React from "react";
import { Box, Stack, Avatar, Typography, Button } from "@mui/material";
import Input from "../Inputs/Input";
import SearchIcon from '@mui/icons-material/Search';
import SlotBoard from "./components/SlotBoard";



function Booking({ }) {
	return (
		<>

			<Stack flexShrink={0} flexDirection="row" justifyContent="space-between" >
					<Stack justifyContent="center" sx={{flexGrow: 0}}>
							<Box sx={{textAlign: "left", fontSize: 25}}>Booking</Box>
					</Stack>
					<Stack >
							<Input sx={{mb: 0,}} label="Search" icon={<SearchIcon />} />
					</Stack>
					<Stack ml={5}>
							<Avatar src="https://www.google.com" color="primary" alt="Darshan" sx={{bgcolor: "error.light"}} />
					</Stack>
			</Stack>

			<SlotBoard />
			

		</>
	);
}

export default Booking;


