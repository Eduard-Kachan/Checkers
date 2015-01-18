(function(){

    resources.load([
        'assets/images/checker.png',
        'assets/images/plastic.png'
    ]);

    resources.onReady(init);

    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();



    function init() {
        var game = new Game(document.getElementById('canvas'));

        //game.main();

        var i = 0;

        // reused variable to create pieces
        var piece;

        for(i = 11 ;i >= 0; i--){
            addPiece('white','bottom',game.bottomStartSet[i]);
            addPiece('black','top',game.topStartSet[i]);
        }

        // function to add the piece
        function addPiece(type,orientation,startSet){
            piece = new Piece(
                'assets/images/checker.png',
                document.getElementById('canvas'),
                type,
                orientation,
                {x:startSet[0], y:startSet[1]});
            //console.log(piece);
            game.board.addPiece(piece);
            //console.log(game.board.pieces);
        }


        document.getElementById('canvas').addEventListener('click', function(e) {
            var position = game.coordsToGrid(e.x, e.y);
            if(!position) return;


            var piece = game.board.grid[position.x][position.y];
            
            if(game.getEnemy() == piece.type) return;

            if(piece != 0){
                game.lastCliked = piece;
                game.getAvailable(position);

                game.update();
            }else if(piece === 0){

                for(i = game.available.length-1; i>= 0; i--){
                    if(game.available[i] === undefined) continue;

                    var available = game.available[i];

                    if((position.x == available.x) && (position.y == available.y)){
                        game.lastCliked.move(available);
                        game.changeTurn();
                    }
                }

                for(i = game.availableToEat.length-1; i>= 0; i--){
                    if(game.availableToEat[i] === undefined) continue;

                    var availableToEat = game.availableToEat[i];

                    if((position.x == availableToEat.position.x) && (position.y == availableToEat.position.y)){
                        game.lastCliked.move(availableToEat.position);
                        game.board.remove(availableToEat.enemy);
                        game.changeTurn();
                    }
                }

                game.resetAvailable();
                game.update('all');
            }

        }, false);

        // The main game loop
        var lastTime;
        function main() {
            var now = Date.now();
            var dt = (now - lastTime) / 1000.0;

            game.board.setPiecesInGrid();
            game.board.render();
            game.board.pieces.forEach(function(piece){
                piece.render();
            });
            //update(dt);
            //render();

            lastTime = now;
            requestAnimFrame(main);
        }

        main();
    }
})();