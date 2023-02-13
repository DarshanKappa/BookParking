import { Box, Stack, Typography } from "@mui/material";
import styles from "@/styles/Dashboard.module.css";



function BookingHistory({ sx={} }) {
    return (
        <>
            <Stack sx={{ justifyContent: "space-between", ...sx}}>
                <Box sx={{bgcolor: "#ffcdd2", marginX: 1, borderRadius: "10px", py: 1}}>
                    <Typography variant="h6" color="initial">History</Typography>
                </Box>

                <Stack className={styles.scroll} sx={{ p: 1, height: "85%", display: "block", overflowY: "auto" }}>
                    <Box className={styles.history_box}></Box>
                    <Box className={styles.history_box}></Box>
                    <Box className={styles.history_box}></Box>
                    <Box className={styles.history_box}></Box>
                    <Box className={styles.history_box}></Box>
                    <Box className={styles.history_box}></Box>
                    <Box className={styles.history_box}></Box>
                    <Box className={styles.history_box}></Box>
                    <Box className={styles.history_box}></Box>
                    <Box className={styles.history_box}></Box>
                    <Box className={styles.history_box}></Box>
                
                </Stack>
            </Stack>
        </>
     );
}

export default BookingHistory;