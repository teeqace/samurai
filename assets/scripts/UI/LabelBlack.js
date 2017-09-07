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
    messagePipeline.on('onBlacken', this._onBlacken, this)
    messagePipeline.on('onReset', this._onReset, this)
  },

  _onBlacken(event) {
    let black = event.detail
    this.label.string = `BLACK:${black}`
  },

  _onReset() {
    this.label.string = `BLACK:0`
  }
});