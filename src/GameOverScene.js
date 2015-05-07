var EndScene = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Gameover.png' );
    },

});

var GameOverScene = cc.LayerColor.extend({
  init: function() {
    this.createEndScene();
    this.createRestartButton();
    this.createScoreLabel();
     
    return true;
  },
    
  createScoreLabel: function() {
    this.timeLabel = cc.LabelTTF.create( time + ' sec', 'Times New Roman', 32 );
    this.timeLabel.setPosition( new cc.Point( 385, 552 ) );
    this.addChild( this.timeLabel );
      
    this.distanceLabel = cc.LabelTTF.create( distance + 'm', 'Times New Roman', 32 );
    this.distanceLabel.setPosition( new cc.Point( 385, 482 ) );
    this.addChild( this.distanceLabel );
      
    var score = 1.6 * distance + distance / time;

    this.scoreLabel = cc.LabelTTF.create( Math.ceil( score ), 'Times New Roman', 45 );
    this.scoreLabel.setPosition( new cc.Point( 480, 390 ) );
    this.addChild( this.scoreLabel );
  },

  createEndScene: function() {
    this.endScene = new EndScene();
    this.endScene.setPosition( new cc.Point( SCREEN_WIDTH/2 , SCREEN_HEIGHT/2  ) );
    this.addChild( this.endScene );
  },
    
  createRestartButton: function(){
    this.restartButtonItem = new cc.MenuItemImage(
      'res/images/RestartButtonClicked.png',
      'res/images/RestartButton.png',
      function () {
        cc.audioEngine.stopMusic( 'res/effects/BGM.mp3' );
        distance = 0;
        time = 0;
        cc.director.runScene( new StartScene() );
      }, this);
    this.restartButton = new cc.Menu( this.restartButtonItem );
    this.restartButton.setPosition( SCREEN_WIDTH/2, (SCREEN_HEIGHT/2) - 200 );
    this.addChild( this.restartButton );
  },


});

var EndGameMenu = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new GameOverScene();
    layer.init();
    this.addChild( layer );
  }
});