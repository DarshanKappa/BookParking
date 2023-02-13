import React, { useState } from "react";
import { Box, Paper, Stack, Typography, Button, IconButton } from "@mui/material";
import Input from "../Inputs/Input";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useForm } from "react-hook-form";
import CustomForm from "./components/CustomForm";


const signupForm = [
  [
    {
      label: "First Name",
      type: "text",
      icon: undefined,
      field_name: "first_name",
      required: true
    },
    {
      label: "Last Name",
      type: "text",
      icon: undefined,
      field_name: "last_name",
      required: true
    },
  ],
  [
    {
      label: "Username",
      type: "text",
      icon: <PersonIcon />,
      field_name: "username",
      required: true
    },
    {
      label: "Email",
      type: "email",
      icon: <EmailIcon />,
      field_name: "email",
      required: true
    },
    {
      label: "Mobile",
      type: "number",
      icon: <PhoneIphoneIcon />,
      field_name: "mobile",
      required: true
    },
  ],
  [
    {
      label: "Password",
      type: "password",
      icon: null,
      field_name: "password",
      required: true
    },
    {
      label: "Comfirm Password",
      type: "password",
      icon: null,
      field_name: "comfirm_password",
      required: true
    },
  ],
]

const loginForm = [
    [
      {
        label: "Email",
        type: "email",
        icon: <EmailIcon />,
        field_name: "email",
        required: true
      },
      {
        label: "Password",
        type: "password",
        icon: undefined,
        field_name: "password",
        required: true
      },
    ],
]

const Forms = {
  signup: signupForm,
  login: loginForm
}


function SignUpLogIn({ formType }) {

  const [formData, setFormData] = useState()

  const onSubmit = (data)=>{
    
  }


	return ( 
		<Paper sx={{minHeight: "70vh", px: 3, py: 5, width: {xm: 800, sm: 580, md: 850, lg: 1000}, boxShadow: "4px 3px 20px -7px gray", borderRadius: 8}}>
		  <Stack flexDirection={"row"} sx={{height: "100%", position: "relative"}}>

        <IconButton sx={{position: "absolute", top: 0, left: 0, p: 0}} aria-label="" onClick={()=>{}}>
          <KeyboardBackspaceIcon sx={{width: 40, height: 35}} />
        </IconButton>

        <Stack sx={{width: "50%", justifyContent: "center", placeItems: "center"}}>
          <Box width={"50%"}>
            <img width="100%" src="/parking-image.png" alt="" />
          </Box>
        </Stack>
        
        <Box sx={{width: "50%", display: "flex", flexDirection: "column", paddingX: 2}}>
          <Box sx={{mb: 3}}>
            <Typography width={40} height={35} variant="h4">{formType==="singup"?"Singup":"Login"}</Typography>
          </Box>
          <CustomForm setValue={onSubmit} form={Forms[formType]} />
        </Box>

		  </Stack>
		</Paper>
	 );
}

export default SignUpLogIn;