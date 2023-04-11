import React, { useContext, useEffect, useState } from "react";
import { Box, Stack, Avatar, Typography, Button, IconButton, TextField } from "@mui/material";
import PopupModal from "./PopupModal";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { times, month_String } from "./SlotBoard";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { SnackContext } from "contexts/SnackBarContext";



const days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function PlaceBookings({ open, setOpen, selectedSlots, refresh_board }) {

    const [bookings, setBookings] = useState([]);
    const [vehicleNo, setVehicleNo] = useState("");
    const [cookies, setCookies] = useCookies();
	const router = useRouter();
    const { function: raiseSnackMessage } = useContext(SnackContext);
    const [errorV, setErrorV] = useState(false)


    useEffect(()=>{
        let dict = {}
        let slot = []
        let dict2 = []
        if(open){
            for(var i of selectedSlots){
                let [dt, s] = i.split("S");
                if(slot.indexOf(s)===-1){
                    slot.push(s)
                }

                if(dict?.[s]){
                    dict[s].push(dt);
                }else{
                    dict[s] = [dt]
                }
            }


            for(var i of slot){
                let sl = [...dict[i]]
                let e = sl.pop()
                let el = [`${e}S${i}`]

                if(sl.length===0){
                    dict2.push([...el])
                    continue
                }

                while(sl.length!==0){

                    // Pre slot
                    let fv = el[0].split("S")[0]
                    var [d, t] = fv.split("T")
                    
                    if(t!="1"){
                        let ind = sl.indexOf(`${d}T${Number(t)-1}`)
                        if(ind!==-1){
                            el = [`${d}T${Number(t)-1}S${i}`, ...el]
                            sl.splice(ind,1)
                            continue
                        }
                    }else{
                        let pd = get_preday(d)
                        let ind = sl.indexOf(`${pd}T${24}`)
                        if(ind!==-1){
                            el = [`${pd}T${24}S${i}`, ...el]
                            sl.splice(ind,1)
                            continue
                        }
                    }
                    
                    // Next slot
                    let lv = el[el.length-1].split("S")[0]
                    var [d, t] = lv.split("T")
                    
                    if(t!="24"){
                        let ind = sl.indexOf(`${d}T${Number(t)+1}`)
                        if(ind!==-1){
                            el = [...el, `${d}T${Number(t)+1}S${i}`]
                            sl.splice(ind,1)
                            continue
                        }
                    }else{
                        let nd = get_nextday(d)
                        let ind = sl.indexOf(`${nd}T${1}`)
                        if(ind!==-1){
                            el = [...el, `${nd}T${1}S${i}`]
                            sl.splice(ind,1)
                            continue
                        }
                    }

                    dict2.push([...el])
                    el = [`${sl.pop()}S${i}`]
                }
                dict2.push([...el])
            }
        }

        var bookings_list = []
        for(var i of dict2){
            if(i.length!==0){
                var [dt, s] = i[0].split("S");
                var [d, t] = dt.split("T");
                var [yy, mm, dd] = d.split("-");
                console.log(d, yy, mm, dd)
                
                var [edt, es] = i[i.length-1].split("S");
                var [ed, et] = edt.split("T");
                if(et==="24"){
                    ed = get_nextday(ed)
                }
                var [eyy, emm, edd] = ed.split("-");
                console.log(ed, eyy, emm, edd)
    
                bookings_list.push({
                    date: {
                        y: Number(yy),
                        m: Number(mm)+1,
                        d: Number(dd),
                        time: Number(t)-1,
                    },
                    expiry: {
                        y: Number(eyy),
                        m: Number(emm)+1,
                        d: Number(edd),
                        time: Number(et),
                        },
                    duration: i.length,
                    slot: Number(s)
                })
            }
        }
        setBookings(bookings_list)
        
    }, [selectedSlots, open]);
    
    const place_booking = ()=>{

        if(vehicleNo!==""){
            setVehicleNo(false)
            var req_body = []
            for(var obj of bookings){
                req_body.push({
                    slot_no: obj.slot,
                    slot_time: `${obj.date.y}-${obj.date.m}-${obj.date.d}T${obj.date.time}:00`,
                    slot_duration: obj.duration,
                    vehicle_no: vehicleNo

                })
            }

            if(!cookies.token){
                router.push("/auth/login")
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }

            axios.post("http://localhost:8000/api/slot-booking/", req_body, config)
            .then(res=>{
                if(res?.data?.url){
                    router.push(res.data.url)
                }else{
                    raiseSnackMessage("error", "Payment has not initiated")
                }
                // setVehicleNo("")
                // setOpen(false)
                // refresh_board()
            })
            .catch(e=>{
                for(var i of e?.response?.data?.error?.error_list){
                    for(var j of Object.keys(i)){
                        if(i!=="request_body"){
                            raiseSnackMessage("warning", i?.[j])
                        }
                    }
                }
            })
        }else{
            setErrorV(true)
        }

    }

    const remove_slot = (obj)=>{
        console.log(obj)
        var index = bookings.indexOf(obj)
        setBookings(b=>{b.splice(index, 1); return [...b]})
    }

    const get_preday = (date)=>{
        let [y, m, d] = date.split("-")
        y = Number(y)
        m = Number(m)
        d = Number(d)
        
        if(d==1){
            let mm = m==0?11:m-1
            let dd = days_in_month_fun(y, mm)
            let yy = m==0?y-1:y
            return `${yy}-${mm}-${dd}`
        }else{
            let dd = d-1
            return `${y}-${m}-${dd}`
        }
    }

    const get_nextday = (date)=>{
        let [y, m, d] = date.split("-")
        y = Number(y)
        m = Number(m)
        d = Number(d)

        let ld = days_in_month_fun(y, m)

        if(ld==d){
            let dd = 1
            let mm = m==11?0:m+1
            let yy = m==11?y+1:y

            return `${yy}-${mm}-${dd}`
        }else{
            let dd = d+1
            return `${y}-${m}-${dd}`
        }
    }

    const days_in_month_fun = (y, m)=>{
		if(m===1 && y%4===0){
			return 29
		}
		return days_in_month[m]
	}

    console.log(bookings)


	return (
        <PopupModal open={open} setOpen={setOpen} sx={{px: 5, display: 'flex', flexDirection: "column", justifyContent: "space-between", placeItems: 'center', py: 2, width: 500, height: 500, bgcolor: "white" }}>
            <Box>
                <Typography sx={{mb: 1}} variant="h6" color="initial">Book Parking</Typography>
            </Box>

            <Box width={"100%"}>
                <TextField
                  id="vehicle_no"
                  label={"Vehicle No"}
                  onChange={(e)=>{setVehicleNo(e.target.value)}}
                  autoComplete='off'
                  sx={{textAlign: "left"}}
                  textAlign="left"
                  helperText={errorV&&vehicleNo===""?<Typography variant="body2" color="error">please enter vehicle number</Typography>:undefined}
                />
            </Box>

            <Stack width={"100%"}>
                <Box sx={{my: 1}} display="flex" >
                                <Box width={"45%"}>
                                    <Typography sx={{color: '#505050', fontWeight: 600}} textAlign={'left'} variant="body1" color="initial">
                                        Date - Time
                                    </Typography>
                                </Box>
                                <Box width={"20%"} display="flex" sx={{placeItems: "center"}}>
                                    <Typography sx={{color: '#505050', fontWeight: 600}} variant="body1" color="initial">
                                        Slot No
                                    </Typography>
                                </Box>
                                <Box width={"22%"} display="flex" sx={{placeItems: "center"}}>
                                    <Typography sx={{color: '#505050', fontWeight: 600}} variant="body1" color="initial">
                                        Rate
                                    </Typography>
                                </Box>
                </Box>
                <Stack py={1} width={"100%"}>


                    {
                        bookings.map(book=>(
                            <Box sx={{my: 1}} key={book.slot} display="flex" justifyContent="space-between">
                                <Box width={"45%"}>
                                    <Typography sx={{color: '#505050'}} textAlign={'left'} variant="body1" color="initial">
                                        {month_String[book.date.m-1]} {book.date.d}, {book.date.y} - {times[book.date.time].value.toUpperCase().slice(0, times[book.date.time].value.length-2)} {times[book.date.time].value.toUpperCase().slice(times[book.date.time].value.length-2)}
                                    </Typography>
                                    <Typography sx={{color: '#505050'}} textAlign={'left'} variant="body1" color="initial">
                                        {month_String[book.expiry.m-1]} {book.expiry.d}, {book.expiry.y} - {times[book.expiry.time].value.toUpperCase().slice(0, times[book.expiry.time].value.length-2)} {times[book.expiry.time].value.toUpperCase().slice(times[book.expiry.time].value.length-2)}
                                        {/* - {times[(book.time+book.duration)%24].value} */}
                                    </Typography>
                                </Box>
                                <Box width={"20%"} display="flex" sx={{placeItems: "center"}}>
                                    <Typography sx={{color: '#505050'}} variant="body1" color="initial">
                                        {book.slot}
                                    </Typography>
                                </Box>
                                <Box width={"22%"} display="flex" sx={{placeItems: "center"}}>
                                    <Typography sx={{color: '#505050'}} variant="body1" color="initial">
                                        25 Rs
                                    </Typography>
                                </Box>
                                <Box width={"13%"} sx={{display: "flex", placeItems: "center", justifyContent: "end"}}>
                                    <IconButton aria-label="" onClick={()=>remove_slot(book)}>
                                        <RemoveCircleOutlineIcon sx={{color: "red"}} />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))
                    }
                </Stack>
                <hr width={"100%"} />
                <Box display="flex" width={"100%"}>
                    <Box sx={{width: "65%", display: "flex"}}>
                        <Typography variant="body1" color="initial">
                            Total
                        </Typography>
                    </Box>
                    <Box sx={{width: "25%", display: "flex"}}>
                        <Typography variant="body1" color="initial">
                            75 Rs
                        </Typography>
                    </Box>
                </Box>
            </Stack>

            <Box mt={2}>
                <Button sx={{width: 200}} onClick={place_booking} color="success" variant="contained">Place</Button>
            </Box>
        </PopupModal>
	);
}

export default PlaceBookings;
