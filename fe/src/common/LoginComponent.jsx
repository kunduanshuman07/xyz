import { Alert, Backdrop, Box, Button, CircularProgress, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { buttons, tabs, text } from '../theme';
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";
import { useAuth } from '../context/AuthProvider';

const LoginComponent = () => {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState('');
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const handleLogin = async () => {
        setloading(true);
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            if (response?.status === 200) {
                localStorage.setItem("User", JSON.stringify(response?.data?.user));
                setAuth(true);
                navigate('/');
            }
            else {
                seterror(response?.data?.errormsg);
            }
        } catch (error) {
            seterror(error.message);
        }
        finally {
            setloading(false);
        }
    }
    return (
        <Box width='100vw' height='100vh' bgcolor='#F8F9FD' display='flex'>
            <Box width={'40%'} height={'400px'} display={'flex'} flexDirection={'column'} bgcolor={'#FFFFFF'} margin="auto 0px auto auto">
                <Typography sx={{ margin: "auto auto 10px auto", fontSize: "24px", fontFamily: "Montserrat" }}>Login</Typography>
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder='Email'
                    style={{ background: '#F2F2F2', border: "none", lineHeight: "30px", width: "200px", fontSize: "12px", padding: "5px 20px", borderRadius: "8px", color: text.primary, margin: "10px auto 10px auto", fontFamily: "Montserrat" }}
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder='Password'
                    style={{ background: '#F2F2F2', border: "none", lineHeight: "30px", width: "200px", fontSize: "12px", padding: "5px 20px", borderRadius: "8px", color: text.primary, margin: "10px auto 10px auto", fontFamily: "Montserrat" }}
                />
                <Button variant='contained' sx={{ textTransform: "none", margin: "10px auto auto auto", borderRadius: "8px", bgcolor: buttons.background, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }} startIcon={<LoginIcon />} onClick={handleLogin}>Login</Button>
            </Box>
            <Box width={'40%'} height={'400px'} display={'flex'} flexDirection={'column'} bgcolor={tabs.background} margin="auto auto auto 0px">
                <Box
                    component="img"
                    src="/images/Logo.svg"
                    alt="logo"
                    width={40}
                    height={40}
                    sx={{
                        display: { sm: "block", cursor: "pointer" },
                        margin: "auto auto 10px auto"
                    }}
                />
                <Typography sx={{ fontSize: "30px", color: "white", fontFamily: "Montserrat", margin: "0px auto 10px auto" }}>
                    <span style={{ color: text.secondary, fontSize: "20px" }}>Welcome to</span> xyz !
                </Typography>
                <Typography sx={{ fontSize: "36px", color: "white", fontFamily: "Montserrat", margin: "0px auto 10px auto" }}>
                    <span style={{ color: "#F2F2F2", fontWeight: "bold" }}>X</span>plore <span style={{ color: "#F2F2F2", fontWeight: "bold" }}>Y</span>our <span style={{ color: "#F2F2F2", fontWeight: "bold" }}>Z</span>one
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "gray", fontFamily: "Montserrat", margin: "0px auto auto auto" }}>
                    Start by Login to your account!
                </Typography>
            </Box>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={error !== ''} autoHideDuration={6000} onClose={() => seterror('')}>
                <Alert
                    onClose={() => seterror('')}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default LoginComponent