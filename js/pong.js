var Pong = function(ctx) {
	this.ctx			= ctx;
	this.field		= new Field(800, 400);
	this.player_1	= new Player(this.ctx, 20, this.field.height / 2);
	this.player_2	= new Player(this.ctx, this.field.width - 20, this.field.height / 2);
};

Pong.prototype.draw = function(){
	this.field.redraw(this.ctx);
	this.player_1.draw(this.ctx);
	
	this.player_2.draw(this.ctx, {top: this.field.x, bottom: (this.field.x + this.field.height)});
};


Pong.prototype.init = function(){
	this.eventHandler();
	this.run();
};


Pong.prototype.eventHandler = function(){
	var self = this;
	window.addEventListener('keydown',function(evt){
				switch (evt.keyCode) {
				case 38:  /* Up arrow was pressed */
					self.player_1.move('up');
					break;
				case 40:  /* Down arrow was pressed */
					self.player_1.move('down');
					break;
				case 37:  /* Left arrow was pressed */
					self.player_2.move('down');
					break;
				case 39:  /* Right arrow was pressed */
					self.player_2.move('up');
					break;
				}
		},true);
};


Pong.prototype.run = function(){
	var self = this;
	self.draw();
	setTimeout(function(){
		self.run()
	}, 50);
};
