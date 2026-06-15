const http = require("http");
const url = require("url");

const PORT = 3000;

var messages = [];

function sendJson(res, obj) {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });
    res.end(JSON.stringify(obj));
}

const server = http.createServer(function(req, res) {

    const parsed = url.parse(req.url, true);

    if (parsed.pathname === "/join") {

        const name = parsed.query.name;

        sendJson(res, {
            success: true,
            message: "Connection Established"
        });

    } else if (parsed.pathname === "/send") {

        const name = parsed.query.name;
        const text = parsed.query.message;

        if (name && text) {

            messages.push({
                sender: name,
                message: text,
                time: Date.now()
            });

            sendJson(res, {
                success: true
            });

        } else {

            sendJson(res, {
                success: false
            });

        }

    } else if (parsed.pathname === "/messages") {

        const after = parseInt(parsed.query.after || "0");

        var result = [];

        for (var i = 0; i < messages.length; i++) {

            if (messages[i].time > after) {
                result.push(messages[i]);
            }

        }

        sendJson(res, result);

    } else {

        sendJson(res, {
            error: "Not Found"
        });

    }

});

server.listen(PORT, function() {
    console.log("Chat Server Running On Port " + PORT);
});