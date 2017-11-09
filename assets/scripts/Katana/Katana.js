import PrefabNodePool from '../core/PrefabNodePool';
import { messagePipeline } from '../core/MessagePipeline'

cc.Class({
  extends: cc.Component,

  properties: {
    streakPrefab: cc.Prefab
  },

  // use this for initialization
  onLoad: function () {
    this.streakPool = new PrefabNodePool(this.streakPrefab, 5, 5, 'KatanaStreak');
    messagePipeline.on('onCreateNewRoom', this._onCreateNewRoom, this);
  },

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
  slash() {
    this.streak = this.streakPool.get(this.node);
    this.streak.parent = this.node.parent;
    this.streak.position = this.node.position;
  },

  slashEnd() {
    if (this.streak) {
      this.streak.getComponent('KatanaStreak').slashEnd();
    }
    messagePipeline.sendMessage('onSlashEnd', this.node.position);
  },

  _onCreateNewRoom() {
    if (this.streak) {
      this.streak.getComponent('KatanaStreak').slashEndImmediately();
    }
  }
});
