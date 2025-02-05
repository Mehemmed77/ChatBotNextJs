import PersonIcon from '@mui/icons-material/Person';

export default function Message ({mD}) {
    // mD stands for mD

    const avatars = {
        "bot": "🤖",
        "user": <PersonIcon />
    };

    return <>
            <div className={`message senderIs${mD.sentBy}`}>
                <div className="avatar">{avatars[mD.sentBy]}</div>
                <div className={`${mD.sentBy}-message`}>
                    <div className="info-container">
                        <b>{mD.sentBy.toUpperCase()}</b>
                        <span>{mD.time}</span>
                    </div>
                    <div className="message-body">
                        {mD.message}
                    </div>
                </div>
            </div>
    </>
};