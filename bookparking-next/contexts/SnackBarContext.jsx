import React, { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import Slide from "@mui/material/Slide";


export const SnackContext = React.createContext();


export default function SnackBarContext({ children }) {

	// Circle Queue
	const [queue, setqueue] = useState([])
	const [start, setstart] = useState({})
	const [end, setend] = useState({})
	const [points, setPoints] = useState({ start: start, end: end })
	const [count, setcount] = useState(0)


	useEffect(() => {

		setPoints(p => { p.end = end; return p })
		if (end?.index !== undefined) {
			setqueue(q => [...q, end])
		} else {
			setqueue([])
		}

	}, [end])


	useEffect(() => {

		setPoints(p => { p.start = start; return p })
		if (start?.index) {
			setqueue(q => q.slice(1))
		}

	}, [start])


	// Add Snack Slide Function
	const addSnackSlide = (type, message) => {

		if (queue.length < 10) {
			if (queue.length === 0) {
				var obj = {
					index: 0,
					data: { type: type, message: message },
					next: null
				}
				setstart(obj)
				setend(obj)
				setcount(c => (c + 1))

			} else {
				console.log(end.index)
				var obj = {
					index: (end.index + 1),
					data: { type: type, message: message },
					next: null
				}

				setend(o => { o.next = obj; return o })
				setend(obj)
				setcount(c => (c + 1))

			}

			// After sometimet execute this function
			setTimeout(() => {
				var start = points.start
				var end = points.end

				if (start.next === null) {
					setstart({})
					setend({})
				} else {
					setstart(start.next)
				}

			}, 5000)
		}
	}

	return (
		<>
			<SnackContext.Provider value={{ function: addSnackSlide }}>

				{children}

			</SnackContext.Provider>

			{
				queue.map((q, index) => {

					return (
						<AlertSnackBar key={q.index} count={index} data={q.data} />
					)
				})
			}


		</>
	);
}


const AlertSnackBar = ({ count, data }) => {

	const [open, setopen] = useState(true)
	const { type: type, message: message } = data;

	const handleClose = (e, v) => {
		if (v === 'timeout') {
			setopen(false)
		} else if (v === 'close') {
			setopen(false)
		}
	}

	return (
		<Snackbar bottom={500}
			sx={{ bottom: ((count * 60) + 10) + 'px!important', flexDirection: 'column' }}
			open={open}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			TransitionComponent={TransitionLeft}
			// autoHideDuration={3000}
			onClose={(e, v) => handleClose(e, v)}
		>
			<Alert color={type} variant="filled" onClose={() => { handleClose(null, 'close') }}>{message}</Alert>
		</Snackbar>
	);
}

function TransitionLeft(props) {
	return <Slide {...props} direction="left" />;
}
