import {
  messagePipeline
} from 'MessagePipeline'
import ESStraight from '../EnemySpawn/ESStraight'
import ESVshaped from '../EnemySpawn/ESVshaped'
import ESRound from '../EnemySpawn/ESRound'
import ESMass from '../EnemySpawn/ESMass'

cc.Class({
  extends: cc.Component,

  properties: {
    esStraight: ESStraight,
    esVshaped: ESVshaped,
    esRound: ESRound,
    esMass: ESMass,
    mochiNode: cc.Node,
    enemyPrefab: cc.Prefab,
    initialPool: 50,
    addPool: 10
  },

  // use this for initialization
  onLoad: function () {
    messagePipeline.on('onLevelUp', this._onLevelUp, this)
    messagePipeline.on('onReset', this._onReset, this)
    this.mochi = this.mochiNode.getComponent('Mochi')

    this.isGameStart = false

    this.gameTimer = 0
    this.enemySpawnTimer = 0
    this.enemySpawnInterval = 2
    this.enemySpeedBase = 100

    this.testSpawnTime = 0

    this._enemyPool = new cc.NodePool('Enemy');
    this.extendEnemyPool(this.initialPool);
  },

  _onReset() {
    this.isGameStart = true

    this.gameTimer = 0
    this.enemySpawnTimer = 0
    this.enemySpawnInterval = 2
    this.enemySpeedBase = 100

    this.testSpawnTime = 0

    this.node.children.forEach(function (child) {
      let enemy = child.getComponent('Enemy')
      if (enemy) {
        enemy.deleteEnemy()
      }
    }, this)
  },

  extendEnemyPool(size) {
    for (let i = 0; i < size; i++) {
      let enemy = cc.instantiate(this.enemyPrefab);
      enemy.on('onEnemyDelete', this.onEnemyDelete, this);
      enemy.on('onEaten', this.onEaten, this)
      enemy.on('onHit', this.onHit, this)
      enemy.getComponent('Enemy').mochiNode = this.mochiNode
      this._enemyPool.put(enemy);
    }
  },

  onEnemyDelete(event) {
    let enemy = event.detail;
    this._enemyPool.put(enemy);
  },

  _onLevelUp(event) {
    let level = event.getUserData()
    this.enemySpawnInterval = Math.max(this.enemySpawnInterval - 0.05, 0.5)
    // this.enemySpeedBase = Math.min(200, this.enemySpeedBase + 5)
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    if (!this.isGameStart) {
      return
    }
    this.gameTimer += dt
    this.enemySpawnTimer += dt
    if (this.enemySpawnTimer >= this.enemySpawnInterval) {
      this.enemySpawnTimer -= this.enemySpawnInterval

      let dataList = []
      if (this.testSpawnTime % 7 === 0) {
        dataList = this.esRound.spawnData(12, 'ebStraight', {})
      } else if (this.testSpawnTime % 7 === 1) {
        dataList = this.esRound.spawnData(12, 'ebRotate', {
          rotateSpeed: 60,
          accelerate: 2
        })
      } else if (this.testSpawnTime % 7 === 2) {
        dataList = this.esRound.spawnData(12, 'ebClockRotate', {
          rotateSpeed: -40,
          accelerate: 2,
          rotateTime: 0.3,
          straightTime: 0.3
        })
      } else if (this.testSpawnTime % 7 === 3) {
        dataList = this.esVshaped.spawnData(7)
      } else if (this.testSpawnTime % 7 === 4) {
        dataList = this.esStraight.spawnData(15, 0)
      } else if (this.testSpawnTime % 7 === 5) {
        dataList = this.esStraight.spawnData(7, -8)
      } else if (this.testSpawnTime % 7 === 6) {
        dataList = this.esStraight.spawnData(7, 8)
      }
      let tmp1 = {
        speed: 100,
        ebType: 'ebStraight',
        size: 32,
        x: 350,
        y: 350
      }
      let tmp2 = {
        speed: 20,
        ebType: 'ebRotate',
        size: 32,
        x: 350,
        y: 350,
        rotateSpeed: -60,
        accelerate: 2
      }
      let tmp3 = {
        speed: 300,
        ebType: 'ebClockRotate',
        size: 32,
        x: 350,
        y: 350,
        rotateSpeed: 50,
        rotateTime: 1,
        straightTime: 0.3
      }
      this.spawner(dataList)
      this.testSpawnTime += 1

    }
  },

  // data: speed, x, y, size(width = height), behaviorType, etc behaviorData...
  spawner(dataList) {
    dataList.forEach(function (data) {
      let enemy = null;
      if (this._enemyPool.size() === 0) {
        this.extendEnemyPool(this.addPool);
      }
      enemy = this._enemyPool.get(data);
      enemy.parent = this.node;
    }, this);
  },

  onEaten(event) {
    this.mochi.eat(event.detail.node.width)
  },

  onHit(event) {
    this.mochi.blacken()
  }
});