var color = "#000000";

function randCoord() {
    var coordo = {
        x: Math.floor(Math.random() * 400), 
        y: Math.floor(Math.random() * 400),
        color: color
    }
    return coordo;
}

onmessage = function(e) {
    color = e.data;
    console.log("received color = "+color);
  }

setInterval(() => {
    postMessage(randCoord());
}, 500);