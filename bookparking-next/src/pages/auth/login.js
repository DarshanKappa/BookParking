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
    <Navigation sx={{display: "none"}} />
    <Box sx={{width: "100%", position: "relative"}}>
        <Box sx={{position: "fixed", top: 0, backgroundColor: "#1d476aeb", width: "100%", height: {xs: 120, sm: 120, md: 150, lg: 160}, borderBottomLeftRadius: 80}}  />
        <Box sx={{position: "absolute", top: 0, left: 0,
                  padding: 5, width: "100%", height: "fit-content", minHeight: "100vh",
                  display: "flex", justifyContent: "center", flexDirection: "column", placeItems: "center",
                }}>

          <SignUpLogIn formType={"login"} />
        </Box>
    </Box>
    </Box>
  )
}