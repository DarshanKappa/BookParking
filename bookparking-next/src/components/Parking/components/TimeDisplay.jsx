import { Typography, Box, Stack } from "@mui/material";


function TimeDisplay({ times, timeLength }) {
	return (
		<>
			{
				times.slice(0, timeLength + 1).map((t, index) => (
					<Stack key={t.value + index} sx={{ display: "inline-flex", flexDirection: "column", placeItems: "center", width: (100 / (timeLength + 1)) + "%" }}>
						<Typography variant="body2" sx={{ fontSize: 12, lineHeight: "20px", color: "gray", width: "100%"}}>
								{t.value.slice(0, -2)}
								<Typography textAlign="center" sx={{fontSize: "11px"}} variant="span">{t.value.slice(-2)}</Typography>
						</Typography>
						<Box sx={{borderRight: "1px solid gray", width: 0, height: "3px"}}></Box>
					</Stack>
				))
			}
		</>
	);
}

export default TimeDisplay;
