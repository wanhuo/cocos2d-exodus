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
 * @version of cocos2d is 3.4
 *
 */

Chapter = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function(index) {
    this._super(resources.main.tutorial.json, resources.main.tutorial.atlas, 1.0, Game);

    /**
     *
     * 
     *
     */
    this.parameters = {
      index: index,
      state: 0,
      states: {
        up: 1,
        down: 2,
        animation: 3,
        normal: 4
      },
      animations: {
        create: {
          index: 1,
          name: 'create',
          time: 1.0,
          loop: false
        },
        destroy: {
          index: 2,
          name: 'destroy',
          time: 1.0,
          loop: false
        },
        animation1: {
          index: 3,
          name: 'animation-1',
          time: 1.0,
          loop: false
        },
        animation2: {
          index: 4,
          name: 'animation-2',
          time: 1.0,
          loop: true
        },
        animation3: {
          index: 5,
          name: 'animation-3',
          time: 1.0,
          loop: true
        }
      }
    };

    /**
     *
     *
     *
     */
    this.create().setLocalZOrder(1000);

    /**
     *
     *
     *
     */
    this.text = new Text('tutorial', Game);

    /**
     *
     *
     *
     */
    this.template = new Text('tutorial-chapter-' + this.parameters.index);

    /**
     *
     *
     *
     */
    this.text.setLocalZOrder(1001);

    /**
     *
     *
     *
     */
    Game.parameters.tutorial.state = Game.parameters.state;

    /**
     *
     *
     *
     */
    this.destroy = function(parameter) {

      /**
       *
       *
       *
       */
      if(parameter === true) {

        /**
         *
         *
         *
         */
        return this.changeState(this.parameters.states.down);
      }

      /**
       *
       *
       *
       */
      return Entity.prototype.destroy.call(this, parameter);
    }.bind(this);
  },

  /**
   *
   *
   *
   */
  onCreate: function() {

    /**
     *
     * 
     *
     */
    this.setSkin(this.parameters.index);

    /**
     *
     * 
     *
     */
    this._super();

    /**
     *
     * 
     *
     */
    this.setAnimation(this.parameters.animations.animation1);
    this.setAnimation(this.parameters.animations.animation2);
    this.setAnimation(this.parameters.animations.animation3);

    /**
     *
     * 
     *
     */
    this.changeState(this.parameters.states.up);
  },
  onDestroy: function() {
    this._super();
  },

  /**
   *
   * 
   *
   */
  onAction: function() {
    switch(this.parameters.state) {
      case this.parameters.states.animation:

      /**
       *
       *
       *
       */
      this.text.format([this.template.getString()]);

      /**
       *
       *
       *
       */
      this.changeState(this.parameters.states.normal);

      /**
       *
       *
       *
       */
      if(this.parameters.animation) {

        /**
         *
         *
         *
         */
        clearInterval(this.parameters.animation);

        /**
         *
         *
         *
         */
        this.parameters.animation = false;
      }
      break;
      case this.parameters.states.normal:

      /**
       *
       *
       *
       */
      Game.onTutorial(true);

      /**
       *
       *
       *
       */
      this.destroy(true);
      break;
    }
  },

  /**
   *
   * 
   *
   */
  onUp: function() {

    /**
     *
     * 
     *
     */
    this.setAnimation(this.parameters.animations.create);
  },
  onDown: function() {

    /**
     *
     * 
     *
     */
    this.setAnimation(this.parameters.animations.destroy);

    /**
     *
     * 
     *
     */
    this.text.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.FadeOut.create(0.2)
        ),
        cc.CallFunc.create(this.text.destroy, this.text, Entity.destroy.complete)
      )
    );
  },
  onAnimation: function() {

    /**
     *
     * 
     *
     */
    this.text.create();
    this.text.setHorizontalAlignment(0);
    this.text.setColor(this.template.color);
    this.text.setDimensions(Camera.width - 275 * 1.1, Camera.height);

    /**
     *
     * 
     *
     */
    this.text.x = Camera.center.x + 275 / 2;
    this.text.y = 170;

    /**
     *
     * 
     *
     */
    this.text.format(['']);

    /**
     *
     * 
     *
     */
    this.parameters.count = 1;

    /**
     *
     * 
     *
     */
    this.parameters.animation = setInterval(function() {

      /**
       *
       * 
       *
       */
      this.parameters.count++;

      /**
       *
       * 
       *
       */
      this.text.format([this.template.getString().substring(0, this.parameters.count)]);

      /**
       *
       * 
       *
       */
      if(this.parameters.count > this.template.getString().length) {

        /**
         *
         *
         *
         */
        if(this.parameters.animation) {

          /**
           *
           *
           *
           */
          clearInterval(this.parameters.animation);

          /**
           *
           *
           *
           */
          this.parameters.animation = false;

          /**
           *
           *
           *
           */
          this.changeState(this.parameters.states.normal);
        }
      }
    }.bind(this), 40);
  },
  onNormal: function() {
  },

  /**
   *
   * 
   *
   */
  onAnimationFinish: function(index) {
    if(this._super(index)) {
      switch(index) {
        case this.parameters.animations.animation1.index:
        if(this.parameters.state === this.parameters.states.animation) {
          this.setAnimation(this.parameters.animations.animation1);
        }
        break;
        case this.parameters.animations.create.index:
        this.changeState(this.parameters.states.animation);
        break;
        case this.parameters.animations.destroy.index:

        /**
         *
         *
         *
         */
        this.destroy(Entity.destroy.complete);
        break;
      }
    }

    /**
     *
     *
     *
     */
    return true;
  },

  /**
   *
   * 
   *
   */
  changeState: function(state) {
    if(this.parameters.state === state) return false;

    /**
     *
     *
     *
     */
    this.parameters.state = state;

    /**
     *
     *
     *
     */
    switch(this.parameters.state) {
      case this.parameters.states.up:
      this.onUp();
      break;
      case this.parameters.states.down:
      this.onDown();
      break;
      case this.parameters.states.animation:
      this.onAnimation();
      break;
      case this.parameters.states.normal:
      this.onNormal();
      break;
    }
  },

  /**
   *
   *
   *
   */
  setAnimation: function(animation) {
    this._super(animation.index, animation.name, animation.loop);
  }
});
