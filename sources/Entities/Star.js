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

Star = Parallax.extend({

  /**
   *
   *
   *
   */
  ctor: function(file) {
    this._super(
      file, 1, 1,
      {
        x: random(-300, 0),
        y: 0
      },
      {
        x: random(0, Camera.width),
        y: Camera.height - 180
      },
      {
        x: 0.5,
        y: 0
      }
    );

    /**
     *
     *
     *
     */
    this.vector.x = this.vector.base.x;
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
    this.parameters.size.width = random(0, Camera.width);
  },
  onDestroy: function() {
    this._super();
  },

  /**
   *
   *
   *
   */
  parallaxCorrectPosition: function() {

    /**
     *
     *
     *
     */
    this.y = random(Camera.height * (Game.parameters.backgrounds.position.ratio + 1), max(Camera.height * 2 * (Game.parameters.backgrounds.position.ratio + 1), (Game.elements ? Game.elements.character.y : 0) + Camera.height * 2));
  },

  /**
   *
   *
   *
   */
  disabled: function() {
    return !(Game.parameters.state === Game.parameters.states.game);
  },

  /**
   *
   *
   *
   */
  deepCopy: function() {
    return new Star(this.textureFileName);
  }
});
