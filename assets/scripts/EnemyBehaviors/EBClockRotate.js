import EBBase from './EBBase'

cc.Class({
  extends: EBBase,

  properties: {},

  onLoad: function () {
    this._super()
  },

  init(data) {
    this._super(data)
    this.isRotate = false
    this.rotateSpeed = data.rotateSpeed
    this.rotateTime = data.rotateTime
    this.straightTime = data.straightTime
    this.timer = 0
  },

  ebUpdate(dt) {
    this._super(dt)
    this.timer += dt
    if (this.isRotate && this.timer >= this.rotateTime) {
      this.timer -= this.rotateTime
      this.isRotate = false
    } else if (!this.isRotate && this.timer >= this.straightTime) {
      this.timer -= this.straightTime
      this.isRotate = true
    }
    let from = this.node.getPosition()
    let to = cc.Vec2.ZERO
    let distance = cc.pDistance(to, from)
    let radAngle = cc.pToAngle(cc.pSub(from, to))
    let degAngle = cc.radiansToDegrees(radAngle)

    if (this.isRotate) {
      if (this.rotateSpeed > 0) {
        this.rotateSpeed += dt * 10
      } else {
        this.rotateSpeed -= dt * 10
      }
      degAngle += dt * this.rotateSpeed
    } else {
      distance -= dt * this.speed
    }
    let toRad = cc.degreesToRadians(degAngle)
    this.node.y = Math.sin(toRad) * distance
    this.node.x = Math.cos(toRad) * distance
  }
});