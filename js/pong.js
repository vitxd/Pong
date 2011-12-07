var Pong = function(ctx) {
	this.ctx			= ctx;
	this.field		= new Field(800, 400);
	this.player_1	= new Player(this.ctx, 20, this.field.height / 2);
	this.player_2	= new Player(this.ctx, this.field.width - 20, this.field.height / 2);
	
	var middle		= this.field.getMiddle();
	this.ball		= new Ball(middle.x, middle.y);
};

Pong.prototype.draw = function(){
	this.moveBall();
	this.field.redraw(this.ctx);
	this.ball.draw(this.ctx);
//	this.player_1.draw(this.ctx);
//	this.player_2.draw(this.ctx);
};


Pong.prototype.init = function(){
	this.eventHandler();
	this.run();
};


Pong.prototype.eventHandler = function(){
	var self = this;
	window.addEventListener('keydown',function(evt){
        var position,
            boundaries = self.field.getBoundary();
		switch (evt.keyCode) {
	    	case 38:  /* Up arrow was pressed */
				position = self.player_1.getPosition('up');
                if(position > boundaries.top)
				    self.player_1.move('up');
				break;
			case 40:  /* Down arrow was pressed */
				position = self.player_1.getPosition('down');
                if(position < boundaries.bottom)
				    self.player_1.move('down');
				break;
		}
	},true);
};


Pong.prototype.run = function(){
	var self = this;
	self.draw();
	this.timer = setTimeout(function(){
		self.run()
	}, 100);
};


Pong.prototype.moveBall = function(){
	var boundaries	= this.field.getBoundary(),
		position	= this.ball.getPosition();

	console.log(position);
	console.log(boundaries);
	if(position.left.x <= boundaries.left)
		this.ball.collision();
	else if(position.right.x >= boundaries.right)
		this.ball.collision();
	
	this.ball.move();
};

Pong.prototype.stop = function(){
	clearTimeout(this.timer);
}