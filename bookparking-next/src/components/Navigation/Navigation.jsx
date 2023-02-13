import { Box, Stack } from "@mui/material";


function Navigation({sx={}}) {
    return ( 
    <Box sx={{position: "relative",
        width: {xs: 0, sm: 70, md: 70, lg: 80},
        flexShrink: 0,
        ...sx
      }}
    >
      <Stack sx={{
          width: {xs: 0, sm: 70, md: 70, lg: 80},
          backgroundColor: "black",
          minHeight: "100vh",
          position: "fixed"
        }}
      >


      </Stack>
    </Box>
     );
}

export default Navigation;
