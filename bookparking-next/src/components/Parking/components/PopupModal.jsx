import React, { useState } from "react";
import { Box, Stack } from "@mui/material";


function PopupModal({ children, sx={}, open=false, setOpen }) {
    return ( 
		<Box sx={{ display: open ? "block" : "none" }} >
			<Stack sx={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0, justifyContent: "center", placeItems: "center", }}>
				<Box sx={{ position: "absolute", zIndex: 1, ...sx }}>
                    {children}
                </Box>
			</Stack>
			<Box onClick={() => setOpen(false)} sx={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0, zIndex: 0, bgcolor: "#00000085" }}></Box>
		</Box>
     );
}

export default PopupModal;
