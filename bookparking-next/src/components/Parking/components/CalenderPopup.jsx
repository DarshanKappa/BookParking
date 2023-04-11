import React, { useState } from "react";
import BookCalender from "@/components/dashboard/components/bookCalendar"
import { Box, Stack, Avatar, Typography, Button } from "@mui/material";


function CalenderWithPopup({ open, setOpen, date, setDate, month, setMonth, year, setYear }) {

	const setDateFun = (...v)=>{
		date !== undefined && setOpen(false)
		setDate(...v);
	}

	return (
		<Box sx={{ display: open ? "block" : "none" }} >
			<Stack sx={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0, justifyContent: "center", placeItems: "center", }}>
				<BookCalender key={open} dateValue={date} setDateValue={setDateFun} monthValue={month} setMonthValue={setMonth} yearValue={year} setYearValue={setYear} sx={{ width: 400, position: "absolute", zIndex: 1 }} />
			</Stack>
			<Box onClick={() => setOpen(false)} sx={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0, zIndex: 0, bgcolor: "#00000085" }}></Box>
		</Box>
	);
}

export default CalenderWithPopup;
