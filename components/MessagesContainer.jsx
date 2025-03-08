import Context from "./Context";
import Message from "./Message";
import { useContext, useRef, useEffect } from "react";
import useAutoScroll from "./useAutoScroll";

export default function MessagesContainer() {
    const {messages} = useContext(Context);
    const scrollRef = useRef(null);
    useAutoScroll(scrollRef, messages);

    return <>
        <div className="chat-body" ref={scrollRef}>
            {messages.map((e) => <Message key={e.id} mD={e} />)}
        </div>
    </>
};