"use strict";

const exp = require("constants");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
//testi:
const path = require("path");

//og:
app.use(express.static("public"));

const users = [];

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join", (nickname) => {
    socket.nickname = nickname;
    console.log("nick: ", nickname);

    const user = {
      nickname: nickname,
      id: socket.id,
    };

    users.push(user);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });

  socket.on("chat message", (msg) => {
    console.log("message: ", msg);
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});
