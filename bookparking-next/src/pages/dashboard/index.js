import DashboardBox from "@/components/dashboard/DashboardBox";
import { Box, Stack } from "@mui/material";
import styles from "@/styles/Dashboard.module.css";
import SideBar from "@/components/SideBar/SideBar";
import SideBarComponent from "@/components/SideBar/SideComp";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

function DashBoard({  }) {

  const router = useRouter();
  const [ cookies, setCookies ] = useCookies();

  useEffect(() => {
    if(!cookies.token)
    router.push("/auth/login")
  })
  

    return ( 
      <>
        <SideBarComponent>
          <DashboardBox />
        </SideBarComponent>
      </>
     );
}

export default DashBoard;
