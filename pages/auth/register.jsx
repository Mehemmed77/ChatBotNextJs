import React, { useState } from "react";
import { Container, Typography, TextField, Button, Link, Paper, Box} from "@mui/material";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
            <Paper className="register-container"style={{ padding: "20px"}}>
                <Typography variant="h4" align="center">
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                
                    <TextField variant="outlined" margin="normal" required fullWidth type="email" id="email" label="Email Address" name="email" autoComplete="email" autoFocus 
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