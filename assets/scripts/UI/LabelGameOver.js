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
    messagePipeline.on('onReset', this._onReset, this)
  },

  _onGameOver() {
    this.anim.play()
  },

  _onReset() {
    this.node.opacity = 0
  }
});