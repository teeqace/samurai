cc.Class({
  extends: cc.Component,

  properties: {},

  // use this for initialization
  onLoad: function () {

  },

  spawnData(count) {
    let dataList = []

    let toDeg = Math.random() * 360
    let length = 480
    let size = 32

    for (let i = 0; i < count; i++) {
      let adjDeg = 0
      if (i > 0 && i % 2 === 1) {
        adjDeg = 5 * Math.ceil(i / 2)
      } else if (i > 0 && i % 2 === 0) {
        adjDeg = -5 * Math.ceil(i / 2)
      }
      if (i % 2 === 1) {
        length += size
      }
      let toRad = cc.degreesToRadians(toDeg + adjDeg)
      let data = {
        speed: 100,
        ebType: 'ebStraight',
        size: size,
        x: Math.cos(toRad) * length,
        y: Math.sin(toRad) * length
      }
      dataList.push(data)
    }
    return dataList
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});