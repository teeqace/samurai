import EBBase from './EBBase'

cc.Class({
  extends: EBBase,

  properties: {},

  onLoad: function () {
    this._super()
  },

  init(data) {
    this._super(data)
    this.rotateSpeed = data.rotateSpeed
    this.accelerate = data.accelerate
  },

  ebUpdate(dt) {
    this._super(dt)
    if (this.rotateSpeed > 0) {
      this.rotateSpeed += dt * this.accelerate
    } else {
      this.rotateSpeed -= dt * this.accelerate
    }

    let from = this.node.getPosition()
    let to = cc.Vec2.ZERO
    let distance = cc.pDistance(to, from)
    distance -= dt * this.speed

    let radAngle = cc.pToAngle(cc.pSub(from, to))
    let degAngle = cc.radiansToDegrees(radAngle)
    degAngle += dt * this.rotateSpeed

    // let toRad = degAngle * Math.PI / 180
    let toRad = cc.degreesToRadians(degAngle)
    this.node.y = Math.sin(toRad) * distance
    this.node.x = Math.cos(toRad) * distance
  }
});