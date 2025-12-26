import React from "react";
import { useState } from "react"
import { TextField, Typography } from "@mui/material"
import { Button } from "@mui/joy";
import ErrorMessage from "../components/UI/ErrorMessage"
import { postLogin } from "../api/service-authentication"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toast } from "../utils/alerts";
import Header from "../components/Header";


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])[A-Za-z]{3,}$/;






const LoginPage = () => {

    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!userEmail.match(emailRegex)) {
            setError("Email is not valid");
            return;
        }
        if (!password.match(passwordRegex)) {
            setError("Password is not valid");
            return;
        }
        console.log("Submitting:", { userEmail, password });
        try {
            const response = await postLogin(userEmail, password);
            auth.Login(response);
            navigate("/dashboard", { replace: true });

        } catch (error) {
            toast.error("Login failed. Please try again.");
        }

    };


    return <>
        <Header />
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <TextField value={userEmail} type="email" id="userEmail" label="userEmail:" variant="outlined" margin="normal" fullWidth onChange={(e) => setUserEmail(e.target.value)} />
            <TextField value={password} type="password" id="password" label="Password:" variant="outlined" margin="normal" fullWidth onChange={(e) => setPassword(e.target.value)} />
            {error && <ErrorMessage message={error} />}
            <Button type="submit">Login</Button>
        </form>
        <Typography

            sx={{ mt: 2, cursor: "pointer", color: "primary.main" }}
            onClick={() => navigate("/register")}
        >
            Don't have an account? Register
        </Typography>



    </>
}

export default LoginPage;

