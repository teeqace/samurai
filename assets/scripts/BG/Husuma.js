import { messagePipeline } from '../core/MessagePipeline'
import Game from '../Game';

const Z_FRONT = 100;
const Z_BACK = 10;

cc.Class({
  extends: cc.Component,

  properties: {
    isFront: true
  },

  // use this for initialization
  onLoad: function () {
    // this.node.zIndex = this.zIndex;
    this._anim = this.node.getComponent(cc.Animation);
    this._anim.on('finished', this._animFinished, this);

    if (this.isFront) {
      this.node.zIndex = Z_FRONT;
      this._anim.play('HusumaComesOut');
    } else {
      this.node.zIndex = Z_BACK;
      this._anim.play('HusumaComesIn');
    }
    this.isFront != this.isFront;

    messagePipeline.on('onMoveNextRoom', this._onMoveNextRoom, this);
    // test
    // if (this.zIndex === 100) {
    //   this._anim.play('HusumaComesOut');
    // } else {
    //   this._anim.play('HusumaComesIn');
    // }
    // this._testtime = 0;

  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    // this.node.zIndex = this.zIndex;


    // test
    // this._testtime += dt;
    // if (this._testtime >= 3) {
    //   this._testtime = 0;
    //   if (this.zIndex === 100) {
    //     this._anim.play('HusumaComesOut');
    //   } else {
    //     this._anim.play('HusumaComesIn');
    //   }
    // }
  },

  _onMoveNextRoom() {
    if (this.isFront) {
      this._anim.play('HusumaComesOut');
    } else {
      this._anim.play('HusumaComesIn');
    }
    this.isFront != this.isFront;
  },

  comesOut() {
    this.node.zIndex = Z_BACK;
  },
  
  comesIn() {
    this.node.zIndex = Z_FRONT;
    messagePipeline.sendMessage('onCreateNewRoom', this);
  },

  _animFinished(event) {
    if (event.detail.name === 'HusumaComesIn') {
      Game.instance.playerTurnStart();
    }

  }
});
