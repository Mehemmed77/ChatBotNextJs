import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatsContainer from './ChatsContainer';
import Profile from './Profile';
import { useEffect } from 'react';
import checkForUser from './checkForUser';
import { useContext } from 'react';
import { userDataContext } from './Context';

export default function Header () {
    const {setUserHasLoggedIn} = useContext(userDataContext);

    useEffect(() => {
        setUserHasLoggedIn(checkForUser());
    }, [])

    return <>
        <div className="chat-header">
            <ChatsContainer />
            <div className='title-container'>
                <ChatBubbleOutlineIcon /> ChatBot
            </div>
            <Profile />
        </div>
    </>
}