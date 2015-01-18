(function(){
    function Piece(url, canvas, type, orientation, position) {
        this.url = url;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.type = type;
        this.orientation = orientation;
        this.queen = false;
        this.eaten = false;
        this.position = position || {
            x: 0,
            y: 0
        };
    }

    Piece.prototype = {

        // black or white
        setType: function(type){
            this.type = type;
            return this;
        },

        // were does it start bottom or top
        setOrientation: function(orientation){
            this.orientation = orientation;
            return this;
        },

        // x & y position on board
        setPosition: function(position){
            this.position.x = position[0];
            this.position.y = position[1];
        },

        draw: function(){

            //this.ctx.beginPath();
            //
            //var x = this.canvas.width*0.125 * this.position.x + (this.canvas.width*0.125*0.5);
            //var y = this.canvas.width - (this.canvas.width*0.125 * this.position.y + (this.canvas.width*0.125*0.5));
            //
            //this.ctx.arc(x, y, 15, 0, 2 * Math.PI, false);
            //this.ctx.fillStyle = this.type;
            //this.ctx.fill();
            //if(this.queen){
            //    this.ctx.lineWidth = 3;
            //    this.ctx.strokeStyle = 'gold';
            //    this.ctx.stroke();
            //}

        },

        render: function(){
            if(this.eaten) return;

            var x = 0;
            var y = 0;

            if(this.type == 'white'){
                x = 32;
                y = 32;
                if(this.queen){
                    x = 32;
                    y = 0;
                }
            }else if(this.type == 'black'){
                x = 0;
                y = 32;
                if(this.queen){
                    x = 0;
                    y = 0;
                }
            }

            this.ctx.drawImage(
                resources.get('assets/images/checker.png'),
                x, y,
                32, 32,
                (32 + (32*this.position.x)), (32*9) - (32 * this.position.y + 32),
                32,32)
        },

        move: function(position){
            this.position = position;
            this.checkIfQueen();
        },

        checkIfQueen: function(){
            if(this.queen) return;

            if((this.orientation == 'bottom') && (this.position.y == 7)){
                console.log('hi');
                this.queen = true;
            }

            if((this.orientation == 'top') && (this.position.y == 0)){
                console.log('hi');
                this.queen = true;
            }
        }
    };

    window.Piece = Piece;
})();
