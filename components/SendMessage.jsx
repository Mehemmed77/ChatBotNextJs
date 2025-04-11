import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { v4 as id } from 'uuid';
import { useContext, useState,useEffect } from 'react';
import Context from './Context';
import getCurrentTime24Hour from './getCurrentTime24Hour';
import handleApi from './handleApiCalls';
import { getCurrentUser } from '../pages/api/auth';

export default function SendMessage() {
    const [message, setMessage] = useState("");
    const {messages, addMessage, setMessages} = useContext(Context);
    const [isDisabled, setIsDisabled] = useState(false);
    
    const handleChange = (e) => setMessage(e.target.value);

    const handleClick = async () => {
        if(message.trim() === "") return;
        setMessage("");

        addMessage({id: id(), message: message, sentBy: "user", time: getCurrentTime24Hour()});

        setIsDisabled(true);
        const botLoadingMessage = { id: id(), message: "Response loading...", sentBy: "bot", time: getCurrentTime24Hour() };
        addMessage(botLoadingMessage);
        
        const botResponse = await handleApi(message);
        setMessages((prev) => prev.map(msg => msg.id === botLoadingMessage.id ? { ...msg, message: botResponse } : msg));

        setIsDisabled(false);
        
        let dummyUser = await getCurrentUser().then();
        
        if (dummyUser){
        }
    }

    return <>
        <div id="sendMessage">
        <div className="chat-footer">
                <div>
                    <textarea id='textSender' onChange={handleChange} value={message}
                        onKeyDown={(e) => {if (e.key === "Enter" && !e.shiftKey) handleClick();}}
                        placeholder="Ask anything...">
                    </textarea>
                </div>
                <Button
                    disabled={isDisabled} 
                    variant='contained' startIcon={<SendIcon />} 
                    onClick={handleClick} sx={{backgroundColor:"#303032"}} > Send </Button>
            </div>
        </div>
    </>
};