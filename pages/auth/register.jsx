import React, { useState } from "react";
import { Container, Typography, TextField, Button, Link, Paper, Box} from "@mui/material";
import { register } from "../api/auth";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await register(formData);
    console.log(res);
  };

  return (
    <div className="auth-container">
        <Container component="main" maxWidth="xs">
            <Paper className="register-container"style={{ padding: "20px"}}>
                <Typography variant="h4" align="center">
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                
                    <TextField variant="outlined" margin="normal" required fullWidth type="text" id="username" label="Enter your username" name="username" autoFocus 
                    value={formData.email} onChange={handleChange}/>
                    
                    <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" 
                    value={formData.password} onChange={handleChange}/>
                    
                    <TextField variant="outlined" margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" 
                    value={formData.confirmPassword} onChange={handleChange}/>

                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: "20px" }}>
                        Register
                    </Button>

                    <Box sx={{marginTop: "20px",}}>
                        <Link href="/login" variant="body2">
                        Already have an account?
                        </Link>
                    </Box>
                </form>
            </Paper>
        </Container>
    </div>
  );
};

export default RegisterPage;