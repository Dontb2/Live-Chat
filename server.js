// WebSocket

const WebSocket = require("ws");

const server = new WebSocket.Server({
  host: "localhost",
  port: 2001,
});

console.log("Server is Ready");

server.on("connection", (socket) => {
  client = socket;

  console.log("A user is connected");

  socket.on("message", (message) => {
    console.log("Client:", message.toString());
  });
});

process.stdin.on("data", (data) => {
  client.send(data.toString().trim());
});
