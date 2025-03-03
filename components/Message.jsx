import { marked } from 'marked';
import { useEffect, useRef, useState } from 'react';

export default function Message ({mD}) {
    const ref = useRef(null);

    useEffect(() => {
        ref.current.innerHTML = marked(mD.message);
    }, [mD.message])

    return <>
            <div className={`message senderIs${mD.sentBy}`}>
                <div className={`${mD.sentBy}-message`}>
                    <div className="info-container">
                        <b>{mD.sentBy.toUpperCase()}</b>
                        <span>{mD.time}</span>
                    </div>
                    <div className="message-body">
                        <article className='article' ref={ref}></article>
                    </div>
                </div>
            </div>
    </>
};