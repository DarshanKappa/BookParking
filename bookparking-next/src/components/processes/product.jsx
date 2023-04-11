import { Box, Typography } from "@mui/material";
import Image from "next/image";




function Product({ img="", title="", description="" }) {
	return ( 
		<Box sx={{cursor: "pointer", height: "50%", width: 200, mr: 5, bgcolor: "white", boxShadow: "6px 8px 20px 1px #d7d7d7", display: "flex", placeItems: "center" }}>
			{/* <Box sx={{width: "100%", height: "40%", overflow: "hidden", position: "relative", borderRadius: "inherit", borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
				<Image src={img} width={300} height={100} alt="image" style={{height: "auto", position: "absolute", left: 0, top: "-50%"}} />
			</Box> */}
			<Box sx={{py: 1, px: 2, width: "100%"}}>
				<Typography sx={{textAlign: "left"}} variant="h6" color="#464646">{title}</Typography>
				{/* <Typography sx={{textAlign: "left", color: "#6e6e6e"}} variant="body2" color="initial">{description}</Typography> */}
			</Box>
		</Box>
  	);
}

export default Product;