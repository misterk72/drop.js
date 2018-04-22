(function() {
    function StaticDrop(col, row, depth) {
		this.col = col;
		this.row = row;
        this.width = 39;
        this.height = 39;
        this.depth = depth;
        this.state = 'idle';
        this.sprite = new Sprite('img/sprites.png', [0, 117],
                                                   [39, 39],
                                                   16,
                                                   [this.depth],
                                                    null);
    }

    StaticDrop.prototype = {
        update: function(dt) {
			if (this.depth > 4) {
                this.state = 'exploding';
				this.depth = 0;
				this.sprite = new Sprite('img/sprites.png', [0, 117],
                                                   [39, 39],
                                                   16,
                                                   [5, 6, 7, 8, 9, 10, 11, 12],
                                                    null,
													true);
				board.movingDrops.push( new MovingDrop(this.col, this.row, 'left') );
				board.movingDrops.push( new MovingDrop(this.col, this.row, 'right') );
				board.movingDrops.push( new MovingDrop(this.col, this.row, 'up') )
				board.movingDrops.push( new MovingDrop(this.col, this.row, 'down') );
			}
            if ((this.state == 'exploding') &&
                (this.sprite.done)) {
                board.removeStaticDrop(this);
            }
                 
            this.sprite.update(dt);
        },
        
        draw: function(ctx) {
            ctx.save();
            ctx.translate(this.col * COL_WIDTH + COL_WIDTH / 2 - this.width / 2, 
                          this.row * ROW_HEIGHT + ROW_HEIGHT / 2 - this.height / 2);
            this.sprite.render(ctx);
            //ctx.strokeText(this.depth, 0, 0);
            ctx.restore();
        },
        
        increaseDepth: function() {
            this.depth++;
            this.sprite.frames[0]++;
        }
    };

    window.StaticDrop = StaticDrop;
})();
