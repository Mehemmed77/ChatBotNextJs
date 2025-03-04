import Context from "./Context";
import FormHeader from "./Header";
import Message from "./Message";
import { useContext, useRef } from "react";
import useAutoScroll from "./useAutoScroll";
import BotActions from "./BotActions";

export default function MessagesContainer() {
    const {messages} = useContext(Context);
    const scrollRef = useRef(null);
    useAutoScroll(scrollRef, messages);

    return <>
        <FormHeader />
        <div className="chat-body" ref={scrollRef}>
            {messages.map((e) => <Message key={e.id} mD={e} />)}
        </div>
    </>
};