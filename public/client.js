let userName = prompt('Masukkan namamu');
let room = prompt('Masukkan nama room');
let ID = '';
var socket = io();
var roomname = document.getElementById('room');
var userlist = document.getElementById('user');
var roomlist = document.getElementById('room-a');
roomname.textContent += room;
socket.emit('join room', { 
  username: userName, 
  roomName: room 
});
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

socket.on('send data', (data) => {
  ID = data.id;
});

socket.on('all rooms', (data) => {
  while (roomlist.firstChild) {
    roomlist.removeChild(roomlist.lastChild);
  }
  for (let i = 0; i < data.length; i++) {
    var item = document.createElement('li');
    item.textContent = data[i];
    roomlist.appendChild(item);
  }
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('in room', (data) => {
  while (userlist.firstChild) {
    userlist.removeChild(userlist.lastChild);
  }
  for (let i = 0; i < data.length; i++) {
    var item = document.createElement('li');
    item.textContent = data[i].username;
    userlist.appendChild(item);
  }
  window.scrollTo(0, document.body.scrollHeight);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', {
      value: input.value,
      user: userName,
      room: room,
    });
    input.value = '';
  }
});

socket.on('chat message', function (msg) {
  var item = document.createElement('li');
  item.innerHTML =
    '<strong>' + msg.msg.user + '</strong>' + ' : ' + msg.msg.value;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

let x;
let y;

let mouseDown = false;

window.onmousedown = (e) => {
  ctx.moveTo(x, y);
  mouseDown = true;
};
window.onmouseup = (e) => {
  mouseDown = false;
};

socket.on
('ondraw', function (data){
  ctx.lineTo (data.x, data.y);
  ctx.stroke();  
});

window.onmousemove = (e) => {
  x = e.clientX;
  y = e.clientY;

  if (mouseDown){
      // console.log({x,y});
      socket.emit("draw", { 
        x, 
        y,
        room
      });
      ctx.lineTo (x,y);
      ctx.stroke();
  }
};