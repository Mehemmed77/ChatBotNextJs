import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import Chat from './Chat';

export default function ChatsContainer () {
    const [open, setOpen] = useState(false);

    return <>
        <div className="chat-container">
            <ChatIcon onClick={() => setOpen(true)} sx={{ cursor: "pointer", fontSize:"30px" }} />
            <Drawer open={open} onClose={() => setOpen(false)}>
                <Stack className="stack" spacing={2}>
                    <p id='chats'>Chats</p>
                    <Chat chatName={"Salam"} />
                    <Chat chatName={"Hello"} />
                </Stack>
            </Drawer>
        </div>
    </>
}