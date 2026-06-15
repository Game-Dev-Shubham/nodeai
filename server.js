const http = require("http");
const { URL } = require("url");

const users = [];
const messages = [];

const server = http.createServer(function(req, res) {

    const url = new URL(req.url, "http://localhost:3000");
    const path = url.pathname;

    console.log("Request:", path);

    if (path === "/join") {

        const name = url.searchParams.get("name");

        if (name) {

            if (users.indexOf(name) === -1) {
                users.push(name);
            }

            messages.push({
                sender: "SERVER",
                text: name + " joined chat"
            });

            console.log("User Joined:", name);
            console.log(messages);

            res.writeHead(200, {
                "Content-Type": "text/plain"
            });

            res.end("JOINED");
            return;
        }

        res.end("Name missing");
        return;
    }

    if (path === "/send") {

        const name = url.searchParams.get("name");
        const text = url.searchParams.get("text");

        if (name && text) {

            messages.push({
                sender: name,
                text: text
            });

            console.log("Message:", name, ":", text);
            console.log(messages);

            res.writeHead(200, {
                "Content-Type": "text/plain"
            });

            res.end("SENT");
            return;
        }

        res.end("Missing parameters");
        return;
    }

    if (path === "/messages") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(messages));
        return;
    }

    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end(
        "Chat Server Running\n\n" +
        "/join?name=YourName\n" +
        "/send?name=YourName&text=Hello\n" +
        "/messages"
    );

});

server.listen(3000, function() {
    console.log("Server Started On Port 3000");
});