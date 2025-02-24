import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { v4 as id } from 'uuid';
import { useContext, useState } from 'react';
import Context from './Context';
import getCurrentTime24Hour from './getCurrentTime24Hour';
import CallAPI from './callAPI';

    export default function SendMessage() {
        const [message, setMessage] = useState("");
        const {addMessage, setMessages} = useContext(Context);

        const handleChange = (e) => {
            setMessage(e.target.value);
        }

        const handleClick = async () => {
            if(message === "") return;
            setMessage("");
            addMessage({id: id(), message: message, sentBy: "user", time: getCurrentTime24Hour()});

            const botLoadingMessage = { id: id(), message: "Response loading...", sentBy: "bot", time: getCurrentTime24Hour() };
            addMessage(botLoadingMessage);

            const botResponse = await CallAPI(message);
    
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === botLoadingMessage.id ? { ...msg, message: botResponse } : msg
                )
            );
        }

        return <>
            <div id="sendMessage">
            <div className="chat-footer">
                <div><TextField value={message} onChange={handleChange} onKeyDown={(e) => {if (e.key === "Enter") handleClick();}}
                    placeholder='Your Message' sx={{width:"100%"}}/></div>
                <Button  variant='contained' startIcon={<SendIcon />} onClick={handleClick}> Send </Button>
            </div>
            </div>
        </>
    };