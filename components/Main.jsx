import MessagesContainer from "./MessagesContainer";
import SendMessage from "./SendMessage";
import { useState } from "react";
import { useCallback } from "react";
import Context from "./Context";

export default function Main() {
    const [messages, setMessages] = useState([]);

    const addMessage = useCallback((e) => {
        setMessages((prev) => [...prev, e]);
    }, []);

    return <>
        <Context.Provider value={{messages, addMessage}}>
            <MessagesContainer />
            <SendMessage />
        </Context.Provider>
    </>
}