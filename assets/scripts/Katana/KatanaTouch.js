import { messagePipeline } from '../core/MessagePipeline'
import Katana from './Katana';
import Singitai from '../Player/Singitai';
import Game from '../Game';

const KATANA_TIME = 1.00;

const KatanaTouch = cc.Class({
  extends: cc.Component,

  properties: {
    katana: Katana
  },
  
  statics: {
    instance: null,
  },

  _onTouchBegan(event) {
    // if (Singitai.instance.getTai() < 20) {
    //   return;
    // }
    if (!Game.instance.playerTurn) {
      return;
    }
    let location = event.getLocation()
    // cc.log('_onTouchBegan')
    // cc.log(location)
    this.katana.node.setScale(1);
    this._katanaMove(location);
    this.katana.slash();
    this.slashTimes += 1;

    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this)
    this._touched = true
  },

  _finishTouch(event) {
    if (!this._touched) {
      return
    }
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this)
    this._touched = false

    this.katana.slashEnd();
    this.katana.node.setScale(0);
  },

  _onTouchEnded(event) {
    this._finishTouch(event)
    // cc.log('_onTouchEnded')
  },

  _onTouchCancel(event) {
    this._finishTouch(event)
    // cc.log('_onTouchCancel')
  },

  _onTouchMove(event) {
    let location = event.getLocation()
    this._katanaMove(location)
    // cc.log(location)
  },

  // use this for initialization
  onLoad() {
    KatanaTouch.instance = this;

    this._touched = false
    this._timer = KATANA_TIME;
    messagePipeline.on('onCreateNewRoom', this._onCreateNewRoom, this);
    this._registerEvent()
  },

  onDestroy() {
    this._unregisterEvent()
  },

  _registerEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this)
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this)
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this)
  },

  _unregisterEvent() {
    this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this)
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this)
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this)
  },

  _katanaMove(location) {
    let canvasLocation = this.node.parent.convertToNodeSpaceAR(location)
    // cc.log(canvasLocation)
    this.katana.node.position = canvasLocation
  },

  _onCreateNewRoom() {
    this.slashTimes = 0;
    this._timer = KATANA_TIME;
    Singitai.instance.setSin(1);
    this.node.emit(cc.Node.EventType.TOUCH_CANCEL);
  },

  playerTurnStart() {
    this.slashTimes = 0;
    this._timer = KATANA_TIME;
    Singitai.instance.setSin(1);
  },

  update(dt) {
    if (!this._touched) {
      return;
    }
    this._timer = Math.max(0, this._timer - dt);
    Singitai.instance.setSin(this._timer / KATANA_TIME);
    if (this._timer <= 0) {
      this.node.emit(cc.Node.EventType.TOUCH_CANCEL);
    }
  }

});

export default KatanaTouch;