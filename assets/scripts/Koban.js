const Koban = cc.Class({
  extends: cc.Component,

  properties: {
    kobanLabel: cc.Label
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    Koban.instance = this;
    this._koban = 0;
    this.add(0);
  },

  add(value) {
    this._koban += value;
    this.kobanLabel.string = this._koban;
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

export default Koban;