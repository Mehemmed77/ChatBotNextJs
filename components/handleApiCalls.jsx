import axios from 'axios';

export default async function handleApi(message) {
    let botResponse;
    try {
        const res = await axios.post('/api/chat', { prompt: message });
        botResponse = res.data.response ? res.data.response : "Unexpected response";
    }
    
    catch {
        botResponse = "Error fetching response."
    }
    return botResponse;
}