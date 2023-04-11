import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography, TextField, AppBar, Button } from "@mui/material"
import { red } from "@mui/material/colors"
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Input from "@/components/Inputs/Input";
import Navigation from "@/components/Navigation/Navigation";
import SignUpLogIn from "@/components/SignupLogin/SignUpLogIn";
import SideBarComponent from "@/components/SideBar/SideComp";
import { Router, useRouter } from "next/router";
import { useCookies } from "react-cookie";


export default function Home() {

  const router = useRouter();
  const [ cookies, setCookies ] = useCookies();
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(!cookies.token)
      router.push("/auth/login")
    else{
      setLoading(false)
    }
  })

  return (
    loading?
      React.Fragment
    :
      <>
        <SideBarComponent>
          Home
        </SideBarComponent>
      </>
  )
}
