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

window.addEventListener('load', ()=>{
    var context = document.querySelector("canvas").getContext("2d");
    context.canvas.width = document.documentElement.clientWidth;
    context.canvas.height = document.documentElement.clientHeight;
    context.fillStyle="#ffffff";
    context.fillRect(0,0, context.canvas.width, context.canvas.height, context.fillStyle);
    window.addEventListener('resize', () =>{
        var context = document.querySelector("canvas").getContext("2d");
        context.canvas.width = document.documentElement.clientWidth;
        context.canvas.height = document.documentElement.clientHeight;
        context.fillStyle="white";
        context.fillRect(0,0, context.canvas.width, context.canvas.height);
    });
    context.canvas.addEventListener('mousedown', () =>{
        var draw = true;
        let x;
        let y;
        context.canvas.addEventListener('mousemove', (e)=>{
            if(draw){
                x = e.clientX;
                y = e.clientY;
                context.lineCap = "round";
                context.lineTo(x,y);
                context.stroke();
                context.beginPath();
                context.moveTo(x,y);
                console.log('coor ' + x + ' ' + y);
            }
        });
        socket.on('ondraw', function (data){
            context.lineTo (data.x, data.y);
            context.stroke();  
            context.lineWidth = 1;
          });
        document.getElementById("small").addEventListener('click', (event) =>{
            context.lineWidth = 1;
        });
        document.getElementById("middle").addEventListener('click', (event) =>{
            context.lineWidth = 10;
        });
        document.getElementById("big").addEventListener('click', (event) =>{
            context.lineWidth = 20;
        });
        document.getElementById("penColorInp").addEventListener('change', (event) =>{
            var newColor = event.target.value;
            context.strokeStyle= newColor;
        });
        document.getElementById("eraser").addEventListener('click', () =>{
            context.strokeStyle= "#ffffff";
        });
        document.getElementById("pen").addEventListener('click', () =>{
            context.strokeStyle= "#000000";
        });
        context.canvas.addEventListener('mouseup', ()=>{
            draw = false;
            context.beginPath();
        });
    });
    var element = document.querySelector(".toolbar");
    element.addEventListener('mousedown', start);
    function start(){
        addEventListener("mousemove", move);
    }
    function move(e){
        e=e || event;
        element.style.left=e.pageX-10+"px";
        element.style.top=e.pageY-10+"px";
    }
    element.addEventListener('mouseup', () =>{
        removeEventListener("mousemove", move)
    });
});

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
});

function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }