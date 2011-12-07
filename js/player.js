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
        case 'top':
            return this.y - (this.height / 2);
            break;
        case 'bottom':
            return this.y + (this.height / 2);
            break;
		case 'left':
			return this.x - (this.width / 2);
			break;
		case 'right':
			return this.x + (this.width / 2);
			break;
	}
}



Player.prototype.ballCollision = function(ballPosition, direction){
	console.log(ballPosition);
	console.log('top: ' + this.getPosition('top'));
	console.log('bottom: ' + this.getPosition('bottom'));
	console.log('left: ' + this.getPosition('left'));
	console.log('right: ' + this.getPosition('right'));
	if(ballPosition.y >= this.getPosition('top') || ballPosition.y <= this.getPosition('bottom')){
		if(direction){
			if(ballPosition.x + ballPosition.radius >= this.getPosition('left'))
				return true;
		} else {
			if(ballPosition.x - ballPosition.radius <= this.getPosition('right'))
				return true;
		}
	}
	return false;
}
