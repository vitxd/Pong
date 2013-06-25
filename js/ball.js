var Ball = function(x, y){
	this.step		= 6;
	this.radius		= 15;
	this.x			= x;
	this.y			= y;
	this.direction	= Math.floor((Math.random() * 1000) % 2) * 2 - 1; // -1 Left, 1 Right
	this.radians	= 0;
};

Ball.prototype.draw = function(ctx){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
};

Ball.prototype.move = function(){
	this.x += this.direction * this.step;
	this.y += this.direction * Math.sin(this.radians) * this.step;
};

Ball.prototype.getPosition = function(){
	return {x: this.x, y: this.y, radius: this.radius};
};

Ball.prototype.collision = function(){
	console.log('collision!');
	this.direction = -1 * this.direction;
};

Ball.prototype.changeAngle = function(adjust){
    // adjust: [-1/2..1/2]
    if (adjust == 0)
        adjust = 1;
    console.log("adjust = " + adjust);
    this.radians = (this.radians + Math.PI * adjust) % (2 * Math.PI);
    console.log("radians = " + this.radians);
};
