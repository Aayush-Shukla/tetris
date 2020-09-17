
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
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
    

]
var shape=[
    [
            [
                [0,0,0],
                [1,1,1],
                [0,1,0]
            ],
            [
                [0,1,0],
                [0,1,1],
                [0,1,0]
                ],
            [
                [0,1,0],
                [1,1,1],
                [0,0,0]
            ],
            [
                [0,1,0],
                [1,1,0],
                [0,1,0]
            ]
    ],
    [
            [
                [0,0,0],
                [1,1,0],
                [0,1,1]
            ],
            [
                [0,0,1],
                [0,1,1],
                [0,1,0]
            ],
            [
                [1,1,0],
                [0,1,1],
                [0,0,0]
            ],
            [
                [0,1,0],
                [1,1,0],
                [1,0,0]
            ]
        
        
        
    ]
            
]


// var tempshape=[
//     [
//         [0,0,0],
//         [1,1,1],
//         [0,1,0]
//     ],
//     [
//         [0,1,0],
//         [0,1,1],
//         [0,1,0]
//         ],
//     [
//         [0,1,0],
//         [1,1,1],
//         [0,0,0]
//     ],
//     [
//         [0,1,0],
//         [1,1,0],
//         [0,1,0]
//     ]
// ]
var index=0
var shapeIndex=Math.floor(Math.random()*shape.length)
var piece=shape[shapeIndex][index]
// var piece=tempshape[index]

console.log(piece)




var drawImage =function f() {

    ctx.clearRect(0,0,300,450)


    for (var r=0;r<maprow;r++){
        for (var c=0;c<mapcol;c++) {
            // console.log(map[10*r+c])
            var tile = screen[10*r+c]

            var tileX = tile % tilecol
            var tileY = Math.floor(tile / tilecol)
            // console.log("hi")
            

            if(screen[r][c]!==0){
                ctx.drawImage(tileset, tilesize, (0), tilesize, tilesize, (c * tilesize ), (r * tilesize ), tilesize , tilesize )
                }
        
            else{
                ctx.drawImage(tileset, (0), (0), tilesize, tilesize, (c * tilesize ), (r * tilesize ), tilesize , tilesize )
            }
        }
        //

        }
    
    drawMatrix(piece,player.pos)
    }

   


    function drawMatrix(matrix, offset) {
        for (var r=0;r<matrix.length;r++){
            for (var c=0;c<matrix[r].length;c++) {
                // console.log(map[10*r+c])
                // var tile = screen[10*r+c]
    
                // var tileX = tile % tilecol
                // var tileY = Math.floor(tile / tilecol)
                // console.log("hi")
                
    
                
                    if(matrix[r][c]!==0){
                    ctx.drawImage(tileset, tilesize, (0), tilesize, tilesize, (c * tilesize )+offset.x*tilesize, (r * tilesize )+offset.y*tilesize, tilesize , tilesize )
                    }
            }
        }
    }
    
    const player = {
        pos: {x: 5, y: 5},
        matrix: piece,
    };



setInterval(update,1000)

function update(){
    
    player.pos.y++
    
    
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
   
    if(checkCollision(piece,screen,player.pos)){
        player.pos.y--
        merge(piece, screen,player.pos);
        player.pos.y=5
        player.pos.x=5

        shapeIndex=Math.floor(Math.random()*shape.length)
        index=0
        piece=shape[shapeIndex][index]



    }
    
    drawImage()
    drawMatrix(piece,player.pos)
    requestAnimationFrame(draw)


}


function wallCollision(piece,screen,offset)
{
    for (var r=0;r<piece.length;r++){
        for (var c=0;c<piece[r].length;c++) {
            if(piece[r][c]==0){
                continue
            }
            console.table(piece)
            console.log(screen[c + offset.x]===undefined, offset.x+c>mapcol-1 ,piece[r][c] !== 0,piece[r][c] !== 0)
            if((screen[c + offset.x] ===undefined || offset.x+c >mapcol-1) || (piece[r][c] !== 0 && screen[r + offset.y][c + offset.x] !== 0))
                 {
                     console.log("collided")
                    return true
                 }
    
        }
    }
    return false



}



function checkCollision(piece,screen,offset){
    for (var r=0;r<piece.length;r++){
        for (var c=0;c<piece[r].length;c++) {
            if(piece[r][c]==0){
                continue
            }
            if(piece[r][c] !== 0 &&(screen[r + offset.y] &&screen[r + offset.y][c + offset.x]) !== 0)
                 {
                     return true
                 }
    
        }
    }
    return false


}


function merge(piece,screen,offset) {
    // console.log("merging")
    for (var r=0;r<piece.length;r++){
        for (var c=0;c<piece[r].length;c++) {
            if (piece[r][c] !== 0) {
                screen[r + offset.y][c + offset.x] = piece[r][c];
            }
            
            }}
            // console.table(screen)

            checkLines()
        }



function checkLines(){
    console.log("called")
    for (var r=0;r<screen.length;r++){
        // console.log(screen[r])
        var flag=true
        for (var c=0;c<screen[r].length;c++) {
            if(screen[r][c]!=1){
                flag=false
            }
        }

            if (flag==true){
                screen.splice(r,1)
                screen.unshift([0,0,0,0,0,0,0,0,0,0])

            }

    }

    
}


function rotatePiece(piece,screen,offset){

    var temp=index

    console.log(index,"-----")
    index++ 
    index%=4
    console.log(wallCollision(piece,screen,offset))
    piece=shape[shapeIndex][index]

    if(wallCollision(piece,screen,offset) || checkCollision(piece,screen,offset))
    {
        console.log("true")
        index=temp
    piece=shape[shapeIndex][index]

    }
    console.log(index,"-------------")
    

}



document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {

        player.pos.x--;
        if(wallCollision(piece,screen,player.pos)){
            console.log("in")

            player.pos.x++       
        }
    } else if (event.keyCode === 39) {
        player.pos.x++;
        if(wallCollision(piece,screen,player.pos)){
            console.log("in")
            player.pos.x--        
        }
    } else if (event.keyCode === 40) {
        player.pos.y++;
    }
    else if (event.keyCode===38){
        console.log(index)
        rotatePiece(piece,screen,player.pos)
        piece=shape[shapeIndex][index]
        // piece=tempshape[index]

        // console.log(index)
        // console.table(piece)
    }
});

tileset.onload = drawImage

draw()