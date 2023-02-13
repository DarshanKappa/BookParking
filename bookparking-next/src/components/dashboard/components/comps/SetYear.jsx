import React, { useState } from "react";
import Box from '@mui/material/Box'
import { fontSize } from "@mui/system";



function SetYear({value, setValue}) {

    const [flag, setFlag] = useState(false)
    const [c_value, setC_value] = useState(value)

    const handleClick = () => {
        setFlag(true)
    }

    const handleChange = (e) => {
        let input_value = e.target.value;
        setC_value(input_value)
    }

    const handleBlur = () => {
        if(typeof(c_value)==="string")
            for(var i of c_value){
                if(isNaN(Number(i))){
                    setC_value(value)
                    setFlag(false)
                    return 0;
                }
            }
        setValue(c_value)
        setFlag(false)
    }

    const handleEnter = (e) => {
        if(e.key === "Enter"){
            e.target.blur()
        }
    }

    return ( 
        <Box sx={{width: "40%", textAlign: "left", cursor: "pointer"}} px={1} onClick={handleClick}>
            {
                (flag)?
                    <input 
                        type="number" 
                        style={{
                            outline: "none",
                            border: "none",
                            textAlign: "left",
                            width: "65px",
                            fontSize: "inherit",
                            color: "inherit",
                            padding: 0
                        }}
                        autoFocus
                        onChange={handleChange}
                        onKeyDown={handleEnter}
                        onBlur={handleBlur}
                        value={c_value}
                    />           
                :
                    c_value
            }
        </Box>
     );
}

export default SetYear;