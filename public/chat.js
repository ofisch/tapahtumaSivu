"use strict";

// Server URL below must point to your server, localhost works for local development/testing
const socket = io("http://localhost:3000");
//const socket = io("http://127.0.0.1:5500");

const messages = document.getElementById("messages");
const msgForm = document.getElementById("input-form");
const msgInput = msgForm.getElementsByTagName("input")[0];
const joinForm = document.getElementById("join-form");
const usernameInput = joinForm.getElementsByTagName("input")[0];
msgForm.style.display = "none";

let nickname;

Date.prototype.timeNow = function () {
  return (
    (this.getHours() < 10 ? "0" : "") +
    this.getHours() +
    ":" +
    (this.getMinutes() < 10 ? "0" : "") +
    this.getMinutes()
  );
};

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

msgForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inp = document.getElementById("m");
  if (!isEmptyOrSpaces(inp.value)) {
    console.log("testi");
    socket.emit("chat message", inp.value);
    inp.value = "";
  }
});

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (usernameInput.value) {
    socket.emit("join", usernameInput.value);
    nickname = usernameInput.value;
    usernameInput.value = "";
    document.getElementById("login").style.display = "none";
    msgForm.style.display = "block";
    msgInput.focus();
  }
});

socket.on("chat message", (msg) => {
  const date = new Date();
  const item = document.createElement("li");
  item.innerText = msg;
  item.classList.add("hover:bg-tangerine");
  item.classList.add("w-fit");

  document.getElementById("messages").appendChild(item);
});
