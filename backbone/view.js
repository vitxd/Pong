$(function() {                
	window.PongView = Backbone.View.extend({
		el : document.getElementById('canvas'),
		events : {
		},
		hello : function() {
			alert('hello');
		},
		initialize : function() {

			this.ctx 		= this.el.getContext('2d');
			this.x			= 0;
			this.y			= 0;
			this.width  	= 800;
			this.height 	= 400;
			this.render();
			this.drawScore('left', 0);
			this.drawScore('right', 0);
			
			this.ball 		= new BallView();
			this.player_1 	= new PlayerView(20, this.height / 2);
			this.player_2 	= new PlayerView(this.width - 20, this.height / 2);

			_.bindAll(this, 'on_keypress');
			$(document).bind('keypress', this.on_keypress);
		},
		on_keypress : function(evt) {
			switch (evt.keyCode) {
				case 38:  /* Up arrow was pressed */
					this.drawScore('right', 1);
					position = self.player_1.getPosition('top');
					if(position > boundaries.top)
						self.player_1.move('up');
					break;
				case 40:  /* Down arrow was pressed */
					position = self.player_1.getPosition('bottom');
					if(position < boundaries.bottom)
						self.player_1.move('down');
					break;
			}
		},
		render		: function(){
			this.ctx.save();  
			this.ctx.clearRect(this.x,this.y,this.width + 10,this.height + 10);  
			this.ctx.strokeStyle = '#c0c0c0';  
			this.ctx.beginPath();  
			this.ctx.moveTo(this.x,this.y);  
			this.ctx.lineTo(this.width,this.y);  
			this.ctx.lineTo(this.width,this.height);  
			this.ctx.lineTo(this.x,this.height);  
			this.ctx.lineTo(this.x,this.y);  
			this.ctx.stroke(); 
			this.ctx.closePath(); 
			this.ctx.restore();  
		},
		drawScore 	: function(align, score){

			var y = 20,
				x;
			switch(align){
				case 'right':
					x = this.width - 40;
					break;
				case 'left':
					x = 20;
					break;
			}
			this.ctx.save();
			this.ctx.fillStyle = "#c0c0c0"
			var text = score;
			var blur = 5;
			var width = this.ctx.measureText(text).width + blur * 2;
			this.ctx.font = 'bold 35px Arial';
			this.ctx.textBaseline = "top";
			this.ctx.shadowColor = "#FFF";
			this.ctx.shadowOffsetX = 5;
			this.ctx.shadowOffsetY = 0;
			this.ctx.shadowBlur = blur;
			this.ctx.fillText(text, x, y);
			this.ctx.restore();


		//	this.ctx.text({
		//		text: 10, 
		//		size: 32,
		//		padding: [0, 70],
		//		color: 'white',
		//		align: align
		//	});
		}
	});

	window.BallView = Backbone.View.extend({
		
	});

	window.PlayerView = Backbone.View.extend({
		el 			: document.getElementById('canvas'),
		initialize 	: function(start_x, start_y){
			this.ctx 	= this.el.getContext('2d');
			this.step 	= 10;
			this.height = 100;
			this.width 	= 20;
			this.x 		= start_x;
			this.y 		= start_y;
			this.render();
		},
		render 		: function(){
			this.ctx.save();
			this.ctx.fillStyle = '#fff';
			this.ctx.fillRect(this.x - (this.width/2), this.y - (this.height/2), this.width, this.height);
			this.ctx.restore();  
		}
	});
});
