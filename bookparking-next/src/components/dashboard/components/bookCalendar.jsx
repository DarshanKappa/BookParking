import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import styles from "@/styles/Calender.module.css";
import SetYear from "./comps/SetYear";
import { ConstructionOutlined } from '@mui/icons-material';



const days = [ "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const month_String = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]



function Calendar({ sx={} }) {

  	const [date, setDate] = useState(new Date());
	const [daysArray, setDaysArray] = useState([]);
	const [month, setMonth] = useState(date.getMonth());
	const [year, setYear] = useState(date.getFullYear());


	// It returns days in a month
	const days_in_month_fun = (date, m)=>{
		if(m===1 && date.getFullYear()%4===0){
			return 29
		}
		return days_in_month[m]
	}


	useEffect(() => {
		let dateArray = []

		let d = new Date(date)
		d.setMonth(month)
		d.setFullYear(year)

	//-----------------------Last Month's Dates-------------------------		

		d.setDate(1)
		let day = d.getDay()
		
		if(day!==0){
			let lastMonthsdate = days_in_month_fun(d, (month===0)?11:month-1) - (day-1)

			while(day!==0){
				dateArray.push({value: lastMonthsdate, dateOfMonth: -1});
				lastMonthsdate++;
				day--;
			}
		}
		
	//-----------------------Current Month's Dates-------------------------

		let currentMothsdays = days_in_month_fun(d, month);
		var current_date_data = 1;
		
		while(current_date_data<=currentMothsdays){
			dateArray.push({value: current_date_data++, dateOfMonth: 0})
		}

	//-----------------------Next Month's Dates-------------------------

		d.setDate(currentMothsdays);
		if(d.getDay()<6){
			var next_months_days = (6-d.getDay())
			var next_date = 1
			
			while(next_months_days--!==0){
				dateArray.push({value: next_date++, dateOfMonth: 1});
			}
		}

	//----------------------Set Today date in Calender--------------------------

	if(d.getFullYear()===date.getFullYear() && d.getMonth()===date.getMonth()){
		var date_value = date.getDate();
		for(var i in dateArray){
			if(dateArray[i].value === date_value && dateArray[i].dateOfMonth === 0){
				dateArray[i] = {...dateArray[i], ...{today: true}}
			}
		}
	}

	//----------------------Divide all the dates accordign weeks----------------


		let tempArray = []
		let loop_rounds = dateArray.length/7
		let loop_count = 0
		let count = 0
		
		while(loop_count<loop_rounds){
			tempArray[loop_count] = []
			let days_limit = 7
			while(days_limit>0){
				tempArray[loop_count].push({...dateArray[count++], ...{day: 7-days_limit}});
				days_limit--;
			}
			loop_count++;
			
		}

	// Set array in State
		setDaysArray(tempArray)

		// console.log(dateArray)
		// console.log(tempArray)

		return () => {
			
		}
	}, [month, year])

	const clickLastMonth = () => {
		setMonth((m)=>{
			// console.log("Clicked Last Month")
			if(m===0){
				setYear(y=>y-1)
				return 11
			}
			return m-1
		})
	}
	
	const clickNextMonth = () => {
		setMonth((m)=>{
			// console.log("Clicked Next Month")
			if(m===11){
				setYear(y=>y+1)
				return 0
			}
			return m+1
		})
	}


	

  return (
		<Stack className={styles.boxStyle} sx={{ p: 2, m: 0, bgcolor: "gainsboro", ...sx}}>
			<Box sx={{display: "flex", placeItems: "center", py: 1}}>
				<IconButton aria-label="" onClick={()=>setYear(y=>y-1)}>
					<KeyboardDoubleArrowLeftIcon className={styles.styling_shade} sx={{width: "16px"}} />
				</IconButton>
				
				<IconButton aria-label="" onClick={clickLastMonth}>
					<KeyboardArrowLeftIcon className={styles.styling_shade} sx={{width: "16px"}}/>
				</IconButton>

				<Typography 
					className={styles.styling_shade} 
					variant="body1" 
					component={'div'} 
					sx={{fontSize: 16,display: "flex", placeItems: "center", flexGrow: 1, justifyContent: "center"}} 
					color="initial"
				>
					{/* {month_String[month]} {year} */}
						<Box>{month_String[month]}</Box>
						<SetYear key={year} value={year} setValue={setYear} />
				</Typography>

				<IconButton aria-label="" onClick={clickNextMonth}>
					<KeyboardArrowRightIcon className={styles.styling_shade} sx={{width: "16px"}}/>
				</IconButton>
				
				<IconButton aria-label="" onClick={()=>setYear(y=>y+1)}>
					<KeyboardDoubleArrowRightIcon className={styles.styling_shade} sx={{width: "16px"}}/>
				</IconButton>
			</Box>
			<Stack>
				<Box sx={{width: "100%", display: "flex", justifyContent: "space-between"}}>
					{
						days.map(v=>(<IconButton key={v} aria-label={v+"_day"} sx={{width: "14.285714286%"}} disabled onClick={()=>{}}><Typography variant="body2" sx={{fontWeight: 600}} color="initial">{v}</Typography></IconButton>))
					}
				</Box>
				{
					daysArray.map(row=>(
							<Box key={row?.[0]?.value+"_"+row?.[0]?.dateOfMonth} sx={{width: "100%", display: "flex", justifyContent: "space-between"}}>
								{
									row.map(day=>(
										(day.dateOfMonth===0)?
											(day.today)?
												<IconButton key={day.dateOfMonth + day.value}  sx={{width: "14.285714286%"}} onClick={()=>{}} className={styles.day_today} ><Typography className={styles.day_today} variant="body1" sx={{}} color="initial">{day.value}</Typography></IconButton>
											:
												(day.day===0)?
													<IconButton key={day.dateOfMonth + day.value}  sx={{width: "14.285714286%"}} onClick={()=>{}}><Typography className={styles.day_sunday} variant="body1" sx={{}} color="initial">{day.value}</Typography></IconButton>
												:
													(day.day===6)?
														<IconButton key={day.dateOfMonth + day.value} sx={{width: "14.285714286%"}} onClick={()=>{}}><Typography className={styles.day_saturday} variant="body1" sx={{}} color="initial">{day.value}</Typography></IconButton>
													:
														<IconButton key={day.dateOfMonth + day.value}  sx={{width: "14.285714286%"}} onClick={()=>{}}><Typography className={styles.current_months_date} variant="body1" sx={{}} color="initial">{day.value}</Typography></IconButton>
										:
											(day.dateOfMonth===-1)?
												<IconButton key={day.value+"_last"}  sx={{width: "14.285714286%"}} onClick={()=>{}}><Typography className={styles.not_current_months_date} variant="body1" color="initial">{day.value}</Typography></IconButton>
											:
												<IconButton key={day.value+"_next"} sx={{width: "14.285714286%"}} onClick={()=>{}}><Typography className={styles.not_current_months_date} variant="body1" color="initial">{day.value}</Typography></IconButton>
									))
								}
							</Box>
						))
				}
			</Stack>
		</Stack>
  );
}

export default Calendar;