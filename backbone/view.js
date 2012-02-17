window.PongView = Backbone.View.extend({
   	el : document.getElementById(''),

    model : new Cannon,

    events : {            
        'click' : 'lightFuse'            
    },

    initialize : function() {
        _.bindAll(this, 'fire');
        this.ball = new BallView;

        loadingView = new LoadingView;
        Backbone.beforeSync = loadingView.render;
        Backbone.afterSync = loadingView.remove;
    },

    lightFuse : function() {
        this.model.fire(this.fire);
    },

    fire : function() {
        this.ball.animate();
    }

});
