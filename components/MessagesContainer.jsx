import Context from "./Context";
import FormHeader from "./Header";
import Message from "./Message";
import { useContext, useRef } from "react";
import { useEffect } from "react";

export default function MessagesContainer() {
    const {messages} = useContext(Context);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    return <>
        <FormHeader />
        <div className="chat-body" ref={scrollRef}>
            {messages.map((e) => <Message key={e.id} mD={e} />)}
        </div>
    </>
};