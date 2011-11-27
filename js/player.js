var Player = function(ctx, start_x, start_y) {
	this.height = 100;
	this.width  = 20;
	this.ctx	= ctx;
	this.x		= start_x;
	this.y		= start_y;
};

Player.prototype.draw = function(ctx){
	ctx.save();
	ctx.fillStyle = '#fff';
	ctx.fillRect(this.x - (this.width/2),this.y - (this.height/2),this.width, this.height);
	ctx.restore();  
};

Player.prototype.move = function(direction){
	switch(direction)
	{
		case 'up':
			this.y += 10;
			break;
		case 'down':
			this.y -= 10;
			break;
	}
};


//Player.prototype.move =