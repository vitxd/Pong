var Pong = function(ctx) {
	this.ctx			= ctx;
	this.field		= new Field(800, 400);
	this.player_1	= new Player(this.ctx, 20, this.field.height / 2);
	this.player_2	= new Player(this.ctx, this.field.width - 20, this.field.height / 2);

	var middle		= this.field.getMiddle();
	this.ball		= new Ball(middle.x, middle.y);


	this.score_1    = 0;
	this.score_2 	= 0;
};

Pong.prototype.draw = function(){
	this.field.redraw(this.ctx);
	this.moveBall();
	this.ball.draw(this.ctx);
	this.player_1.draw(this.ctx);
	this.player_2.draw(this.ctx);
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
				position = self.player_2.getPosition('top');
                if(position > boundaries.top)
				    self.player_2.move('up');
				break;
			case 40:  /* Down arrow was pressed */
				position = self.player_2.getPosition('bottom');
                if(position < boundaries.bottom)
				    self.player_2.move('down');
				break;
			case 87:  /* 'w' was pressed */
			    position = self.player_1.getPosition('top');
			    if(position > boundaries.top)
			        self.player_1.move('up');
			    break;
			case 83:  /* 's' was pressed */
			    position = self.player_1.getPosition('bottom');
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
		self.run();
	}, 17);
};

Pong.prototype.moveBall = function(){
    var angleAdjustment = this.player_1.height,
        isCollision = true;

    if(!this.checkWallCollision())
		angleAdjustment = this.checkPlayerCollision();

    if(angleAdjustment === null){
        angleAdjustment = this.player_1.height;
        isCollision = false;
    }

    if (isCollision)
        this.ball.changeAngle(parseFloat(angleAdjustment) / this.player_1.height);

    this.ball.move();
};


Pong.prototype.checkWallCollision = function(){
	var boundaries	= this.field.getBoundary(),
		position	= this.ball.getPosition();

	if((position.x - position.radius) <= boundaries.left){
		this.score_1 ++;
		this.ball.collision();
		return true;
	}
	else if(position.x + position.radius >= boundaries.right){
		this.score_2 ++;
		this.ball.collision();
		return true;
	}
	else if(position.y - position.radius <= boundaries.top){
	    return true;
	}
	else if(position.y + position.radius >= boundaries.bottom){
	    return true;
	}
	return false;
};

Pong.prototype.checkPlayerCollision = function(){
	var ballPosition = this.ball.getPosition(),
		fieldMiddle  = this.field.getMiddle(),
		where        = null;
	;
	
	switch(this.ball.direction){
		case -1:
			if(ballPosition.x < fieldMiddle.x){
				where = this.player_1.ballCollision(this.ball.getPosition(), this.ball.direction);
				if(where !== null){
					console.log("where = " + where);
					this.ball.collision();
				}
			}
			break;
		case 1:
			if(ballPosition.x > fieldMiddle.x){
				where = this.player_2.ballCollision(this.ball.getPosition(), this.ball.direction);
				if(where !== null){
					console.log("where = " + where);
					this.ball.collision();
				}
			}
			break;
	}
	
	return where;
};

Pong.prototype.stop = function(){
	clearTimeout(this.timer);
};
