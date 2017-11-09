const StageCount = cc.Class({
  extends: cc.Component,

  properties: {
    stageLabel: cc.Label
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    StageCount.instance = this;
  },

  disp(value) {
    this.stageLabel.string = value;
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

export default StageCount;