export default function getCurrentTime24Hour() {
    const now = new Date();
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${formattedHours}:${formattedMinutes}`;
}