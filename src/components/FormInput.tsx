import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type FormTextFieldProps = {
    name: string;
    label: string;
    type?: string;
    rules?: any;
}
const FormTextField = ({ name, label, type = "text", rules }: FormTextFieldProps) => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={
                ({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label={label}
                        type={type}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}>

                    </TextField>
                )}
        />
    )
}
export default FormTextField