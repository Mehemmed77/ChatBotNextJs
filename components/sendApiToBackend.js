import axios from "axios";

export default async function SendToBackend(req) {
    try {
        const res = await axios.post("http://127.0.0.1:8000/backend/recieve_msg", req, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(res.data);
        return res.data;  
    } 
    catch (error) {
        console.error(error);
    }
}
