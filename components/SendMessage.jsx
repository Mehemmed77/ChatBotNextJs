import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { v4 as id } from 'uuid';
import { useContext, useState } from 'react';
import Context from './Context';
import getCurrentTime24Hour from './getCurrentTime24Hour';

export default function SendMessage() {
    const [message, setMessage] = useState("");
    const {addMessage} = useContext(Context);

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleClick = () => {
        if(message === "") return;
        setMessage("");
        addMessage({id: id(), message: message, sentBy: "user", time: getCurrentTime24Hour()});
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