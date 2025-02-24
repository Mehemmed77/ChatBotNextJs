import PersonIcon from '@mui/icons-material/Person';
import { marked } from 'marked';
import { useEffect, useRef } from 'react';

export default function Message ({mD}) {
    const ref = useRef(null);
    const avatars = {
        "bot": "🤖",
        "user": <PersonIcon />
    };

    useEffect((e) => {
        ref.current.innerHTML = marked(mD.message);
    }, [mD.message])

    return <>
            <div className={`message senderIs${mD.sentBy}`}>
                <div className="avatar">{avatars[mD.sentBy]}</div>
                <div className={`${mD.sentBy}-message`}>
                    <div className="info-container">
                        <b>{mD.sentBy.toUpperCase()}</b>
                        <span>{mD.time}</span>
                    </div>
                    <div className="message-body" ref={ref}>
                    </div>
                </div>
            </div>
    </>
};