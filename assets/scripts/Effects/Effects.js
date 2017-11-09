import PrefabNodePool from '../core/PrefabNodePool';

const Effects = cc.Class({
  extends: cc.Component,

  properties: {
    zanPrefab: cc.Prefab,
    bossDamagePrefab: cc.Prefab,
    ichigekiAnim: cc.Animation
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    Effects.instance = this;
    this.zanPool = new PrefabNodePool(this.zanPrefab, 5, 5, 'Zan');
    this.bossDamagePool = new PrefabNodePool(this.bossDamagePrefab, 10, 10, 'BossDamage');
  },

  dispZan(pos, count) {
    let zan = this.zanPool.get(count);
    zan.parent = this.node;

    pos.x = Math.max(-160, Math.min(160, pos.x));
    pos.y = Math.max(-160, Math.min(160, pos.y));
    zan.position = pos;
  },
  
  dispBossDamage(pos, count) {
    let bossDamage = this.bossDamagePool.get(count);
    bossDamage.parent = this.node;

    bossDamage.x = Math.max(-160, Math.min(160, pos.x));
    bossDamage.y = Math.max(-160, Math.min(160, pos.y));
    bossDamage.position = pos;
  },

  dispIchigeki() {
    this.ichigekiAnim.play();
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

export default Effects;
