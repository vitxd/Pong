var Player = function(ctx, start_x, start_y) {
    this.step   = 10;
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
			this.y -= this.step;
			break;
		case 'down':
			this.y += this.step;
			break;
	}
};

Player.prototype.getPosition = function(direction){
	switch(direction)
	{
        case 'up':
            return this.y - this.step - (this.height / 2);
            break;
        case 'down':
            return this.y + this.step + (this.height / 2);
            break;
	}
}

//Player.prototype.move =
