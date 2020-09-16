
let canvas=document.getElementById('canvas')
let ctx=canvas.getContext('2d');

var tileset=new Image()
tileset.src='./tileset.png'

var index=0
var tilesize=30;
var tilerow=1;
var tilecol=4;
var maprow=15;
var mapcol=10;


var screen=[
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,1,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,

]




var drawImage =function f() {

    ctx.clearRect(0,0,300,450)


    for (var r=0;r<maprow;r++){
        for (var c=0;c<mapcol;c++) {
            // console.log(map[10*r+c])
            var tile = screen[10*r+c]

            var tileX = tile % tilecol
            var tileY = Math.floor(tile / tilecol)
            // console.log("hi")
            

            
            
                ctx.drawImage(tileset, (tilesize * tileX), (tileY * tilesize), tilesize, tilesize, (c * tilesize ), (r * tilesize ), tilesize , tilesize )
            
        //
        }
    }
    }

   

tileset.onload = drawImage