import DashboardBox from "@/components/dashboard/DashboardBox";
import { Box, Stack } from "@mui/material";
import styles from "@/styles/Dashboard.module.css";


function DashBoard({  }) {
    return ( 
      <Stack className={styles.dashboardPage} sx={{}}>
        <Stack className={styles.navBox} sx={{width: "25%", m: 1, my: 2}}>
          Navigation
        </Stack>
        <Stack className={styles.dashBox} sx={{width: "100%", m: 2, ml: 1}}>
          <DashboardBox />
        </Stack>
      </Stack>
     );
}

export default DashBoard;