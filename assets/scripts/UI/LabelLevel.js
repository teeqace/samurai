import {
  messagePipeline
} from 'MessagePipeline'

cc.Class({
  extends: cc.Component,

  properties: {
    label: cc.Label
  },

  // use this for initialization
  onLoad: function () {
    messagePipeline.on('onLevelUp', this._onLevelUp, this)
    messagePipeline.on('onReset', this._onReset, this)
  },

  _onLevelUp(event) {
    let level = event.detail
    this.label.string = `LEVEL:${level}`
  },

  _onReset() {
    this.label.string = `LEVEL:1`
  }
});