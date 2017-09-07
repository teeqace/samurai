cc.Class({
  extends: cc.Component,

  properties: {},

  // use this for initialization
  onLoad: function () {},

  init(data) {
    this.node.setScale(1);
    this.node.color = cc.hexToColor('#1E1E1E')
    this.node.width = data.size
    this.node.height = data.size

    this.node.x = data.x
    this.node.y = data.y

    this.speed = data.speed

    this.isWhite = false
    this.isEaten = false
  },

  ebUpdate(dt) {

  }
});