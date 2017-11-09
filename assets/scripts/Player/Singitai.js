
const MAX_SIN = 100;
const MAX_GI = 100;
const MAX_TAI = 100;

const Singitai = cc.Class({
  extends: cc.Component,

  properties: {
    gaugeSinFill: cc.Sprite,
    gaugeGiFill: cc.Sprite,
    gaugeTaiFill: cc.Sprite
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    Singitai.instance = this;

    this._sin = 100;
    this._gi = 0;
    this._tai = 100;
  },

  getSin() {
    return this._sin;
  },

  getGi() {
    return this._gi;
  },
  
  getTai() {
    return this._tai;
  },

  indecreaseSin(value) {
    this._sin = Math.min(MAX_SIN, Math.max(0, this._sin + value));
  },
  
  indecreaseGi(value) {
    this._gi = Math.min(MAX_GI, Math.max(0, this._gi + value));
  },
  
  indecreaseTai(value) {
    this._tai = Math.min(MAX_TAI, Math.max(0, this._tai + value));
  },

  setSin(ratio) {
    this.gaugeSinFill.fillRange = ratio;
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    // this.setGaugeFill(this.gaugeSinFill, this._sin, MAX_SIN);
    this.setGaugeFill(this.gaugeGiFill, this._gi, MAX_GI);
    this.setGaugeFill(this.gaugeTaiFill, this._tai, MAX_TAI);
  },

  setGaugeFill(gauge, value, max) {
    let ratio = Math.min(1, Math.max(0, value / max));
    gauge.fillRange = ratio;
  }
});

export default Singitai;