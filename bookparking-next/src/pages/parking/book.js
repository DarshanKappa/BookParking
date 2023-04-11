import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import styles from "@/styles/Dashboard.module.css";
import SideBar from "@/components/SideBar/SideBar";
import SideBarComponent from "@/components/SideBar/SideComp";
import Booking from "@/components/Parking/booking";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";


function Book({  }) {

  const router = useRouter();
  const [ cookies, setCookies ] = useCookies();

  useEffect(() => {
    console.log(router.query)
    if(!cookies.token)
    router.push("/auth/login")
  })

    return ( 
      <>
        <SideBarComponent>
          <Booking />
        </SideBarComponent>
      </>
     );
     
}

export default Book;