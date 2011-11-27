var Pong = function(ctx) {
	
	this.ctx		= ctx;
	this.field		= new Field(800, 400);
	this.player_1	= new Player(this.ctx, 20, this.field.height / 2);
	this.player_2	= new Player(this.ctx, this.field.width - 20, this.field.height / 2);
};

Pong.prototype.draw = function(){
	this.field.redraw(this.ctx);
	this.player_1.draw(this.ctx);
	this.player_1.move('up');
	
	this.player_2.draw(this.ctx, {top: this.field.x, bottom: (this.field.x + this.field.height)});
	this.player_2.move('down');
};


Pong.prototype.run = function(){
	var self = this;
	self.draw();
	setTimeout(function(){
		self.run()
	}, 100);
};