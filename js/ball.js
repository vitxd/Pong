var Ball = function(x, y){
	this.step		= 6;
	this.radius		= 15;
	this.x			= x;
	this.y			= y;
	this.direction	= Math.floor((Math.random() * 1000) % 2) ; // 1 Left, 0 Right
	this.radians	= 0;
	console.log(this.direction);
};


Ball.prototype.draw = function(ctx){
	ctx.save();
	ctx.beginPath();  
	ctx.fillStyle = "white";
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
};

Ball.prototype.move = function(){
	console.log('moving');
	switch(this.direction){
		case 0:
			this.x += this.step;
			break;
		case 1:
			this.x -= this.step;
			break;
	}
};


Ball.prototype.getPosition = function(){
	return {x: this.x, y: this.y, radius: this.radius};
};


Ball.prototype.collision = function(){
	console.log('collision!');
	this.direction = (this.direction ? 0 : 1);
};
