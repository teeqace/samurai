import EBBase from './EBBase'

cc.Class({
  extends: EBBase,

  properties: {},

  onLoad: function () {
    this._super()
  },

  init(data) {
    this._super(data)
  },

  ebUpdate(dt) {
    this._super(dt)

    let from = this.node.getPosition()
    let to = cc.Vec2.ZERO
    let distance = cc.pDistance(to, from)
    let radAngle = cc.pToAngle(cc.pSub(to, from))
    let degAngle = -cc.radiansToDegrees(radAngle)

    let toRad = degAngle * Math.PI / 180

    this.node.y -= Math.sin(toRad) * dt * this.speed
    this.node.x += Math.cos(toRad) * dt * this.speed
  }
});