import React from "react";
import { Box, Paper, Stack, Typography, TextField, AppBar, Button } from "@mui/material"
import { red } from "@mui/material/colors"
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Input from "@/components/Inputs/Input";
import Navigation from "@/components/Navigation/Navigation";
import SignUpLogIn from "@/components/SignupLogin/SignUpLogIn";


export default function Home() {
  return (
    <Box display="flex" >
      Home Page
    </Box>
  )
}


{/* <Box>
<Box sx={{width: "100vw", height: "100vh", overflow: "hidden"}}>
  <svg preserveAspectRatio="none" viewBox="0 0 500 500" height={"100%"} width={"100%"}>
    <g>
      <rect x={0} y={0} width={500} height={500} fill="rgb(239 154 154 / 60%)" />
        <circle cx={480} cy={30} r={200} fill="mediumspringgreen" />
    </g>
  </svg>
</Box>
<Box padding={8} sx={{ width: "100%",  position: "absolute", top: 0, left: 0 }}>
<Paper sx={{position: "relative", width: "100%" ,minHeight: "70vh", color: "white", borderRadius: 5}}>
  <Box sx={{backgroundColor: "#1d476aeb", width: "100%", minHeight: "25vh", borderRadius: 5, borderBottomLeftRadius: 80, borderBottomRightRadius: 0}}  />
  <Box sx={{position: "absolute", top: 0, left: 0,
            padding: 5, width: "100%", height: "100%"
          }}>
    
    <Stack flexDirection={"row"} sx={{height: "100%"}}>
      <Box sx={{backgroundColor: "tomato", width: "100%", height: "100%"}}>dar</Box>
      <Box sx={{width: "100%", height: "100%", display: "flex", flexDirection: "column", paddingX: 2}}>
        <Box sx={{mb: 2}}>
          <Typography variant="h5" color="white">SignUp</Typography>
        </Box>
        <Box>
          <Input icons={<PersonIcon />} label="First Name" />
          <Input icons={<EmailIcon />} label="Last Name" />
          <Input icon={<PersonIcon />} label="Username" />
          <Input icon={<EmailIcon />} label="Email" />
          <Input icons={<PersonIcon />} label="First Name" />
          <Input icons={<EmailIcon />} label="Last Name" />
          <Input icon={<PersonIcon />} label="Username" />
          <Input icon={<EmailIcon />} label="Email" />
          
        </Box>
      </Box>
    </Stack>
  </Box>
</Paper>
</Box>
</Box> */}