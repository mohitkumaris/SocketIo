const express = require("express");
const app = express();

// socket
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// socket router
const SocketRouter = require("./routes/SocketRouter")(io);

// if i go to  http://localhost:3001/api/v1/forecast
// this route then it will show data from Socket router file

app.use("/api/v1", SocketRouter);

app.set("view engine", "ejs");
app.set(express.urlencoded({ extended: false }));
app.set(express.json());

// Landing page for UI NOTE: RUNNING FRONT END ON SAME BACKEND SERVER PORT
const port = 3001;

app.get("/", (req, res) => {
  res.render("index");
});

// socket connection

io.on("connection", (socket) => {
  // front end application is connected to backend socket id
  console.log(socket.id);
});

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
