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
  ctor: function(file, horizontal, vertical, vector, position, anchor, bind) {
    this._super(file, horizontal, vertical);

    /**
     *
     *
     *
     */
    this.setNeedScheduleUpdate(true);

    /**
     *
     *
     *
     */
    if(vector) {
      this.vector = {
        x: 0,
        y: 0,
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
        }
      };
    } else {
      if(!this.parameters.size) {
        this.parameters.size = {
          width: false,
          height: false
        };
      }
    }

    /**
     *
     *
     *
     */
    this.bind = bind;
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
  update: function(time) {

    /**
     *
     *
     *
     */
    if(this.disabled()) return false;

    /**
     *
     *
     *
     */
    if(this.bind) {
      if(Game.parameters.state === Game.parameters.states.game && Game.backgrounds.game.getNumberOfRunningActions() > 0) {
        this.vector.x = this.vector.base.x;
      } else {
        this.vector.x = 0;
      }
    } else {
      this.vector.x = this.vector.base.x;
    }

    /**
     *
     *
     *
     */
    if(this.vector.x != 0) {
      this._super(time);
    }
  },

  /**
   *
   *
   *
   */
  deepCopy: function() {
    return new Parallax(this.textureFileName, this.frames.horizontal, this.frames.vertical, this.vector.base, this.getPosition(), this.getAnchorPoint(), this.bind);
  }
});
