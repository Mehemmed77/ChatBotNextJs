export default async function checkForUser() {
    try {
        const response = await fetch("http://127.0.0.1:8000/auth/is-authenticated", {
            method: "GET",
            credentials: "include", // Ensures cookies are sent with the request
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.log("Failed to check authentication");
        }

        const data = await response.json();
        return data.is_authenticated; // Returns true or false
    } catch (error) {
        console.error("Error checking authentication:", error);
        return false;
    }
}