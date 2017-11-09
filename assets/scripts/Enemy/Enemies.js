import PrefabNodePool from '../core/PrefabNodePool';
import { messagePipeline } from '../core/MessagePipeline';
import Game from '../Game';

const ENEMY_POS = [
  new cc.Vec2(-160, -140),
  new cc.Vec2(0, -140),
  new cc.Vec2(160, -140),

  new cc.Vec2(-80, -70),
  new cc.Vec2(80, -70),

  new cc.Vec2(-160, 0),
  new cc.Vec2(0, 0),
  new cc.Vec2(160, 0),

  new cc.Vec2(-80, 70),
  new cc.Vec2(80, 70),

  new cc.Vec2(-160, 140),
  new cc.Vec2(0, 140),
  new cc.Vec2(160, 140),
];

const BG_COLORS = [
  '#44BCFF',
  '#4462FF',
  '#8F44FF',
  '#E144FF',
  '#FF448F',
  '#FF4444',
  '#FF7144',
  '#FFAD44',
  '#FFE144',
  '#E9FF44',
  '#C3FF44',
  '#78FF44',
  '#44FF8F',
  '#44FFE9'
];

const BOSS_TYPE = [
  {
    isBoss: true,
    life: 10,
    attack: 2,
    spriteIndex: 1,
    spriteW: 130,
    spriteH: 180,
    colliderW: 80,
    colliderH: 150
  },
  {
    isBoss: true,
    life: 15,
    attack: 3,
    spriteIndex: 2,
    spriteW: 150,
    spriteH: 250,
    colliderW: 120,
    colliderH: 200
  },
  {
    isBoss: true,
    life: 20,
    attack: 4,
    spriteIndex: 3,
    spriteW: 250,
    spriteH: 350,
    colliderW: 200,
    colliderH: 280
  }
];

cc.Class({
  extends: cc.Component,

  properties: {
    enemyPrefab: cc.Prefab
  },

  // use this for initialization
  onLoad: function () {
    this._bossType = 0;
    this.enemyPool = new PrefabNodePool(this.enemyPrefab, 10, 10, 'Enemy');

    messagePipeline.on('onCreateNewRoom', this._onCreateNewRoom, this);
    messagePipeline.on('onEnemyAttackStart', this._onEnemyAttackStart, this);
  },

  _onCreateNewRoom() {
    // let eAmount = Math.floor(Math.random() * 3 + 3);
    // let eAmount = Math.floor(Math.random() * 2 + 3);
    if (Game.instance.stageCount % 5 !== 0) {
      let eAmount = 6;
      let posIndexes = [];
      for (let i = 0; i < eAmount; i++) {
        let posIndex = Math.floor(Math.random() * ENEMY_POS.length);
        while (posIndexes.indexOf(posIndex) >= 0) {
          posIndex = Math.floor(Math.random() * ENEMY_POS.length);
        }
        this.spawn(posIndex);
        posIndexes.push(posIndex);
      }
    } else {
      this.spawnBoss();
      this._bossType = (this._bossType + 1) % BOSS_TYPE.length;
    }
  },

  spawn(posIndex) {
    let enemy = this.enemyPool.get({
      isBoss: false,
      life: 1,
      attack: 1,
      spriteIndex: 0,
      spriteW: 90,
      spriteH: 110,
      colliderW: 80,
      colliderH: 90
    });
    enemy.parent = this.node;
    enemy.position = ENEMY_POS[posIndex];
  },

  spawnBoss() {
    let enemy = this.enemyPool.get(BOSS_TYPE[this._bossType]);
    enemy.parent = this.node;
    enemy.position = new cc.Vec2(0, 0);
  },

  _onEnemyAttackStart() {
    if (this.node.children.length === 0) {
      messagePipeline.sendMessage('onRoomEnd', this);
      return;
    } else {
      this.node.children.forEach(function(element) {
        let enemy = element.getComponent('Enemy');
        enemy.getComponent('Enemy').attackAction();
      }, this);
    }
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
