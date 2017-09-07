cc.Class({
  extends: cc.Component,

  properties: {},

  // use this for initialization
  onLoad: function () {

  },

  spawnData(count, slanting) {
    let dataList = []

    let toDeg = Math.random() * 360
    let toRad = cc.degreesToRadians(Math.random() * 360)
    let adjDeg = 0
    let length = 480
    let size = 32

    for (let i = 0; i < count; i++) {
      let toRad = cc.degreesToRadians(toDeg + adjDeg)
      let data = {
        speed: 100,
        ebType: 'ebStraight',
        size: size,
        x: Math.cos(toRad) * length,
        y: Math.sin(toRad) * length
      }
      dataList.push(data)
      length += size
      adjDeg += slanting
    }
    return dataList
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});