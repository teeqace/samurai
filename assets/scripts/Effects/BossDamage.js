cc.Class({
  extends: cc.Component,

  properties: {
    damageCount: cc.Label,
    anim: cc.Animation
  },

  // use this for initialization
  onLoad: function () {
    this.anim.on('finished', this._finished, this);
  },
  
  reuse(count) {
    this.damageCount.string = count;
    this.anim.play();
  },

  _finished() {
    this._backToPool();
  },

  setPool(pool) {
    this._pool = pool;
  },

  _backToPool(){
    if (this._pool) {
      this._pool.put(this.node);
    }
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
