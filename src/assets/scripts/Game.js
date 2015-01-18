(function(){
    function Game(canvas) {

        this.outsideCanvas = canvas;
        this.context = this.outsideCanvas.getContext('2d');

        this.board = new Grid(this.outsideCanvas);

        this.bottomStartSet = [[0, 0], [0, 2], [4, 0], [6, 0], [1, 1], [3, 1], [5, 1], [7, 1], [2, 0], [2, 2], [4, 2], [6, 2]];
        this.topStartSet = [[7, 7], [5, 7], [3, 7], [1, 7], [6, 6], [4, 6], [2, 6], [0, 6], [7, 5], [5, 5], [3, 5], [1, 5]];

        this.i = 0;
        this.j = 0;

        this.available = [];

        this.availableToEat = [];

        this.currentTurn = 'white';

        this.lastCliked = undefined;

        this.direction = {
            right: 1,
            left: -1
        };

        this.orientation = {
            bottom: 1,
            top: -1
        };

        this.availableOrientation = [
            ['left', 'bottom'],
            ['right', 'bottom'],
            ['left', 'top'],
            ['right', 'top']
        ];

    }

    Game.prototype =  {

        changeTurn: function(){
            this.currentTurn = (this.currentTurn == 'white' ? 'black': 'white');
            return this.currentTurn;
        },

        getCurrent: function(){
            return this.currentTurn;
        },

        getEnemy: function(){
            if(this.currentTurn === 'white') return 'black';
            else return 'white';
        },

        resetAvailable: function(){
            this.available = [];
            this.availableToEat = [];
        },

        drawPieces: function(){
            var i = this.i;
            var l = this.board.pieces.length-1;
            for(i=l; i>=0; i--){
                if(this.board.pieces[i].eaten) continue;
                this.board.pieces[i].draw(canvas,this.board.context);
            }
        },

        drawBlankPieces: function(position){

            var context = this.context;

            context.beginPath();



            var x = canvas.width*0.125 * position.x + (canvas.width*0.125*0.5);
            var y = canvas.width - (canvas.width*0.125 * position.y + (canvas.width*0.125*0.5));

            context.arc(x, y, 15, 0, 2 * Math.PI, false);
            context.lineWidth = 1;
            context.strokeStyle = 'gray';
            context.stroke();

        },

        getAvailable: function(position){
            this.resetAvailable();
            var reference = this.board.grid[position.x][position.y];

            var check;

            for(var i = 3; i>=0; i--){
                check = this.checkIfCanMove(
                    this.availableOrientation[i][0],
                    this.availableOrientation[i][1],
                    reference
                );
                if(check != 0){
                    this.available.push(check);
                }
            }
        },

        whatTile: function(position){
            if( position.x > 7 || position.x < 0 || position.y > 7 || position.y < 0) return false;
            return this.board.grid[position.x][position.y];
        },

        diagonalCoords: function(direction,position,orientation){
            return {
                x:position.x + this.direction[direction],
                y:position.y + this.orientation[orientation]
            };
        },

        checkIfCanMove: function(direction, orientation, piece){
            if(piece.orientation != orientation && !piece.queen) return 0;

            var position = this.diagonalCoords(direction, piece.position, orientation);
            var returnedTile = this.whatTile(position);

            if(returnedTile === false || returnedTile.type == this.currentTurn){
                return 0;
            }else if(returnedTile === 0){
                return position;
            }else {
                this.checkIfCanEat(direction, orientation, piece);
            }
        },

        checkIfCanEat: function(direction, orientation, piece){

            if(piece.orientation != orientation && !piece.queen) return 0;

            var position = this.diagonalCoords(direction, piece.position, orientation);
            var returnedTile = this.whatTile(position);

            if(returnedTile.type == this.getEnemy()){
                position = this.diagonalCoords(direction, returnedTile.position, orientation);

                if(this.whatTile(position) === 0){

                    this.availableToEat.push({
                        enemy:returnedTile,
                        position:position
                    });

                }else{
                    return 0;
                }
            }
        },

        coordsToGrid: function(eX,eY){
            eX = eX - 32;
            eY = eY - 32;

            if(eX < 0 || eX > 256) return false;
            if(eY < 0 || eY > 256) return false;

            var x;
            var y;

            for(var i = 0; i <= 8; i++){
                if(32 * i > eX){
                    x = i-1;
                    break;
                }
            }
            for(i = 0; i <= 8; i++){
                if(32*8 - 32 * i < eY){
                    y = i-1;
                    break;
                }
            }
            return {
                x:x,
                y:y
            }
        },

        //main: function() {
        //    var now = Date.now();
        //    var dt = (now - this.lastTime) / 1000.0;
        //
        //    //update(dt);
        //    //render();
        //
        //    //this.board.render();
        //
        //    this.lastTime = now;
        //    requestAnimFrame(this.main);
        //},

        update: function(){

            //this.board.resetGrid();
            //this.board.setPiecesInGrid();
            //this.board.draw();
            //this.drawPieces();
            //
            //for(var i = this.available.length-1; i >= 0; i--){
            //    if(this.available[i] === undefined) continue;
            //    this.drawBlankPieces(this.available[i]);
            //}
            //
            //for(var i = this.availableToEat.length-1; i >= 0; i--){
            //    if(this.availableToEat[i] === undefined) continue;
            //    this.drawBlankPieces(this.availableToEat[i].position);
            //}
        }
    };

    window.Game = Game;

})();
