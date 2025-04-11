import { useEffect } from "react";

export default function useAutoScroll(ref, messages) {
    useEffect(() => {
        if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    }, [messages.length])
}