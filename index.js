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

const getUserList = () => {
  let userList = "";
  for (const user of users) {
    userList += user.username + "\n";
  }
  return userList;
};
const getUserName = (socketId) => {
  return users.find((user) => user.id === socketId)?.username;
};
const deleteUserById = (socketId) => {
  try {
    const index = users.findIndex((user) => user.id === socketId);
    console.log("deleting user", users[index]);
    users.splice(index, 1);
  } catch (error) {
    console.warn("deleting user failed", error);
  }
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join", (username) => {
    users.push({ username: username, id: socket.id });
    console.log("users connected:", users);
    socket.emit("response", "Joined with username " + username);
    socket.emit(
      "chat message",
      `Tervetuloa ${username}! läsnäolijat: ${getUserList()}`
    );
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    deleteUserById(socket.id);
  });

  socket.on("chat message", (msg) => {
    console.log("message by: " + socket.id, msg);
    if (msg === "!users") {
      socket.emit("chat message", `Users online: ${getUserList()}`);
    } else {
      io.emit("chat message", `${getUserName(socket.id)}: ${msg}`);
    }
  });
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});
