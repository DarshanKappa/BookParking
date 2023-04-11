import { Box, Stack, Typography, IconButton } from "@mui/material";
import styles from "@/styles/Dashboard.module.css";
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import GridViewIcon from '@mui/icons-material/GridView';
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";


function SideBar({ }) {

	const [cookie, setCookie, removeCookie] = useCookies(["token"]);

	const router = useRouter();

	const pushRouter = (e, path) => {
		e.preventDefault()
		router.push(path)
	}

	return (
		<Stack sx={{ py: 5, px: 0,  width: "fit-content" }}>
			<Box className={styles.sidebar_box} sx={{width: "initial"}}>
				<IconButton aria-label="" sx={{width: "100%", justifyContent: "left"}} onClick={e=>pushRouter(e, "/dashboard")}>
					<GridViewIcon sx={{color: "white", mr: 2}} />
					<Typography variant="body2" sx={{ textAlign: "left" }} color="white">Dashboard</Typography>
				</IconButton>
			</Box>

			<Box className={styles.sidebar_box} sx={{width: "initial"}}>
				<IconButton aria-label="" sx={{width: "100%", justifyContent: "left"}} onClick={() => { }}>
					<FmdGoodIcon sx={{color: "white", mr: 2}} />
					<Typography variant="body2" sx={{ textAlign: "left" }} color="white">Running Slot</Typography>
				</IconButton>
			</Box>

			<Box className={styles.sidebar_box} sx={{width: "initial"}}>
				<IconButton aria-label="" sx={{width: "100%", justifyContent: "left"}} onClick={e=>pushRouter(e, "/parking/book")}>
					<TimeToLeaveIcon sx={{color: "white", mr: 2}} />
					<Typography variant="body2" sx={{ textAlign: "left" }} color="white">Book Parking</Typography>
				</IconButton>
			</Box>

			<Box className={styles.sidebar_box} sx={{width: "initial"}}>
				<IconButton aria-label="" sx={{width: "100%", justifyContent: "left"}} onClick={() => { }}>
					<LibraryBooksIcon sx={{color: "white", mr: 2}} />
					<Typography variant="body2" sx={{ textAlign: "left" }} color="white">History</Typography>
				</IconButton>
			</Box>

			<Box className={styles.sidebar_box} sx={{width: "initial"}}>
				<IconButton aria-label="" sx={{width: "100%", justifyContent: "left"}} onClick={() => { }}>
					<PaymentIcon sx={{color: "white", mr: 2}} />
					<Typography variant="body2" sx={{ textAlign: "left" }} color="white">Payments</Typography>
				</IconButton>
			</Box>

			<Box className={styles.sidebar_box} sx={{width: "initial"}}>
				<IconButton aria-label="" sx={{width: "100%", justifyContent: "left"}} onClick={() => { }}>
					<TimeToLeaveIcon sx={{color: "white", mr: 2}} />
					<Typography variant="body2" sx={{ textAlign: "left" }} color="white">Payments</Typography>
				</IconButton>
			</Box>

			<Box className={styles.sidebar_box} sx={{width: "initial"}}>
				<IconButton aria-label="" sx={{width: "100%", justifyContent: "left"}} onClick={(e) => {removeCookie('token'); pushRouter(e, "/auth/login")}}>
					<LogoutIcon sx={{color: "white", mr: 2}} />
					<Typography variant="body2" sx={{ textAlign: "left" }} color="white">Logout</Typography>
				</IconButton>
			</Box>



		</Stack>
	);
}

export default SideBar;