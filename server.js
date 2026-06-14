const express = require("express");

const app = express();

app.use(express.json());

// Testing only
const API_KEY = "AIzaSyDoOAHtv3b9ZpTpqY3LtNPbbdX_A5kEY1g";

app.post("/chat", async (req, res) => {

    try {

        const message = req.body.message;

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": API_KEY
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: message
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        let reply = "No response";

        if (
            data.candidates &&
            data.candidates[0] &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts[0]
        ) {
            reply =
                data.candidates[0]
                    .content.parts[0]
                    .text;
        }

        res.json({
            reply: reply
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});

const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        "Server running on port " + PORT
    );

});