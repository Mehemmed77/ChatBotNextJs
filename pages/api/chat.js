import axios from 'axios';

////7728638362:AAFWINR1xPGwa5DBJ46a29KUCiSyewbttfE

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const prompt = req.body.message;
            console.log(prompt);

            const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'deepseek-r1:7b',
            prompt: prompt,
            stream: false
            });

            res.status(200).json({ response: response.data.response });
        }

        catch (error) {
            res.status(500).json({ error: error });
        }
    }
    else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}