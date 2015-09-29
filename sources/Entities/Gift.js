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

Gift = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.gift.json, resources.main.gift.atlas, 1.0, Finish);

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
        },
        click: {
          index: 2,
          name: 'click',
          loop: false
        }
      },
      skin: false,
      skins: {
        standart: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9'
        ],
        additional: [
          '10',
          '11',
          '12'
        ]
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
    this.setSkin(this.parameters.skins.standart.random());

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
    this.x = Camera.center.x;
    this.y = 150;

    /**
     *
     *
     *
     */
    this.scale = 0;

    /**
     *
     *
     *
     */
    this.parameters.enable = true;

    /**
     *
     *
     *
     */
    this.setAnimation(this.parameters.animations.animation.index, this.parameters.animations.animation.name, this.parameters.animations.animation.loop);

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(1.0),
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        )
      )
    );
  },
  onDestroy: function() {
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
    this.setSkin(this.parameters.skins.standart.random());
  },

  /**
   *
   *
   *
   */
  onTouchStart: function() {
    if(!this.parameters.enable) return false;

    /**
     *
     *
     *
     */
    this.runAction(
      cc.ScaleTo.create(0.2, 0.8)
    );
  },
  onTouchFinish: function(touch, e) {
    if(!this.parameters.enable) return false;

    /**
     *
     *
     *
     */
    this.stopAllActions();
    this.setScale(1.0);

    /**
     *
     *
     *
     */
    if(!touch) return false;
    if(!this.parameters.enable) return false;

    /**
     *
     *
     *
     */
    Sound.play(resources.main.sound.touch);
    Sound.play(resources.main.sound.gift);

    /**
     *
     *
     *
     */
    this.parameters.enable = false;

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.Repeat.create(
          cc.Sequence.create(
            cc.ScaleTo.create(0.05, 0.8),
            cc.ScaleTo.create(0.05, 1.1)
          ),
          12
        ),
        cc.ScaleTo.create(0.05, 1.0),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.setSkin(this.parameters.skins.additional.random());

          /**
           *
           *
           *
           */
          switch(this.parameters.skin) {
            case '10':
            Counter.values.coins.current = 10;
            break;
            case '11':
            Counter.values.coins.current = 20;
            break;
            case '12':
            Counter.values.coins.current = 30;
            break;
          }
        }.bind(this)),
        cc.DelayTime.create(1.0),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          Game.parameters.scheduler++;

          /**
           *
           *
           *
           */
          Finish.hide(function() {

            /**
             *
             *
             *
             */
            Finish.show(true);

            /**
             *
             *
             *
             */
            Game.parameters.scheduler--;
          });
        })
      )
    );
  },

  /**
   *
   *
   *
   */
  setSkin: function(skin) {
    this._super(skin);

    /**
     *
     *
     *
     */
    this.parameters.skin = skin;
  }
});
