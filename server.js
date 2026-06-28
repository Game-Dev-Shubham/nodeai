const http = require("http");

let gyro = {
    x: 0,
    y: 0,
    z: 0
};

const server = http.createServer((req, res) => {

    // Home Route
    if (req.method === "GET" && req.url === "/") {

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("Node.js Gyroscope Server Running");

    }

    // Get Gyroscope Data
    else if (req.method === "GET" && req.url === "/gyro") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(gyro));

    }

    // Update Gyroscope Data
    else if (req.method === "POST" && req.url === "/update") {

        let body = "";

        req.on("data", function(chunk) {
            body += chunk;
        });

        req.on("end", function() {

            try {

                const data = JSON.parse(body);

                gyro.x = data.x;
                gyro.y = data.y;
                gyro.z = data.z;

                console.clear();
                console.log("Current Gyroscope Data:");
                console.log(gyro);

                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });

                res.end("OK");

            } catch (e) {

                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });

                res.end("Invalid JSON");

            }

        });

    }

    // Unknown Route
    else {

        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 Not Found");

    }

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, function() {

    console.log("Server Running on Port " + PORT);

});