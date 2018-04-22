(function() {
    function MovingDrop(col, row, direction) {
		this.originalCol = col;
		this.originalRow = row;
	    this.width = 39;
        this.height = 39;
		this.x = col * COL_WIDTH + COL_WIDTH / 2 - this.width / 2;
		this.y = row * ROW_HEIGHT + ROW_HEIGHT / 2 - this.height / 2;
		this.direction = direction;
		this.state = 'move';
		this.dx = 300;
		this.dy = 300;
        this.sprite = new Sprite('img/sprites.png', [0, 117],
                                                   [39, 39],
                                                   16,
                                                   [1],
                                                    null);
    }

    MovingDrop.prototype = {
        update: function(dt) {
			if (this.state == 'move')
			{
				switch (this.direction) {
					case 'left': {
						this.x-=this.dx * dt;
						break;
					}
					case 'right': {
						this.x+=this.dx * dt;
						break;
					}				
					case 'up': {
						this.y-=this.dy * dt;
						break;
					}				
					case 'down': {
						this.y+=this.dy * dt;
						break;
					}
					default:
						break;
				}
				
				if ((this.x < 0)
				  ||(this.y < 0)
				  ||(this.x > CANVAS_WIDTH - this.width)
				  || (this.y > CANVAS_HEIGHT - this.height)) {
                    // hit the wall
                    this.sprite = new Sprite('img/sprites.png', [0, 117],
                                                        [39, 39],
                                                        16,
                                                        [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                                        null,
                                                        true);
					this.state = 'exploding';
				}
				
				var col = Math.floor(this.x / COL_WIDTH);
				var row = Math.floor(this.y / ROW_HEIGHT);
				if (((col != this.originalCol) ||
                    (row != this.originalRow)) &&
                    (board.getDrop(col, row))) {
                    // We just hit a static drop: explode
                    this.sprite = new Sprite('img/sprites.png', [0, 117],
                                    [39, 39],
                                    16,
                                    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                    null,
                                    true);
					this.state = 'exploding'
					board.addDrop(this.x, this.y);
				}
            }
                if ((this.state == 'exploding')
                 && (this.sprite.done)) {
                    board.removeMovingDrop(this);
                }
                this.sprite.update(dt);
        },
		
        draw: function(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
			//ctx.strokeText(this.direction, 0, 0);
            this.sprite.render(ctx);
            ctx.restore();
        },

    };

    window.MovingDrop = MovingDrop;
})();
