export default async function checkForUser() {
    const response = await fetch("http://127.0.0.1:8000/", {
        method: "GET",
        credentials: "include"
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
    } else {
        return null;
    }
}