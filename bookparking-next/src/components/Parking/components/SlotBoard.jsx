import React, { useContext, useEffect, useState } from "react";
import { Box, Stack, Avatar, Typography, Button, Alert, IconButton, Snackbar } from "@mui/material";
import styles from "@/styles/Book.module.css";
import CalenderWithPopup from "./CalenderPopup";
import SlotBox from "./SlotBox";
import TimeDisplay from "./TimeDisplay";
import Slide from "@mui/material/Slide";
import { SnackContext } from "contexts/SnackBarContext";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { days_in_month } from "@/components/dashboard/components/bookCalendar";
import axios from "axios";
import { useCookies } from "react-cookie";
import PlaceBookings from "./Placebooking";
import { useRouter } from "next/router";


const timeLength = 24;

export const times = [
	{ value: "12am" },
	{ value: "1am" },
	{ value: "2am" },
	{ value: "3am" },
	{ value: "4am" },
	{ value: "5am" },
	{ value: "6am" },
	{ value: "7am" },
	{ value: "8am" },
	{ value: "9am" },
	{ value: "10am" },
	{ value: "11am" },
	{ value: "12pm" },
	{ value: "1pm" },
	{ value: "2pm" },
	{ value: "3pm" },
	{ value: "4pm" },
	{ value: "5pm" },
	{ value: "6pm" },
	{ value: "7pm" },
	{ value: "8pm" },
	{ value: "9pm" },
	{ value: "10pm" },
	{ value: "11pm" },
	{ value: "12am" },
]

let data = [
	{
		id: 1,
		slots: [
			{
				time_slot: (1 - 1),
				free: true
			},
			{
				time_slot: (2 - 1),
				free: false
			},
			{
				time_slot: (3 - 1),
				free: true
			},
			{
				time_slot: (4 - 1),
				free: false
			},
			{
				time_slot: (5 - 1),
				free: false
			},
			{
				time_slot: (6 - 1),
				free: false
			},
			{
				time_slot: (7 - 1),
				free: true
			},
			{
				time_slot: (8 - 1),
				free: false
			},
			{
				time_slot: (9 - 1),
				free: true
			},
			{
				time_slot: (10 - 1),
				free: false
			},
			{
				time_slot: (11 - 1),
				free: true
			},
			{
				time_slot: (12 - 1),
				free: false
			},
			{
				time_slot: (13 - 1),
				free: false
			},
			{
				time_slot: (14 - 1),
				free: false
			},
			{
				time_slot: (15 - 1),
				free: false
			},
			{
				time_slot: (16 - 1),
				free: false
			},
			{
				time_slot: (17 - 1),
				free: true
			},
			{
				time_slot: (18 - 1),
				free: true
			},
			{
				time_slot: (19 - 1),
				free: false
			},
			{
				time_slot: (20 - 1),
				free: false
			},
			{
				time_slot: (21 - 1),
				free: true
			},
			{
				time_slot: (22 - 1),
				free: true
			},
			{
				time_slot: (23 - 1),
				free: true
			},
			{
				time_slot: (24 - 1),
				free: true
			},
		],
	},
	{
		id: 2,
		slots: [
			{
				time_slot: (1 - 1),
				free: true
			},
			{
				time_slot: (2 - 1),
				free: false
			},
			{
				time_slot: (3 - 1),
				free: true
			},
			{
				time_slot: (4 - 1),
				free: false
			},
			{
				time_slot: (5 - 1),
				free: false
			},
			{
				time_slot: (6 - 1),
				free: false
			},
			{
				time_slot: (7 - 1),
				free: true
			},
			{
				time_slot: (8 - 1),
				free: false
			},
			{
				time_slot: (9 - 1),
				free: true
			},
			{
				time_slot: (10 - 1),
				free: false
			},
			{
				time_slot: (11 - 1),
				free: true
			},
			{
				time_slot: (12 - 1),
				free: false
			},
			{
				time_slot: (13 - 1),
				free: false
			},
			{
				time_slot: (14 - 1),
				free: false
			},
			{
				time_slot: (15 - 1),
				free: false
			},
			{
				time_slot: (16 - 1),
				free: false
			},
			{
				time_slot: (17 - 1),
				free: true
			},
			{
				time_slot: (18 - 1),
				free: true
			},
			{
				time_slot: (19 - 1),
				free: false
			},
			{
				time_slot: (20 - 1),
				free: false
			},
			{
				time_slot: (21 - 1),
				free: true
			},
			{
				time_slot: (22 - 1),
				free: true
			},
			{
				time_slot: (23 - 1),
				free: true
			},
			{
				time_slot: (24 - 1),
				free: true
			},
		],
	},
	{
		id: 3,
		slots: [
			{
				time_slot: (1 - 1),
				free: true
			},
			{
				time_slot: (2 - 1),
				free: false
			},
			{
				time_slot: (3 - 1),
				free: true
			},
			{
				time_slot: (4 - 1),
				free: false
			},
			{
				time_slot: (5 - 1),
				free: false
			},
			{
				time_slot: (6 - 1),
				free: false
			},
			{
				time_slot: (7 - 1),
				free: true
			},
			{
				time_slot: (8 - 1),
				free: false
			},
			{
				time_slot: (9 - 1),
				free: true
			},
			{
				time_slot: (10 - 1),
				free: false
			},
			{
				time_slot: (11 - 1),
				free: true
			},
			{
				time_slot: (12 - 1),
				free: false
			},
			{
				time_slot: (13 - 1),
				free: false
			},
			{
				time_slot: (14 - 1),
				free: false
			},
			{
				time_slot: (15 - 1),
				free: false
			},
			{
				time_slot: (16 - 1),
				free: false
			},
			{
				time_slot: (17 - 1),
				free: true
			},
			{
				time_slot: (18 - 1),
				free: true
			},
			{
				time_slot: (19 - 1),
				free: false
			},
			{
				time_slot: (20 - 1),
				free: false
			},
			{
				time_slot: (21 - 1),
				free: true
			},
			{
				time_slot: (22 - 1),
				free: true
			},
			{
				time_slot: (23 - 1),
				free: true
			},
			{
				time_slot: (24 - 1),
				free: true
			},
		],
	},
	{
		id: 4,
		slots: [
			{
				time_slot: (1 - 1),
				free: true
			},
			{
				time_slot: (2 - 1),
				free: false
			},
			{
				time_slot: (3 - 1),
				free: true
			},
			{
				time_slot: (4 - 1),
				free: false
			},
			{
				time_slot: (5 - 1),
				free: false
			},
			{
				time_slot: (6 - 1),
				free: false
			},
			{
				time_slot: (7 - 1),
				free: true
			},
			{
				time_slot: (8 - 1),
				free: false
			},
			{
				time_slot: (9 - 1),
				free: true
			},
			{
				time_slot: (10 - 1),
				free: false
			},
			{
				time_slot: (11 - 1),
				free: true
			},
			{
				time_slot: (12 - 1),
				free: false
			},
			{
				time_slot: (13 - 1),
				free: false
			},
			{
				time_slot: (14 - 1),
				free: false
			},
			{
				time_slot: (15 - 1),
				free: false
			},
			{
				time_slot: (16 - 1),
				free: false
			},
			{
				time_slot: (17 - 1),
				free: true
			},
			{
				time_slot: (18 - 1),
				free: true
			},
			{
				time_slot: (19 - 1),
				free: false
			},
			{
				time_slot: (20 - 1),
				free: false
			},
			{
				time_slot: (21 - 1),
				free: true
			},
			{
				time_slot: (22 - 1),
				free: true
			},
			{
				time_slot: (23 - 1),
				free: true
			},
			{
				time_slot: (24 - 1),
				free: true
			},
		],
	},
	{
		id: 5,
		slots: [
			{
				time_slot: (1 - 1),
				free: true
			},
			{
				time_slot: (2 - 1),
				free: false
			},
			{
				time_slot: (3 - 1),
				free: true
			},
			{
				time_slot: (4 - 1),
				free: false
			},
			{
				time_slot: (5 - 1),
				free: false
			},
			{
				time_slot: (6 - 1),
				free: false
			},
			{
				time_slot: (7 - 1),
				free: true
			},
			{
				time_slot: (8 - 1),
				free: false
			},
			{
				time_slot: (9 - 1),
				free: true
			},
			{
				time_slot: (10 - 1),
				free: false
			},
			{
				time_slot: (11 - 1),
				free: true
			},
			{
				time_slot: (12 - 1),
				free: false
			},
			{
				time_slot: (13 - 1),
				free: false
			},
			{
				time_slot: (14 - 1),
				free: false
			},
			{
				time_slot: (15 - 1),
				free: false
			},
			{
				time_slot: (16 - 1),
				free: false
			},
			{
				time_slot: (17 - 1),
				free: true
			},
			{
				time_slot: (18 - 1),
				free: true
			},
			{
				time_slot: (19 - 1),
				free: false
			},
			{
				time_slot: (20 - 1),
				free: false
			},
			{
				time_slot: (21 - 1),
				free: true
			},
			{
				time_slot: (22 - 1),
				free: true
			},
			{
				time_slot: (23 - 1),
				free: true
			},
			{
				time_slot: (24 - 1),
				free: true
			},
		],
	},
	{
		id: 6,
		slots: [
			{
				time_slot: (1 - 1),
				free: true
			},
			{
				time_slot: (2 - 1),
				free: false
			},
			{
				time_slot: (3 - 1),
				free: true
			},
			{
				time_slot: (4 - 1),
				free: false
			},
			{
				time_slot: (5 - 1),
				free: false
			},
			{
				time_slot: (6 - 1),
				free: false
			},
			{
				time_slot: (7 - 1),
				free: true
			},
			{
				time_slot: (8 - 1),
				free: false
			},
			{
				time_slot: (9 - 1),
				free: true
			},
			{
				time_slot: (10 - 1),
				free: false
			},
			{
				time_slot: (11 - 1),
				free: true
			},
			{
				time_slot: (12 - 1),
				free: false
			},
			{
				time_slot: (13 - 1),
				free: false
			},
			{
				time_slot: (14 - 1),
				free: false
			},
			{
				time_slot: (15 - 1),
				free: false
			},
			{
				time_slot: (16 - 1),
				free: false
			},
			{
				time_slot: (17 - 1),
				free: true
			},
			{
				time_slot: (18 - 1),
				free: true
			},
			{
				time_slot: (19 - 1),
				free: false
			},
			{
				time_slot: (20 - 1),
				free: false
			},
			{
				time_slot: (21 - 1),
				free: true
			},
			{
				time_slot: (22 - 1),
				free: true
			},
			{
				time_slot: (23 - 1),
				free: true
			},
			{
				time_slot: (24 - 1),
				free: true
			},
		],
	},
	{
		id: 7,
		slots: [
			{
				time_slot: (1 - 1),
				free: true
			},
			{
				time_slot: (2 - 1),
				free: false
			},
			{
				time_slot: (3 - 1),
				free: true
			},
			{
				time_slot: (4 - 1),
				free: false
			},
			{
				time_slot: (5 - 1),
				free: false
			},
			{
				time_slot: (6 - 1),
				free: false
			},
			{
				time_slot: (7 - 1),
				free: true
			},
			{
				time_slot: (8 - 1),
				free: false
			},
			{
				time_slot: (9 - 1),
				free: true
			},
			{
				time_slot: (10 - 1),
				free: false
			},
			{
				time_slot: (11 - 1),
				free: true
			},
			{
				time_slot: (12 - 1),
				free: false
			},
			{
				time_slot: (13 - 1),
				free: false
			},
			{
				time_slot: (14 - 1),
				free: false
			},
			{
				time_slot: (15 - 1),
				free: false
			},
			{
				time_slot: (16 - 1),
				free: false
			},
			{
				time_slot: (17 - 1),
				free: true
			},
			{
				time_slot: (18 - 1),
				free: true
			},
			{
				time_slot: (19 - 1),
				free: false
			},
			{
				time_slot: (20 - 1),
				free: false
			},
			{
				time_slot: (21 - 1),
				free: true
			},
			{
				time_slot: (22 - 1),
				free: true
			},
			{
				time_slot: (23 - 1),
				free: true
			},
			{
				time_slot: (24 - 1),
				free: true
			},
		],
	},
	{
		id: 8,
		slots: [
			{
				time_slot: (1 - 1),
				free: true
			},
			{
				time_slot: (2 - 1),
				free: false
			},
			{
				time_slot: (3 - 1),
				free: true
			},
			{
				time_slot: (4 - 1),
				free: false
			},
			{
				time_slot: (5 - 1),
				free: false
			},
			{
				time_slot: (6 - 1),
				free: false
			},
			{
				time_slot: (7 - 1),
				free: true
			},
			{
				time_slot: (8 - 1),
				free: false
			},
			{
				time_slot: (9 - 1),
				free: true
			},
			{
				time_slot: (10 - 1),
				free: false
			},
			{
				time_slot: (11 - 1),
				free: true
			},
			{
				time_slot: (12 - 1),
				free: false
			},
			{
				time_slot: (13 - 1),
				free: false
			},
			{
				time_slot: (14 - 1),
				free: false
			},
			{
				time_slot: (15 - 1),
				free: false
			},
			{
				time_slot: (16 - 1),
				free: false
			},
			{
				time_slot: (17 - 1),
				free: true
			},
			{
				time_slot: (18 - 1),
				free: true
			},
			{
				time_slot: (19 - 1),
				free: false
			},
			{
				time_slot: (20 - 1),
				free: false
			},
			{
				time_slot: (21 - 1),
				free: true
			},
			{
				time_slot: (22 - 1),
				free: true
			},
			{
				time_slot: (23 - 1),
				free: true
			},
			{
				time_slot: (24 - 1),
				free: true
			},
		],
	},
]

export const month_String = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function SlotBoard({ }) {

	const { function: addSnackSlide } = useContext(SnackContext);

	const [calenderToggle, setCalenderToggle] = useState(false);
	const [date, setDate] = useState();
	const [month, setMonth] = useState();
	const [year, setYear] = useState();

	const [selectedSlots, setselectedSlots] = useState([]);
	const [selectedObj, setSelectedObj] = useState({})
	const [datas, setDatas] = useState([])

	const [cookies, setCookies] = useCookies();
	const router = useRouter();

	const [placeopen, setPlaceopen] = useState(false);



	const refresh_board = ()=>{

		if(!cookies.token){
			router.push("/auth/login")
		}

		let date_board = ""
		if(year && month && date){
			date_board = `&date=${year}-${month+1}-${date}`
		}

		const config = {
			headers: {
				Authorization: `Bearer ${cookies.token}`
			}
		}

		axios.get(`http://localhost:8000/api/slot-board?limit=8${date_board}`, config)
		.then(res=>{
			setselectedSlots([])
			setSelectedObj({})
			setDatas(res.data.results)
		})
		.catch(e=>{
			setselectedSlots([])
			setSelectedObj({})
		})
	}


	useEffect(() => {
		console.log(router.query)

		if(!cookies.token)
		router.push("/auth/login")

		let date_board = ""
		if(year && month && date){
			date_board = `&date=${year}-${month+1}-${date}`
		}
		const config = {
			headers: {
				Authorization: `Bearer ${cookies.token}`
			}
		}

		axios.get(`http://localhost:8000/api/slot-board?limit=8${date_board}`, config)
		.then(res=>{
			setDatas(res.data.results)
		})
		.catch(e=>{
		})

	  
	
	  return () => {}
	}, [year, month, date])
	


	const days_in_month_fun = (m, year)=>{
		if(m===1 && year%4===0){
			return 29
		}
		return days_in_month[m]
	}


	// Change date slide
	const change_date = (side) => {
		if(side==="PRE" && date===1){
			if(month===0){
				setDate(31)
				setMonth(11)
				setYear(year-1)
			}
			else{
				var pre_date = month!==2? days_in_month[month-1] :  days_in_month_fun(month-1, year)
				setDate(pre_date)
				setMonth(month-1)
			}

		}else {
			if(side==="PRE")
				setDate(date-1)
		}

		var days = days_in_month_fun((month+1)%12, year)
		if(side==="NEXT" && date===days){
			if(month===11){
				setDate(1)
				setMonth(0)
				setYear(year+1)
			}else{
				var next_date = month!==0? days_in_month[month+1] :  days_in_month_fun(month+1, year)
				setDate(next_date)
				setMonth(month+1)
			}

		}else {
			if(side==="NEXT")
			setDate(date+1)
		}
	}


	const selectHandle = (key, obj) => {

		let index = selectedSlots.indexOf(key)
		if (selectedObj?.[key]) {

			selectedSlots.splice(index, 1)
			setSelectedObj([...selectedSlots])
			delete selectedObj[key]
			setSelectedObj({...selectedObj})

		} else {
			var obj_t = {}
			obj_t[key] = obj
			setSelectedObj(o=>{return {...obj_t, ...o}})
			setselectedSlots(a=>[...a, key])

		}
	}

	return (
		<>
			<Box display="flex" flexShrink={0} flexDirection="column" sx={{ color: "#7a7a7a", mt: 3, borderRadius: 2, bgcolor: "#ffccbc", color: "#464646", boxShadow1: "2px 2px 10px -5px black" }} width="100%" height={600}>
				<Box justifyContent="right" sx={{ width: "100%", height: "10%", display: "flex", placeItems: "center", px: 1 }}>
					<Box width="90%" display="flex" placeItems="center" justifyContent="space-between">
						<Box display="flex">

							<IconButton sx={{p: 0}} aria-label="" onClick={()=>{change_date("PRE")}}>
								<ArrowLeftIcon viewBox="2 2 20 20" sx={{width: 32, height: 32}} />
							</IconButton>

							<Button sx={{ bgcolor: "#262626", boxShadow: "none", ":hover": { bgcolor: "black" }, mx: 1}} onClick={() => setCalenderToggle(true)} variant="contained">Select Date</Button>

							<IconButton sx={{p: 0}} aria-label="" onClick={()=>{change_date("NEXT")}}>
								<ArrowRightIcon viewBox="2 2 20 20" sx={{width: 32, height: 32}} />
							</IconButton>

							<Button disabled={selectedSlots.length===0} onClick={()=>setPlaceopen(true)} variant="contained" sx={{ boxShadow: "none", ml: 5 }}>confirm</Button>

							{
								placeopen?
									<PlaceBookings refresh_board={refresh_board} selectedSlots={selectedSlots} open={placeopen} setOpen={setPlaceopen} />
								:
									<></>
							}

						</Box>
						<Stack justifyContent={"center"} px={1}>
							<Typography variant="body1" color="#525252">{month_String[month]} {date}, {year}</Typography>
						</Stack>
					</Box>
				</Box>

				<CalenderWithPopup date={date} setDate={setDate} month={month} setMonth={setMonth} year={year} setYear={setYear} open={calenderToggle} setOpen={setCalenderToggle} />

				<Box sx={{ color: "#7a7a7a", display: "flex", width: "100%", height: "90%", p: 1 }}>
					<Box sx={{ width: "10%", height: "100%", p: 1 }}>
						<Stack pt="24px" width="100%" height="100%">
							{
								datas.slice(0, datas.length - 1).map(d => (
									<Stack key={d.id} justifyContent={"center"} sx={{ placeItems: "center", width: "100%", height: "100%", borderTop: "1px solid #a7a7a7" }}><Box>{d.id}</Box></Stack>
								))
							}
							{
								datas.slice(-1).map(d => (
									<Stack key={d.id} justifyContent={"center"} sx={{ placeItems: "center", width: "100%", height: "100%", borderTop: "1px solid #a7a7a7", borderBottom: "1px solid #a7a7a7" }}><Box>{d.id}</Box></Stack>
								))
							}
						</Stack>
					</Box>

					<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", bgcolor: "white", width: "90%", height: "100%", borderRadius: 2, boxShadow: "inset 1px 1px 10px -5px black", p: 1 }}>

						<Box sx={{ width: "100%", textAlign: "left" }}>
							<TimeDisplay times={times} timeLength={timeLength} />
						</Box>

						<Box sx={{ width: "100%", height: "100%" }}>
							<SlotBox data={datas} year={year} month={month} date={date} selectedObj={selectedObj} selectHandle={selectHandle} selectedSlots={selectedSlots} timeLength={timeLength} />
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default SlotBoard;
