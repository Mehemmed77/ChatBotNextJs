import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import {logout} from "../api/auth"


const LoginPage = () => {
    const router = useRouter();

    const handleClick = async (e) => {
        e.preventDefault();
        const res = await logout();
        console.log(res);   
        if (res.status == 200) {
            router.push("/")
        }
    };

  return (
    <div className="auth-container">
        <Container component="main" maxWidth="xs">
            <Typography sx={{ "textAlign": "center" }}>Are you sure you want to logout?</Typography>
            <div style={{ display:"flex", gap: 15, marginBlockStart:20 }}>
                <Button variant="contained"><Link href="/" sx={{ color: "white" }}>No, go back to home page</Link></Button>
                <Button variant="contained" onClick={handleClick}>Yes, logout</Button>
            </div>
      </Container>
    </div>
  );
};

export default LoginPage;