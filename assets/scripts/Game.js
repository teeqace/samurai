import { messagePipeline } from './core/MessagePipeline'
import KatanaTouch from './Katana/KatanaTouch';
import Effects from './Effects/Effects';
import Koban from './Koban';
import StageCount from './StageCount';
import Singitai from './Player/Singitai';

const Game = cc.Class({
  extends: cc.Component,

  properties: {
    enemyNode: cc.Node
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    Game.instance = this;
    messagePipeline.on('onEnemyDie', this._onEnemyDie, this);
    messagePipeline.on('onSlashEnd', this._onSlashEnd, this);
    messagePipeline.on('onEnemyAttackEnd', this._onEnemyAttackEnd, this);
    messagePipeline.on('onEnemyAttack', this._onEnemyAttack, this);
    messagePipeline.on('onRoomEnd', this._roomEnd, this);
    this.playerTurn = false;
    this._enemyCountAtOneSlash = 0;
    this._isIchigeki = false;
    this.stageCount = 1;
  },

  _onEnemyDie() {
    this._isIchigeki = false;
    if (this.enemyNode.children.length === 0) {
      if (KatanaTouch.instance.slashTimes === 1) {
        messagePipeline.sendMessage('onPerfectBonus', this);
        // if (this._isIchigeki) {
          this._isIchigeki = true;
          Effects.instance.dispIchigeki();
          Singitai.instance.indecreaseGi(10);
          this._roomEnd();
        // }
      }
    }
    this._enemyCountAtOneSlash += 1;
  },

  _onSlashEnd(event) {
    let slashEndPosition = event.getUserData();
    if (!this._isIchigeki) {
      if (this.stageCount % 5 !== 0) {
        Effects.instance.dispZan(slashEndPosition, this._enemyCountAtOneSlash);
      }
    }
    Koban.instance.add(this._enemyCountAtOneSlash);
    this._enemyCountAtOneSlash = 0;
    this.playerTurn = false;

    // setTimeout(() => {
      messagePipeline.sendMessage('onEnemyAttackStart', this);
    // }, 0.1);
  },

  _onEnemyAttackEnd() {
    if (!this.playerTurn) {
      this.playerTurnStart();
    }
    if (this.enemyNode.children.length === 0) {
      this._roomEnd();
    }
  },

  _roomEnd() {
    messagePipeline.sendMessage('onMoveNextRoom', this);
    this.stageCount += 1;
    StageCount.instance.disp(this.stageCount);


    this.playerTurnStart();
  },
  
  playerTurnStart() {
    this._isIchigeki = false;
    this.playerTurn = true;
    KatanaTouch.instance.playerTurnStart();
  },

  _onEnemyAttack(event) {
    let damage = event.getUserData();
    Singitai.instance.indecreaseTai(-damage);
  }

  

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

export default Game;