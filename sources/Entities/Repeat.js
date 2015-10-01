/**
 * Tooflya Inc. Development
 *
 * @author Igor Mats from Tooflya Inc.
 * @copyright (c) 2015 by Igor Mats
 * http://www.tooflya.com/development/
 *
 *
 * License: Tooflya Inc. Software License v1.
 *
 * Licensee may not use this software for commercial purposes. For the purpose of this license,
 * commercial purposes means that a 3rd party has to pay in order to access Software or that
 * the Website that runs Software is behind a paywall. In consideration of the License granted
 * under clause 2, Licensee shall pay Licensor a fee, via Credit-Card, PayPal or any other
 * mean which Licensor may deem adequate. Failure to perform payment shall construe as material
 * breach of this Agreement. This software is provided under an AS-IS basis and without any support,
 * updates or maintenance. Nothing in this Agreement shall require Licensor to provide Licensee with
 * support or fixes to any bug, failure, mis-performance or other defect in The Software.
 *
 * @version of cocos2d is 3.5
 *
 */

Repeat = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.repeat.json, resources.main.repeat.atlas, 1.0, Credits.backgrounds.scroll);

    /**
     *
     * 
     *
     */
    this.parameters = {
      enable: true,
      animations: {
        animation: {
          index: 1,
          name: 'animation',
          loop: true
        }
      }
    };

    /**
     *
     *
     *
     */
    this.setLocalZOrder(100);

    /**
     *
     *
     *
     */
    this.width = 200;
    this.height = 200;

    /**
     *
     *
     *
     */
    this.setContentSize(this.width, this.height);

    /**
     *
     *
     *
     */
    this.needScheduleUpdate = true;

    /**
     *
     *
     *
     */
    this.register();

    /**
     *
     *
     *
     */
    Spine.prototype.onCreateTextures.call(this);
  },

  /**
   *
   *
   *
   */
  onCreate: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.setSlotsToSetupPose();
    this.setBonesToSetupPose();

    /**
     *
     *
     *
     */
    this.clearTracks();

    /**
     *
     *
     *
     */
    this.setAnimation(this.parameters.animations.animation.index, this.parameters.animations.animation.name, this.parameters.animations.animation.loop);
    this.setTimeScale(2);
  },
  onDestroy: function() {
    this._super();
  },

  /**
   *
   *
   *
   */
  onCreateTextures: function() {
  },
  onDestroyTextures: function() {
  },

  /**
   *
   *
   *
   */
  onTouchStart: function() {
    this.runAction(
      cc.ScaleTo.create(0.2, 0.8)
    );
  },
  onTouchFinish: function(touch, e) {
    this.stopAllActions();
    this.setScale(1.0);

    /**
     *
     *
     *
     */
    if(!touch) return false;

    /**
     *
     *
     *
     */
    Sound.play(resources.main.sound.touch);

    /**
     *
     *
     *
     */
    Game.runAction(
      cc.Sequence.create(
        cc.CallFunc.create(Modal.block, Modal),
        cc.DelayTime.create(0.5),
        cc.CallFunc.create(Game.onCredits, Game),
        cc.DelayTime.create(0.5),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          switch(this.parameters.state) {
            case this.parameters.states.menu:
            this.onPlay();
            break;
            defult:
            Splurge.animation3();
            break;
          }

          /**
           *
           *
           *
           */
          Modal.hide();
        }.bind(Game))
      )
    );
  }
});
