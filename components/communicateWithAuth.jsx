import axios from "axios";

const CallLogin = async (formData) => {
    try {
        const res = await axios.post("http://127.0.0.1:8000/auth/token", new URLSearchParams( {
            username: formData.username,
            password: formData.password
        }).toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        return res.data;
    } 
    catch(e) {
        return e?.response?.data?.detail;
    }
}

const CallRegister = async () => {

}


export {CallLogin, CallRegister};