export default async function CallAPI(message) {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": "Bearer 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",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "deepseek/deepseek-r1:free",
              "messages": [
                {
                  "role": "user",
                  "content": message
                }
              ]
            })
          });

        const data = await response.json();

        console.log(data);
        // return data.choices[0]?.message?.content || "Error: No response received";
    } catch (error) {
        console.log(error);
    }
}