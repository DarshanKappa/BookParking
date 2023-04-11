import React, { useState } from "react";
import { Box, Paper, Stack, Typography, Button, IconButton } from "@mui/material";
import Input from "../../Inputs/Input";
import { useForm } from "react-hook-form";



function CustomForm({ form_type, form = [], setValue = () => { } }) {

	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const [step, setStep] = useState(0)

	const onSubmit = (v) => {
		console.log(v)
		if (form.length - 1 === step) {
			var r_step = setValue(v, step + 1, form.length)
		} else {
			var r_step = setValue(v, step + 1, form.length)
			if(r_step!==step)
				setStep(step + 1)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box className="border-fileds-box">
				{
					form[step]?.map((f, index) => (<Input sx={{ maxWidth: 500 }}
						key={f.field_name}
						type={f.type}
						icon={f.icon}
						label={f.label}
						field_name={f.field_name}
						register={register} required={f.required} />
					))

				}
			</Box>
			<Box sx={{ mt: 7, display: "flex", flexDirection: "column", justifyContent: "center", placeItems: "center" }} className="submit-signup-signin-box">
				{
					(form.length - 1 === step) ?
						<Stack width={"100%"}>
							<Button type="submit" sx={{
								borderRadius: 100, width: "100%", background: "#ff7043", "&:hover": { backgroundColor: "#ff7043" },
							}} variant="contained">{form_type === "signup" ? "Signup" : "Login"}</Button>
						</Stack>
						:
						<Stack sx={{ width: "100%", placeItems: "end" }}>
							<Button type="submit" sx={{ width: 100, backgroundColor: "#5c6bc0", "&:hover": { backgroundColor: "#5c6bc0" } }} variant="contained">Next</Button>
						</Stack>
				}
			</Box>
		</form>
	);
}

export default CustomForm;