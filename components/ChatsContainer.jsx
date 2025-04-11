import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Chat from './Chat';
import Tooltip from '@mui/material/Tooltip';
import AddCommentIcon from '@mui/icons-material/AddComment';

export default function ChatsContainer () {
    const [open, setOpen] = useState(false);

    return <>
        <div className="chat-container">
            <MenuIcon onClick={() => setOpen(true)} sx={{ cursor: "pointer", fontSize:"30px" }} />
            <Drawer open={open} onClose={() => setOpen(false)}>
                <div className='add-chat-container'>
                    <p id='chats'>Chats</p>
                    <Tooltip title="Add Chat">
                        <AddCommentIcon id="add-chat" />
                    </Tooltip>
                </div>
                <Stack className="stack" spacing={2}>
                </Stack>
            </Drawer>
        </div>
    </>
}