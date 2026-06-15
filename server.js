const http = require("http");
const url = require("url");

const PORT = 3000;

var messages = [];

http.createServer(function(req, res) {

    var parsed = url.parse(req.url, true);

    if (parsed.pathname === "/join") {

        var name = parsed.query.name;

        console.log(name + " joined");

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("Connection Established");

    }

    else if (parsed.pathname === "/send") {

        var name = parsed.query.name;
        var message = parsed.query.message;

        if (name != null && message != null) {

            messages.push({
                sender: name,
                message: message,
                time: SystemTime()
            });

            console.log(name + ": " + message);
        }

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("OK");

    }

    else if (parsed.pathname === "/messages") {

        var after = parseInt(parsed.query.after || "0");

        var output = "";

        for (var i = 0; i < messages.length; i++) {

            if (messages[i].time > after) {

                output +=
                    messages[i].sender + "|" +
                    messages[i].message + "|" +
                    messages[i].time +
                    "\n";
            }
        }

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end(output);
    }

    else {

        res.writeHead(404);
        res.end("Not Found");
    }

}).listen(PORT, function() {

    console.log("Chat Server Running On Port " + PORT);

});

function SystemTime() {
    return new Date().getTime();
}