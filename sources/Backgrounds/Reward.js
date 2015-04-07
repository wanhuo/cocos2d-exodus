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

Reward = Popup.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(cc.color(132, 209, 200));

    /**
     *
     *
     *
     */
    Reward = this;

    /**
     *
     *
     *
     */
    this.parameters = {
      coins: {
        time: {
          current: 0,
          elapsed: 0
        }
      }
    };

    /**
     *
     *
     *
     */
    this.coins = new Manager(10, new Entity(resources.main.reward.coin), this, true);

    /**
     *
     *
     *
     */
    this.textes = {
      coins: new Text('reward-coins', this)
    };

    /**
     *
     *
     *
     */
    this.elements = {
      hide: new Entity(resources.main.reward.pig.hide, this),
      hand: new Entity(resources.main.reward.hand, this),
      decoration: new Entity(resources.main.reward.decorations[0], this),
      pig: new Entity(resources.main.reward.pig.texture, this)
    };

    /**
     *
     *
     *
     */
    this.elements.pig.anchorY = 0;
    this.elements.hide.anchorY = -this.elements.pig.height / this.elements.hide.height;

    /**
     *
     *
     *
     */
    this.elements.pig.setLocalZOrder(1);
    this.elements.hand.setLocalZOrder(1);

    /**
     *
     *
     *
     */
    this.elements.hand.create().attr({
      x: Camera.center.x + 20,
      y: Camera.height - this.elements.hand.height / 2
    });
    this.elements.decoration.create().attr({
      x: Camera.center.x + 10,
      y: 60
    });
    this.elements.pig.create().attr({
      x: Camera.center.x,
      y: 140 - this.elements.pig.height / 2
    });
    this.elements.hide.create().attr({
      x: Camera.center.x,
      y: 140 - this.elements.pig.height / 2
    });

    /**
     *
     *
     *
     */
    this.textes.coins.create().attr({
      x: Camera.center.x,
      y: Camera.center.y
    });
  },

  /**
   *
   *
   *
   */
  onEnter: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.scheduleUpdate();

    /**
     *
     *
     *
     */
    Splurge.pauseSchedulerAndActions();

    /**
     *
     *
     *
     */
    this.updateTextData();

    /**
     *
     *
     *
     */
    this.elements.hand.y = Camera.height + this.elements.hand.height / 2;
    this.elements.hand.runAction(
      cc.EaseSineInOut.create(
        cc.MoveTo.create(0.2, {
          x: this.elements.hand.x,
          y: Camera.height - this.elements.hand.height / 2
        })
      )
    );
  },
  onExit: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.unscheduleUpdate();

    /**
     *
     *
     *
     */
    Splurge.resumeSchedulerAndActions();
  },


  /**
   *
   *
   *
   */
  show: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.FadeIn.create(0.2)
        )
      )
    );
  },
  hide: function() {

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.FadeOut.create(0.2)
        ),
        cc.CallFunc.create(this.hide, this)
      )
    );
  },


  /**
   *
   *
   *
   */
  updateTextData: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.textes.coins.format(['10 000']);
  },

  /**
   *
   *
   *
   */
  update: function(time) {
    this._super(time);

    /**
     *
     *
     *
     */
    if(this.elements.hand.getNumberOfRunningActions() > 0) return;

    /**
     *
     *
     *
     */
    this.parameters.coins.time.elapsed += time;
    if(this.parameters.coins.time.elapsed >= this.parameters.coins.time.current) {
      this.parameters.coins.time.current = random(0.0, 0.5);
      this.parameters.coins.time.elapsed = 0;

      /**
       *
       *
       *
       */
      var element = this.coins.create();

      /**
       *
       *
       *
       */
      element.x = Camera.center.x;
      element.y = Camera.height - 310;

      /**
       *
       *
       *
       */
      element.runAction(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.MoveTo.create(random(0.5, 1.0), {
              x: element.x - 10,
              y: this.elements.pig.y + this.elements.pig.height / 2
            })
          ),
          cc.CallFunc.create(element.destroy, element),
          cc.CallFunc.create(function() {

            /**
             *
             *
             *
             */
            this.stopAllActions();

            /**
             *
             *
             *
             */
            this.scale = 0.95;

            /**
             *
             *
             *
             */
            this.runAction(
              cc.Sequence.create(
                cc.EaseSineInOut.create(
                  cc.ScaleTo.create(0.2, 1.0)
                )
              )
            );
          }.bind(this.elements.pig))
        )
      );
    }

    /**
     *
     *
     *
     */
    this.elements.hide.scale = this.elements.pig.scale;
  },
});
