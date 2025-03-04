import { useEffect } from "react";

export default function useAutoScroll(ref, dependencies) {
    useEffect(() => {
        if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    }, dependencies)
}