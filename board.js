var board = {
    staticDrops: [],
    movingDrops: [],

    init: function() {
        // Populate board with static drops
        var staticDropsNb = Math.floor(0.8 * COL_NUMBER * ROW_NUMBER);
        for (var i = 0 ; i < staticDropsNb ; i++) {
            var col = Math.floor(Math.random() * COL_NUMBER);
            var row = Math.floor(Math.random() * ROW_NUMBER);
            if (!this.getDrop(col, row)) {
                this.staticDrops.push(new StaticDrop(col, row, Math.floor(Math.random() * 4) + 2));
            } else
            {
                i--;
            }
        }
    },

    addDrop: function(x, y) {
		var col = Math.floor(x / COL_WIDTH);
		var row = Math.floor(y / ROW_HEIGHT);
		var drop = this.getDrop(col, row)
		if (!drop) {
			drop = new StaticDrop(col, row, 0);
			this.staticDrops.push(drop);
		}
		drop.increaseDepth();
    },
	
	removeStaticDrop: function(drop) {
		this.staticDrops.remove(drop);
    },
    
    removeMovingDrop: function(drop) {
		this.movingDrops.remove(drop);
    },

    update: function(dt) {
        // Update static drops
        for (var i = 0; i < this.staticDrops.length; i++) {
            this.staticDrops[i].update(dt);
        }
		
		// Update moving drops
        for (var i = 0; i < this.movingDrops.length; i++) {
            this.movingDrops[i].update(dt);
        }
    },

    draw: function(ctx) {
        // Draw grid
        for (var i = 0; i < COL_NUMBER + 1; i++){
            ctx.beginPath();
            ctx.moveTo(i * COL_WIDTH, 0);
            ctx.lineTo(i * COL_WIDTH, ctx.canvas.height);
            ctx.stroke();
        }

        for (var i = 0; i < ROW_NUMBER + 1; i++){
            ctx.beginPath();
            ctx.moveTo(0, i * ROW_HEIGHT);
            ctx.lineTo(ctx.canvas.width, i * ROW_HEIGHT);
            ctx.stroke();
        }
        
        // Draw static drops
        for  (var i = 0; i < this.staticDrops.length; i++) {
            this.staticDrops[i].draw(ctx);
        }
		        
        // Draw moving drops
        for  (var i = 0; i < this.movingDrops.length; i++) {
            this.movingDrops[i].draw(ctx);
        }
    },
    
    getDrop: function(col, row) {
        for  (var i = 0; i < this.staticDrops.length; i++) {
            if ((this.staticDrops[i].col == col) 
             && (this.staticDrops[i].row == row)) {
                 return this.staticDrops[i];
             }
        }
        return null;
    }
};
