
const http = require("http");
const socketManager = require("./server-socket");

function startServer(app, port = 3000){
    const server = http.Server(app);
    socketManager.init(server);
    server.listen(process.env.PORT || port, () => {
        console.log(`Server running on port: ${port}`);
    });
}

module.exports = startServer;