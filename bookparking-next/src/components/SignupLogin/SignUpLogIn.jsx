import React, { useContext, useState } from "react";
import { Box, Paper, Stack, Typography, Button, IconButton } from "@mui/material";
import Input from "../Inputs/Input";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useForm } from "react-hook-form";
import CustomForm from "./components/CustomForm";
import { SnackContext } from "contexts/SnackBarContext";
import axios from "axios";
import { useCookies } from "react-cookie";
import { signin, signup } from "api_collection/api";
import { useRouter } from "next/router";


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

  const [formData, setFormData] = useState();
  const { function: raiseSnackMessage } = useContext(SnackContext);
  const [ cookies, setCookies ] = useCookies();
  const router = useRouter();

  const onSubmit = (data, step, total_steps)=>{
    // At SignUp
    if(formType==="signup"){

      // Final Submition
      if(step===total_steps){

        const res = (res) => {
          if(res.status === 201){
              let token = res.data.access_token
              let expiry = res.data.access_token_lifetime
              console.log(expiry)
              setCookies("token", token, { path: "/", maxAge: Number(expiry) })
              router.push("/")
              raiseSnackMessage("success", "Successfully Loged In")
          }else{
              raiseSnackMessage("warning", JSON.stringify(res.data))
          }
        }

        const catch_error = (e)=>{
          raiseSnackMessage("warning", JSON.stringify(e.response.data))
        }

        signup(data, res, catch_error)
        
      }else{

      }

      return step
    }

    // At LogIn
    if(formType==="login"){

      const res = (res)=>{
                    if(res.status === 200){
                        let token = res.data.access_token
                        let expiry = res.data.access_token_lifetime
                        console.log(expiry)
                        setCookies("token", token, { path: "/", maxAge: Number(expiry) })
                        router.push("/")
                        raiseSnackMessage("success", "Successfully Loged In")
                    }else{
                        raiseSnackMessage("warning", JSON.stringify(res.data));
                    }
                  }

      const catch_error = (e)=>{
                            raiseSnackMessage("warning", JSON.stringify(e.response.data));
                          }

      // Calling Signup API and return access token
      signin({email: data.email, password: data.password}, res, catch_error)

    }
  }

  const push_to_login = ()=>{
    router.push('/auth/login')
  }

  const push_to_signup = ()=>{
    router.push('/auth/signup')
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
            <Typography width={40} height={35} variant="h4">{formType==="signup"?"Signup":"Login"}</Typography>
          </Box>
          <CustomForm form_type={formType} setValue={onSubmit} form={Forms[formType]} />

          <Box sx={{textAlign: "left", color: "gray", mt: 10}}>
            {
              formType==="signup"?
                <Typography variant="span" color="inherit">If you have already account  
                  <Typography variant="span" color="blue" sx={{cursor: "pointer"}} onClick={push_to_login}> Login</Typography>
                </Typography>
              :
                <Typography variant="span" color="inherit">If you are not registerd
                  <Typography variant="span" color="blue" sx={{cursor: "pointer"}} onClick={push_to_signup}> SingUp</Typography>
                </Typography>
            }
          </Box>
        </Box>

		  </Stack>
		</Paper>
	 );
}

export default SignUpLogIn;