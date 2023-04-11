import { Typography, Box, Stack, Button } from '@mui/material'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { payment_status_API } from 'api_collection/api';


const data = [
		"status",
		"created at",
		"slot date",
		"booking id",
		"slot timing",
		"amount",
		"currency",
		"total taxes",
		"fees",
		"billing instrument",
		"instrument type",
		"name",
		"email",
		"phone",
		"transaction id",
		"payment type",
		"failure",
]


function PaymentResonse() {

	const router = useRouter();
	const [payment_data, setPayment_data] = useState({})
	const request = payment_status_API()

	console.log(request)

	useEffect(() => {
		console.log(router.query)
		console.log(process.env.SERVER_HOST)
		const json = {
			"payment_id": router.query.payment_id
		}

		get_data();
	}, [router.query])
	
	const get_data = useCallback(
		() => {

			const json = {
				"payment_id": router.query.payment_id
			}
			console.log(router.query.payment_request_id)
			axios.post(`${"http://localhost:8000"}/payments/${router.query.payment_request_id}/status/`, json)
			.then(res=>{
				console.log(res)
				setPayment_data(res.data)
			})
			.catch(e=>{
				console.log(e)
			})

		}, [router.query],);
		
		
	return (
		<>
			<Box width="60%" sx={{ position: "absolute", 
															top: "10%", 
															left: "20%", 
															p: 2, 
															boxShadow: "1px 1px 5px 0px grey",
															height: "80%",
															display: "flex",
															flexDirection: "column"
														}}
			>
				<Box>
					<Typography textAlign="center" variant="h5" color="initial">Payment Status</Typography>
				</Box>
				<Stack width={"100%"} sx={{mt: 3, py:1, overflowY: "scroll"}}>
					{
						data.map((k, index)=>(
							<Box key={index} width={"100%"} sx={{display: "flex", my: 1, px: 2}}>
								<Box width={"40%"}>
									<Typography variant="body1" color="initial">{k}</Typography>
								</Box>
								{
									k==="status"?
										<Box width={"60%"}>
											<Typography variant="body1" color={payment_data[k]==="SUCCESS"?"seagreen":payment_data[k]==="FAILED"?"tomato":"#ff9800"}>{payment_data[k]}</Typography>
										</Box>
									:
										<Box width={"60%"}>
											<Typography variant="body1" color="initial">{payment_data[k]}</Typography>
										</Box>
								}
							</Box>
						))
					}
				</Stack>
				<Box display={'flex'} justifyContent="center" my={2}>
					<Button variant="contained" onClick={()=>router.push("/parking/book")} color="primary">
						Done
					</Button>
				</Box>
			</Box>

		</>
	);
}

export default PaymentResonse;