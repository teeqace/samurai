import {
  messagePipeline
} from 'MessagePipeline'

cc.Class({
  extends: cc.Component,

  properties: {},

  // use this for initialization
  onLoad: function () {
    messagePipeline.on('onReset', this._onReset, this)
  },

  _onReset() {
    this.node.setScale(0)
  }
});