const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server Working");
});

app.get("/chat", (req, res) => {
    res.send("Use POST request");
});

const API_KEY = "AIzaSyDoOAHtv3b9ZpTpqY3LtNPbbdX_A5kEY1g";

app.post("/chat", async (req, res) => {

    try {

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": API_KEY
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: req.body.message
                        }]
                    }]
                })
            }
        );

        const data = await response.json();

        let reply = "No response";

        if (
            data.candidates &&
            data.candidates[0] &&
            data.candidates[0].content &&
            data.candidates[0].content.parts
        ) {
            reply =
                data.candidates[0]
                    .content.parts[0]
                    .text;
        }

        res.json({
            reply: reply
        });

    } catch (e) {

        res.status(500).json({
            error: e.toString()
        });

    }

});

app.listen(process.env.PORT || 3000);