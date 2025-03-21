import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatsContainer from './ChatsContainer';
import Profile from './Profile';
import { useEffect } from 'react';
import { useContext } from 'react';
import { userDataContext } from './Context';
import { getCurrentUser } from '../pages/api/auth';

export default function Header () {
    const {setUserHasLoggedIn} = useContext(userDataContext);

    useEffect(() => {
        async function curr_user() {
            const user = await getCurrentUser().then();
            setUserHasLoggedIn(user);
        }
        curr_user();
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