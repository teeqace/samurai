cc.Class({
  extends: cc.Component,

  properties: {
    line: cc.Graphics,
    mochiNode: cc.Node
  },

  // use this for initialization
  onLoad: function () {
    this.isDisp = false
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    // this.line.clear()
    // if (this.isDisp) {
    //   this.line.moveTo(this.mochiNode.x, this.mochiNode.y)
    //   this.line.lineTo(-this.node.x, -this.node.y)
    //   this.line.stroke()
    // }
  },

  onCollisionEnter(other, self) {
    let a = 0
  }
});