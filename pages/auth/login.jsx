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

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-container">
        <Container component="main" maxWidth="xs">
            <Paper className="login-container" style={{ padding: "30px"}}>
                <Typography variant="h4" align="center">
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField variant="outlined" margin="normal" required fullWidth type="email" id="email" label="Email Address" name="email" autoComplete="email" autoFocus 
                            value={formData.email} onChange={handleChange}/>
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