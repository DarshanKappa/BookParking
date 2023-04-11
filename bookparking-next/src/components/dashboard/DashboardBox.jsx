import { Box, Stack, Avatar } from "@mui/material";
import Input from "../Inputs/Input";
import SearchIcon from '@mui/icons-material/Search';
import styles from "@/styles/Dashboard.module.css";
import FeeBlockedParkingChart from "./components/parkingchat1";
import BookCalender from "./components/bookCalendar";
import BookingHistory from "./components/BookingHistory";




function DashboardBox({  }) {
		return ( 
				<>
					<Stack flexDirection="row" justifyContent="space-between" >
							<Stack justifyContent="center" sx={{flexGrow: 0}}>
									<Box sx={{textAlign: "left", fontSize: 25}}>Dashboard</Box>
							</Stack>
							<Stack >
									<Input sx={{mb: 0,}} label="Search" icon={<SearchIcon />} />
							</Stack>
							<Stack ml={5}>
									<Avatar src="https://www.google.com" color="primary" alt="Darshan" sx={{bgcolor: "error.light"}} />
							</Stack>
					</Stack>

					<Stack justifyContent="space-between" className={styles.paper} sx={{position: "relative", color: "#222222", bgcolor: "#c5cae9", height: 150, my: 3, p: 2}}>
							<Box sx={{position: "absolute", right: {xs: "3%", sm: "3%", md: "4%", lg:"6%"}, bottom: {xs: "-30px", sm: "-30px", md: "-30px", lg:"-40px"}, height: {xs: "150px", sm: "170px", md: "200px", lg:"230px"}}}>
									<img src="/parking3.webp" style={{ height: "inherit"}} />
							</Box>
							<Stack sx={{textAlign: "left", mb: 2, fontSize: 20}}>Hello, Darshan</Stack>
							<Stack sx={{textAlign: "left" }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, amet.</Stack>
					</Stack>

					<Stack sx={{flexDirection: "row", justifyContent: "space-around", width: "100%", flexWrap: "wrap"}}>
							<Box my={3} mx={1}>
								<FeeBlockedParkingChart sx={{ boxShadow: "1px 1px 11px -4px black", borderRadius: "15px", bgcolor: "white" }} />
							</Box>

							<Box my={3} mx={1}>
								<BookCalender sx={{}} />
							</Box>

							<Box my={3} mx={1}>
								<BookingHistory sx={{ width: 370, height: 430 }} />
							</Box>
					</Stack>
				</>
		 );
}

export default DashboardBox;