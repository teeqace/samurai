import {
  messagePipeline
} from 'MessagePipeline'

cc.Class({
  extends: cc.Component,

  properties: {
    anim: cc.Animation
  },

  // use this for initialization
  onLoad: function () {
    messagePipeline.on('onGameOver', this._onGameOver, this)
  },

  _onGameOver() {
    this.anim.play('ButtonOpen')
  },

  $reset() {
    this.anim.play('ButtonClose')
    messagePipeline.sendMessage('onReset', this)
  }
});