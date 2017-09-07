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
    messagePipeline.on('onLevelUp', this._onLevelUp, this)
  },

  _onLevelUp() {
    this.anim.play()
  }
});