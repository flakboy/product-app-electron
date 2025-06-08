import { useEffect, useState } from "react";

export function useOnlineStatus() {
    const [online, setOnline] = useState(window.navigator.onLine);
    useEffect(() => {
        window.addEventListener("online", () => {
            setOnline(true);
        });
        window.addEventListener("offline", () => {
            console.log("OFFLINE!");
            setOnline(false);
        });
    }, []);

    return online;
}
