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

Character = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.character.json, resources.main.character.atlas, 0.5, Game.backgrounds.game);

    /**
     *
     * Setting up element size because of bug in cocos2d-x native,
     * accordint to setup spine element size,
     *
     */
    if(cc.sys.isNative) {
      this.width = 477 * 0.5;
      this.height = 145 * 0.5;
    } else {
      this.width *= 0.5;
      this.height *= 0.5;
    }

    /**
     *
     * 
     *
     */
    this.parameters = {
      element: false,
      state: 0,
      states: {
        normal: 1,
        jump: 2,
        prepare: 3,
        destroy: 4
      },
      animations: {
        stay: {
          index: 1,
          name: 'stay',
          time: 1.0,
          loop: false
        },
        power: {
          index: 2,
          name: 'power',
          time: 1.0,
          loop: false
        },
        jump: {
          index: 3,
          name: 'jump',
          time: 1.0,
          loop: false
        }
      },
      skins: [
        '1'
      ],
      vector: {
        x: 0,
        y: 0
      },
      speed: {
        x: 0,
        y: 0,
        setup: {
          x: 1600,
          y: 2000
        }
      },
      gravity: {
        x: 0,
        y: 5.0
      }
    };

    /**
     *
     * 
     *
     */
    this.energy = new Entity(resources.main.character.energy, Game.backgrounds.game);

    /**
     *
     * 
     *
     */
    this.setLocalZOrder(10);
    this.energy.setLocalZOrder(9);
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
    this.changeState(this.parameters.states.normal);
  },
  onDestroy: function() {
    this._super();

    /**
     *
     *
     *
     */
    Counter.onDeath();

    /**
     *
     *
     *
     */
    Game.changeState(Game.parameters.states.loss);

    /**
     *
     *
     *
     */
    Sound.play(resources.main.sound.character.destroy);
  },

  /**
   *
   * 
   *
   */
  onAnimationFinish: function(index) {
    if(this._super(index)) {

      /**
       *
       *
       *
       */
      switch(index) {
        case this.parameters.animations.jump.index:
        case this.parameters.animations.stay.index:
        if(this.parameters.state === this.parameters.states.normal) {
          this.setAnimation(this.parameters.animations.stay.index, this.parameters.animations.stay.name, false);
        }
        break;
        case this.parameters.animations.power.index:
        if(this.parameters.state === this.parameters.states.prepare) {
          this.setAnimation(this.parameters.animations.power.index, this.parameters.animations.power.name, false);
        }
        break;
      }
    }
  },

  /**
   *
   * 
   *
   */
  onNormal: function() {

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
    this.setAnimation(this.parameters.animations.stay.index, this.parameters.animations.stay.name, false);

    /**
     *
     *
     *
     */
    if(Game.parameters.state != Game.parameters.states.game) return false;

    /**
     *
     *
     *
     */
    Game.backgrounds.game.runAction(
      cc.EaseSineInOut.create(
        cc.MoveTo.create(0.2, {
          x: -this.x + 100,
          y: 0
        })
      )
    );
  },
  onJump: function() {

    /**
     *
     *
     *
     */
    Counter.onJump();

    /**
     *
     *
     *
     */
    this.parameters.element.onSink();

    /**
     *
     *
     *
     */
    this.parameters.speed.x = this.parameters.speed.setup.x;
    this.parameters.speed.y = this.parameters.speed.setup.y;

    /**
     *
     *
     *
     */
    this.parameters.vector.x = this.energy.getScale();
    this.parameters.vector.y = this.energy.getScale();

    /**
     *
     * 
     *
     */
    this.setAnimation(this.parameters.animations.jump.index, this.parameters.animations.jump.name, false);

    /**
     *
     *
     *
     */
    Sound.play(resources.main.sound.character.jump);
  },
  onPrepare: function() {

    /**
     *
     *
     *
     */
    this.energy.x = this.x;
    this.energy.y = this.y + this.height / 2;

    /**
     *
     * 
     *
     */
    this.setAnimation(this.parameters.animations.power.index, this.parameters.animations.power.name, false);
  },

  /**
   *
   * 
   *
   */
  onTouchBegan: function(touch, e) {
    if(this.parameters.state != this.parameters.states.normal) return false;

    /**
     *
     *
     *
     */
    this.energy.stopAllActions();

    /**
     *
     *
     *
     */
    this.energy.create().setScale(0);
    this.energy.create().setOpacity(0);

    /**
     *
     *
     *
     */
    this.energy.runAction(
      cc.RepeatForever.create(
        cc.Sequence.create(
          cc.ScaleTo.create(0.5, 1.0),
          cc.ScaleTo.create(0.5, 0.0)
        )
      )
    );
    this.energy.runAction(
      cc.RepeatForever.create(
        cc.Sequence.create(
          cc.FadeIn.create(0.5),
          cc.FadeOut.create(0.5)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.changeState(this.parameters.states.prepare);
  },
  onTouchEnded: function(touch, e) {
    if(this.parameters.state != this.parameters.states.prepare) return false;

    /**
     *
     *
     *
     */
    this.energy.destroy();

    /**
     *
     *
     *
     */
    this.changeState(this.parameters.states.jump);
  },

  /**
   *
   * 
   *
   */
  setElement: function(element, correction) {

    /**
     *
     * 
     *
     */
    this.parameters.element = element;

    /**
     *
     *
     *
     */
    this.parameters.element.onSink();

    /**
     *
     * 
     *
     */
    if(correction) {
      this.x = element.x;
    }
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
      case this.parameters.states.normal:
      this.onNormal();
      break;
      case this.parameters.states.jump:
      this.onJump();
      break;
      case this.parameters.states.prepare:
      this.onPrepare();
      break;
    }
  },

  /**
   *
   *
   *
   */
  collideWith: function(element) {

    /**
     *
     *
     *
     */
    if(this.parameters.element) {
      if(this.parameters.element.equal(element)) {
        return false;
      }
    }

    /**
     *
     *
     *
     */
    if(this.x > element.x - element.width / 2 && this.x < element.x + element.width / 2) {
      if(this.y > element.y && this.y < element.y + element.height / 2) {
        return true;
      }
    }

    /**
     *
     *
     *
     */
    return false;
  },

  /**
   *
   *
   *
   */
  updateNormal: function(time) {
  },
  updatePrepare: function(time) {
  },
  updateJump: function(time) {

    /**
     *
     *
     *
     */
    this.parameters.vector.x -= this.parameters.gravity.x * time;
    this.parameters.vector.y -= this.parameters.gravity.y * time;

    /**
     *
     *
     *
     */
    this.x += this.parameters.vector.x * this.parameters.speed.x * time;
    this.y += this.parameters.vector.y * this.parameters.speed.y * time;

    /**
     *
     *
     *
     */
    for(var i = 0; i < Game.elements.boxes.count().count; i++) {
      var element = Game.elements.boxes.get(i);

      if(this.collideWith(element)) {
        this.setElement(element);
        this.changeState(this.parameters.states.normal);

        /**
         *
         *
         *
         */
        Game.elements.counter.count();

        /**
         *
         *
         *
         */
        Sound.play(resources.main.sound.character.landing);
      }
    }
  },

  /**
   *
   *
   *
   */
  updateStates: function(time) {

    /**
     *
     *
     *
     */
    switch(this.parameters.state) {
      case this.parameters.states.normal:
      this.updateNormal(time);
      break;
      case this.parameters.states.jump:
      this.updateJump(time);
      break;
      case this.parameters.states.prepare:
      this.updatePrepare(time);
      break;
    }

    /**
     *
     *
     *
     */
    switch(this.parameters.state) {
      case this.parameters.states.normal:
      case this.parameters.states.prepare:

      /**
       *
       *
       *
       */
      if(this.parameters.element) {
        this.y = this.parameters.element.y + this.parameters.element.height / 2;
      }
      break;
    }

    /**
     *
     *
     *
     */
    if(this.y < -this.height / 2) {
      this.destroy();
    }
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
    this.updateStates(time);
  }
});
