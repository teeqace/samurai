import { messagePipeline } from '../core/MessagePipeline';
import KatanaTouch from '../Katana/KatanaTouch';
import Effects from '../Effects/Effects';

cc.Class({
  extends: cc.Component,

  properties: {
    enemySprites: {
      default: [],
      type: [cc.SpriteFrame]
    },
    collider: cc.BoxCollider,
    enemySprite: cc.Sprite,
    isBoss: false,
    life: 1,
    attack: 1
  },

  // use this for initialization
  onLoad: function () {
    this._anim = this.node.getComponent(cc.Animation);
    this._anim.on('finished', this._finished, this);
  },

  reuse(data) {
    this.killed = false;
    this.node.opacity = 255;
    this.node.setScale(1);
    this.isBoss = data.isBoss;
    this.lifeMax = data.life;
    this.life = data.life;
    this.attack = data.attack;
    this.enemySprite.spriteFrame = this.enemySprites[data.spriteIndex];
    this.node.width = data.spriteW;
    this.node.height = data.spriteH;
    this.collider.width = data.colliderW;
    this.collider.height = data.colliderH;
  },
  
  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    if (!this._timerStart) {
      return;
    }
    this._timer += dt;
    // this.node.zIndex = 50;
  },

  attackAction() {
    if (this.killed) {
      return;
    }
    if (this.isBoss) {
      this._anim.play('BossAttack');
    } else {
      this._anim.play('EnemyAttack');
    }
  },
  
  _finished() {
    if (this.killed) {
      this._backToPool();
      messagePipeline.sendMessage('onEnemyDie', this);
    }
    if (!this.killed) {
      if (!this.isBoss) {
        this._backToPool();
      }
      messagePipeline.sendMessage('onEnemyAttackEnd');
    }
  },

  onEnemyAttack() {
    messagePipeline.sendMessage('onEnemyAttack', this.attack);
  },
  
  setPool(pool) {
    this._pool = pool;
  },
  
  _backToPool(){
    if (this._pool) {
      this._pool.put(this.node);
    }
  },

  onCollisionEnter(other, self) {
    // let a = other.node.group;
    if (other.node.group === 'katana') {
      this._timer = 0;
      this._timerStart = true;
      this._katanaPos = other.node.position;
    }
  },

  onCollisionStay(other, self) {
    // let a = other.node.group;
    if (this._timer >= 1.0) {
      // this.node.destroy();
    }
  },

  onCollisionExit(other, self) {
    // let a = other.node.group;
    if (other.node.group === 'katana') {
      this._timerStart = false;
      if (this._timer <= 0.2) {
        this.life -= 1;
        if (this.isBoss) {
          Effects.instance.dispBossDamage(this._katanaPos, this.lifeMax - this.life);
        }
        if (this.life <= 0) {
          this.killed = true;
          this._anim.play('EnemyDamage');
          // this._backToPool();
        }
      }
    }
  },
});
