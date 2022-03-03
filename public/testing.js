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
        context.canvas.addEventListener('mousemove', (e)=>{
            if(draw){
                var x = e.clientX;
                var y = e.clientY;
                context.lineCap = "round";
                context.lineTo(x,y);
                context.stroke();
                context.beginPath();
                context.moveTo(x,y);
            }
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
document.querySelector('.save-btn').addEventListener('click', function() {
    html2canvas(document.querySelector('canvas'),{
        onrendered: function(canvas) {
            return Canvas2Image.saveAsPNG(canvas);
        }
    });
});
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
});