import React from "react";
import { Box, Stack } from "@mui/material";


function Input({ key, type, icon, label, sx={}, field_name, register=()=>{}, required }) {
    return ( 
        <>
            <Box sx={{
                borderRadius: 100,
                backgroundColor: "#e7e7e7",
                display: "flex",
                justifyContent: "space-between",
                placeItems: "center",
                px: 2,
                boxShadow: "0px 0px 5px -1px grey",
                mb: 3,
                color: "gray",
                ...sx
            }}>
                <Stack key={key} sx={{pr: 2}}>
                {
                    icon? icon : React.Fragment
                }
                </Stack>
                
                <input 
                    style={{
                        background: "transparent",
                        outline: "none",
                        border: "none",
                        lineHeight: "35px",
                        width: "100%",
                        color: "#2a2a2a",
                        fontSize: "15px",
                        textAlign: "left"
                        }}
                    key={key}
                    type={type}
                    name={field_name}
                    placeholder={label}
                    {...register(field_name)}
                    required={required}
                />
            </Box>
        </>
     );
}

export default Input;