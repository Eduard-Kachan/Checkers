(function(){
    function Grid(canvas){

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        this.tileSize = 0;

        this.grid = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ];

        this.pieces = [];

        this.count = {
            x:0,
            y:0
        };
    }

    Grid.prototype = {
        addPiece: function (piece) {
            this.pieces.push(piece)
        },

        remove: function (piece) {
            piece.eaten = true;
        },

        resetGrid: function () {
            this.grid =
                [
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0]
                ];
        },

        setPiecesInGrid: function () {
            this.resetGrid();
            var l = this.pieces.length - 1;
            for (var i = l; i >= 0; i--) {
                if (this.pieces[i].eaten === true) continue;
                this.grid[this.pieces[i].position.x][this.pieces[i].position.y] = this.pieces[i];
            }
        },

        draw: function () {

            //var count = this.count;
            //var i = this.i;
            //
            //for (i = 63; i >= 0; i--) {
            //
            //    this.ctx.beginPath();
            //    var x = this.canvas.width * 0.125 * count.x;
            //    var y = this.canvas.width * 0.125 * count.y;
            //    var square = this.canvas.width * 0.125;
            //
            //    this.ctx.rect(x, y, square, square);
            //
            //    if (count.y % 2 == 0) {
            //        if (i % 2 == 0) {
            //            this.ctx.fillStyle = 'brown';
            //        } else {
            //            this.ctx.fillStyle = 'white';
            //        }
            //    } else {
            //        if (i % 2 == 0) {
            //            this.ctx.fillStyle = 'white';
            //        } else {
            //            this.ctx.fillStyle = 'brown';
            //        }
            //    }
            //
            //    this.ctx.fill();
            //
            //    if (count.x >= 7) {
            //        count.x = 0;
            //        count.y++;
            //    } else {
            //        count.x++;
            //    }
            //
            //}

        },

        render: function(){
            //var i = 0;

            this.ctx.drawImage(resources.get('assets/images/plastic.png'), 32, 0, 32, 32, 0, 0, 32,32);
            this.ctx.drawImage(resources.get('assets/images/plastic.png'), 96, 0, 32, 32, 288, 0, 32,32);
            this.ctx.drawImage(resources.get('assets/images/plastic.png'), 32, 64, 32, 32, 0, 288, 32,32);
            this.ctx.drawImage(resources.get('assets/images/plastic.png'), 96, 64, 32, 32, 288, 288, 32,32);

            for(var i = 1; i < 9; i++){
                this.ctx.drawImage(resources.get('assets/images/plastic.png'), 64,0, 32, 32, (32*i), 0, 32,32);
                this.ctx.drawImage(resources.get('assets/images/plastic.png'), 32,32, 32, 32, 0, (32*i), 32,32);
                this.ctx.drawImage(resources.get('assets/images/plastic.png'), 64, 64, 32, 32, (32*i), 288, 32,32);
                this.ctx.drawImage(resources.get('assets/images/plastic.png'), 96,32, 32, 32, 288, (32*i), 32,32);
            }

            var count = {x:0, y:0};

            for (i = 0; i < 64; i++) {

                var x = 32 + 32 * count.x;
                var y = 32 + 32 * count.y;

                var imgX = 0;
                var imgY = 0;

                if (count.y % 2 == 0) {
                    if (i % 2 == 0) {
                        imgX = 0;
                        imgY = 0;
                    } else {
                        imgX = 0;
                        imgY = 32;
                    }
                } else {
                    if (i % 2 == 0) {
                        imgX = 0;
                        imgY = 32;
                    } else {
                        imgX = 0;
                        imgY = 0;
                    }
                }

                this.ctx.drawImage(resources.get('assets/images/plastic.png'), imgX, imgY, 32, 32, x, y, 32,32);


                if (count.x >= 7) {
                    count.x = 0;
                    count.y++;
                } else {
                    count.x++;
                }

            }
        }
    };

    window.Grid = Grid;
})();
