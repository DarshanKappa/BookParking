import { Box, Stack, Typography } from "@mui/material";
import { width } from "@mui/system";
import * as d3 from "d3";
import { useD3 } from "hooks/useD3";
import React, { useEffect, useState } from "react";
import SquareIcon from '@mui/icons-material/Square';

const tempData = [
    {
        value: 50,
        name: "Fee",
        color: "#AADEA7",
        font: "white"
    },
    {
        value: 100,
        name: "Booked",
        color: "#2D87BB",
        font: "white"
    },
    {
        value: 12,
        name: "Not Available",
        color: "#E6F69D",
        font: "#707070"
    },
]

function FeeBlockedParkingChart({ sx={} }) {

    const [data, setData] = useState();
    const width = 200, height = 200;
    
    const ref = useD3((svg)=>{

        let g = svg.append("g");

        let radius = Math.min(width, height)/2;

        let arc = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius/2);

        let pie = d3.pie()
            .value(d=>d.value);

        g.selectAll(".arc")
            .data(pie(tempData))
            .join("g")
            .attr("class", "arc")
            .attr("transform", `translate(${radius}, ${radius})`)
            .attr("fill", d=>d.data.color)
            .append("path")
            .attr("d", arc);

        g.selectAll(".arc")
            .data(pie(tempData))
            .append("text")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("fill", d=>d.data.font)
            .attr("transform", (d)=>{
                const [x, y] = arc.centroid(d);
                return `translate(${x}, ${y})`;
            })
            .text(d=>{
                let value = ((+(d.endAngle-d.startAngle))/(2*Math.PI))*100
                return Math.round(value, 2)+"%"
            });

    }, [tempData]);

    useEffect(() => {

      return () => {
      }
    }, [data])
    
    return ( 
			<Box sx={{px: 3, py: 1, ...sx}}>
                <Box>
                    <svg width={width} height={height} ref={ref}></svg>
                </Box>
                <Stack my={2}>
                    {
                        tempData.map(o=>{
                            return (
                                <Box key={o.color} sx={{textAlign: "left", display: "flex"}}>
                                    <SquareIcon sx={{color: o.color}} />
                                    <Stack ml={2} justifyContent={"center"}><Typography variant="span" color="initial">{o.name}</Typography></Stack>
                                </Box>
                        )})
                    }
                    
                </Stack>
			</Box>
     );
}

export default FeeBlockedParkingChart;