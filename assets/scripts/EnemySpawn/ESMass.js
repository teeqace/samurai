cc.Class({
  extends: cc.Component,

  properties: {},

  // use this for initialization
  onLoad: function () {},

  spawnData(ebType, _data) {
    let dataList = []

    let length = 480
    let baseDeg = Math.random() * 360
    let baseRad = cc.degreesToRadians(baseDeg)
    let basePos = new cc.Vec2(Math.cos(baseRad) * length, Math.sin(baseRad) * length)

    let size = 32

    let baseData = Object.assign({}, _data)
    baseData.speed = 100
    baseData.ebType = ebType
    baseData.size = size
    baseData.x = basePos.x
    baseData.y = basePos.y
    dataList.push(baseData)
    for (let i = 0; i < 6; i++) {
      let adjSpeed = 3
      if (i % 3 === 0) {
        adjSpeed = 7
      }
      if (2 <= i && i <= 4) {
        adjSpeed *= -1
      }
      let toRad = cc.degreesToRadians(baseDeg + 60 * i)
      let data = Object.assign({}, _data)
      data.speed = 100 + adjSpeed
      data.ebType = ebType
      data.size = size
      data.x = basePos.x + Math.cos(toRad) * size * 2
      data.y = basePos.y + Math.sin(toRad) * size * 2
      dataList.push(data)
    }
    return dataList
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});