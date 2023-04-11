import { Stack } from "@mui/system";
import SideBar from "./SideBar";
import styles from "@/styles/Dashboard.module.css";


function SideBarComponent({ children }) {
	return (
		<>
      <Stack className={styles.dashboardPage} flexDirection="row">
        <Stack className={styles.navBox} sx={{width: {xs: "25%", sm: "25%", md: "25%", lg: "20%"}, m: 1, my: 2, placeItems: "center", display: {xs: "none", ms: "none", md: "flex", lg: "flex"}}}>
          <SideBar />
        </Stack>
        <Stack className={styles.scroll} sx={{width: "100%", height: "100vh", overflowY: "scroll", p: 2, pl: 1}}>
          { children }
        </Stack>
      </Stack>
		</>
	);
}

export default SideBarComponent;
