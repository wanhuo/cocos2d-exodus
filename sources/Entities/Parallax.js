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

Parallax = ParallaxEntity.Infinity.Entity.extend({

  /**
   *
   *
   *
   */
  ctor: function(file, horizontal, vertical, vector, position, anchor) {
    this._super(file, horizontal, vertical);

    /**
     *
     *
     *
     */
    if(vector) {
      this.vector = {
        x: vector.x,
        y: vector.y,
        base: {
          x: vector.x,
          y: vector.y
        }
      };
    }

    /**
     *
     *
     *
     */
    if(anchor) {
      this.setAnchorPoint({
        x: anchor.x,
        y: anchor.y
      });
    }

    /**
     *
     *
     *
     */
    if(position) {
      this.x = position.x;
      this.y = position.y;
    }
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
    this.checks();
  },
  onDestroy: function() {
    this._super();
  },

  /**
   *
   *
   *
   */
  checks: function() {

    /**
     *
     *
     *
     */
    if(!this.parameters) {
      this.parameters = {
        size: {
          width: false,
          height: false
        },
        blocks: {
          min: false,
          max: false
        }
      };
    } else {

      /**
       *
       *
       *
       */
      if(!this.parameters.size) {
        this.parameters.size = {
          width: false,
          height: false
        };
      }

      /**
       *
       *
       *
       */
      if(!this.parameters.blocks) {
        this.parameters.blocks = {
          min: false,
          max: false
        };
      }
    }
  },

  /**
   *
   *
   *
   */
  disabled: function() {
    return !Game.parameters.state || Game.parameters.state === Game.parameters.states.menu || Game.backgrounds.game.getNumberOfRunningActions() > 0;
  },

  /**
   *
   *
   *
   */
  fixed: function() {
    return !Game.parameters.state || Game.parameters.state === Game.parameters.states.menu || Game.backgrounds.game.getNumberOfRunningActions() > 0;
  },

  /**
   *
   *
   *
   */
  update: function(time) {
    if(!this.disabled()) {
      this._super(time);
    }
  },

  /**
   *
   *
   *
   */
  deepCopy: function() {
    return new Parallax(this.textureFileName, this.frames.horizontal, this.frames.vertical, this.vector.base, this.getPosition(), this.getAnchorPoint());
  }
});
