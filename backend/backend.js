const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(express.json());

app.post("/chat", async (req, res) => {
  const message = req.body.message;

  try {
    // Call OpenAI API to get AI response
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-002",
        prompt: message,
        max_tokens: 150,
        temperature: 0.7,
        stop: ["\n"],
      },
      {
        headers: {
          Authorization: "Bearer YOUR_OPENAI_API_KEY",
        },
      }
    );

    const aiResponse = response.data.choices[0].text.trim();

    res.json({ message: aiResponse });
  } catch (error) {
    console.error("Error getting AI response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
