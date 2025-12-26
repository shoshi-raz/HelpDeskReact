
import { Button, Stack, Typography } from "@mui/joy";
import TextField from "@mui/material/TextField";
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { postLogin, postRegister } from "../api/service-authentication";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "../utils/alerts";
import Header from "../components/Header";
type RegisterForm = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });
    const auth = useAuth();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<RegisterForm> = async (data: RegisterForm) => {
        try {
            const response = await postRegister(data.name, data.email, data.password);
            console.log("Register response:", response);
            const loginResponse = await postLogin(data.email, data.password);
            auth.Login(loginResponse);
            navigate("/dashboard", { replace: true });
        }
        catch (error: any) {
            toast.error("Register error:", error.response?.data?.message || "Registration failed");
        }
    }


    return (
        <>
        <Header/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} width={500}>
                    <h1>Register</h1>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="name"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email "
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                error={!!errors.email}
                                type="email"
                                helperText={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*[A-Za-z])[A-Za-z]{3,}$/,
                                message: "Password must be at least 3 characters and contain at least one letter"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                error={!!errors.password}
                                type="password"
                                helperText={errors.password?.message}
                            />
                        )}
                    />
                </Stack>
                <Button type="submit">Register</Button>
            </form>

            
            < Typography
                sx={{ mt: 2, cursor: "pointer", color: "primary.main" }
                }
                onClick={() => navigate("/login")}
            >
                Already have an account ? Login
            </Typography >
        </>

)}
export default RegisterPage