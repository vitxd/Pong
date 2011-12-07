var Ball = function(x, y){
	this.step		= 2;
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
	ctx.stroke();
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


Ball.prototype.getPosition = function(side){
	switch(side){
		case 'top':
			return {x: this.x, y: (this.y - this.radius)};
			break;
		case 'bottom':
			return {x: this.x, y: (this.y + this.radius)};
			break;
		case 'left':
			return {x: this.x - this.radius, y: this.y};
			break;
		case 'right':
			return {x: this.x + this.radius, y: this.y};
			break;
		default:
			return {
				top		: {x: this.x, y: (this.y - this.radius)},
				bottom	: {x: this.x, y: (this.y + this.radius)},
				left	: {x: this.x - this.radius, y: this.y},
				right	: {x: this.x + this.radius, y: this.y}
			};
	}
};


Ball.prototype.collision = function(){
	console.log('collision!');
	this.direction = (this.direction ? 0 : 1);
};
