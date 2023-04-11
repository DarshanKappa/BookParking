import { Box, Stack, Typography, Button } from "@mui/material";
import styles from "@/styles/Book.module.css";


function SlotBox({ data, selectHandle, timeLength, selectedSlots, selectedObj, year, month, date }) {
	return (
		<>
			{
				data.map((r, index) =>
				(
					(data.length - 1 > index) ?
						<Stack key={index} className={styles.row} flexDirection="row" sx={{ width: "100%", height: (100 / data.length) + "%" }}>
							{
								r.slots.slice(0, timeLength).map(s => (
									<SlotComp selectedObj={selectedObj} selectedSlots={selectedSlots} slot_no={r.id} key={s.time_slot + "-" + r.id} s={s} timeLength={timeLength} selectHandle={selectHandle} year={year} month={month} date={date} />
								))
							}
						</Stack>
						:
						<Stack key={index} className={styles.row} flexDirection="row" sx={{ width: "100%", height: (100 / data.length) + "%", borderBottom: "1px solid" }}>
							{
								r.slots.slice(0, timeLength).map(s => (
									<SlotComp selectedObj={selectedObj} slot_no={r.id} key={s.time_slot + "-" + r.id} selectedSlots={selectedSlots} s={s} timeLength={timeLength} selectHandle={selectHandle} />
								))
							}
						</Stack>
				)
				)
			}

		</>
	);
}

export default SlotBox;


const SlotComp = ({ s, slot_no, selectHandle, timeLength, selectedSlots, selectedObj, year, month, date }) => {
	s["slot_no"] = slot_no
	return (
		<Box className={styles.book_slot}
			sx={{
				width: (100 / (timeLength + 1)) + "%",
				borderRight: "1px solid white",
				borderRight: "1px dashed #cfcfcf",
				justifyContent: "center",
				display: "flex",
			}}
			onClick={s.free ? () => selectHandle(`${year}-${month}-${date}T${s.time_slot}S${slot_no}`, s) : undefined}
		>
			<Box bgcolor={s.free ? selectedObj?.[`${year}-${month}-${date}T${s.time_slot}S${slot_no}`] ? "lightseagreen" : "darkseagreen" : "beige"} sx={{ width: "90%", height: "100%", borderRadius: 1 }}></Box>
		</Box>
	);
}
