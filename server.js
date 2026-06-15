const http = require("http");
const url = require("url");

var users = [];
var messages = [];

function sendJson(res, obj) {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.end(JSON.stringify(obj));
}

const server = http.createServer(function(req, res) {

    var parsed = url.parse(req.url, true);
    var path = parsed.pathname;

    if (path === "/join") {

        var name = parsed.query.name;

        if (name) {

            if (users.indexOf(name) === -1) {

                users.push(name);

                messages.push({
                    sender: "SERVER",
                    text: name + " joined chat"
                });
            }
        }

        res.end("OK");
        return;
    }

    if (path === "/send") {

        var name = parsed.query.name;
        var text = parsed.query.text;

        if (name && text) {

            messages.push({
                sender: name,
                text: text
            });
        }

        res.end("SENT");
        return;
    }

    if (path === "/messages") {

        sendJson(res, messages);
        return;
    }

    res.end("Chat Server Running");
});

server.listen(3000, function() {
    console.log("Server running on port 3000");
});