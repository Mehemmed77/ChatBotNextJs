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

import { CallLogin } from "../../components/communicateWithAuth";

const ERROR_MESSAGE = "User does not exist or could not validate";

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await CallLogin(formData);

        if (res?.access_token) {
            router.push("/");
        }

    };

  return (
    <div className="auth-container">
        <Container component="main" maxWidth="xs">
            <Paper className="login-container" style={{ padding: "30px"}}>
                <Typography variant="h4" align="center">
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField variant="outlined" margin="normal" required fullWidth type="text" id="email" label="Username" name="username" autoComplete="username" autoFocus 
                            value={formData.username} onChange={handleChange}/>
                    <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: "20px" }}>
                    Login
                    </Button>
                    <Box sx={{marginTop: "10px", }}>
                    <Link href="/register" variant="body2">
                        Don't have an account?
                    </Link>
                    </Box>
                </form>
            </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;