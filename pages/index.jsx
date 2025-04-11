import Link from 'next/link';
import { useRouter } from 'next/router';

export default function home() {
    const router = useRouter();

    
    const handleClick = () => {
        const link = `/chats/${crypto.randomUUID()}`;
        router.push(link);
    }

    return <>
        <div className="home-root">
            <div className="home-container">
                <h1>Welcome to ChatBot</h1>
                <p>What would you like to do?</p>
                <div className="home-button-container">
                    <button className="home-button" onClick={handleClick}> Create new chat </button>
                    {/* <button className="home-button">See Previous Chats</button> */}
                </div>
            </div>
        </div>
    </>
}