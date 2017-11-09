cc.Class({
  extends: cc.Component,

  properties: {
    target: cc.Node
  },

  // use this for initialization
  onLoad() {
    this.streak = this.node.getComponent(cc.MotionStreak);
    this.deleteAction = cc.sequence(cc.delayTime(2), cc.callFunc(()=>{
      // cc.log('ss-real-end');
      if (this.node.parent) {
        this._backToPool();
      }
    }, this));

  },

  reuse(katana) {
    this.target = katana;
    this.isEnd = false;
    if (this.streak) {
      this.streak.reset();
    }
  },

  unuse() {
  },

  lateUpdate(dt) {
    if (this.isEnd) {
      return;
    }
    this.node.position = this.target.position;
  },

  setPool(pool) {
    this._pool = pool;
  },

  slashEnd() {
    // cc.log('ss-end');
    this.isEnd = true;
    this.node.runAction(this.deleteAction);
  },

  slashEndImmediately() {
    this.streak.reset();
  },
  
  _backToPool(){
    if (this._pool) {
      this._pool.put(this.node);
    }
  }
});
