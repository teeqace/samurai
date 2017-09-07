cc.Class({
  extends: cc.Component,

  properties: {},

  // use this for initialization
  onLoad: function () {},

  spawnData(count, ebType, _data) {
    let dataList = []

    let adjDeg = 360 / count
    let length = 480
    let size = 32

    for (let i = 0; i < count; i++) {
      let toRad = cc.degreesToRadians(adjDeg * i)
      let data = Object.assign({}, _data)
      data.speed = 75
      data.ebType = ebType
      data.size = size
      data.x = Math.cos(toRad) * length
      data.y = Math.sin(toRad) * length
      dataList.push(data)
    }
    return dataList
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});