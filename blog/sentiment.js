import axios from "axios";

export async function getSentiment(postDescription) {
  const prompt = `
Analyze the sentiment of the following blog post. Respond with just one word: Positive, Negative, or Neutral.
Blog post:
${postDescription}
`;

  try {
    const response = await axios({
      method: "POST",
      url: "https://open-ai21.p.rapidapi.com/conversationllama",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "open-ai21.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Use .env for the API key
      },
      data: {
        messages: [{ role: "user", content: prompt }],
        web_access: false,
      },
    });

    // Ensure the response structure matches your expectations
    const sentiment = response.data.result?.trim();
    if (["Positive", "Negative", "Neutral"].includes(sentiment)) {
      return { success: true, sentiment };
    } else {
      throw new Error("Unexpected sentiment response");
    }
  } catch (error) {
    console.log("Error in evaluating sentiment: ", error.message);
    return { success: false, message: error.message };
  }
}