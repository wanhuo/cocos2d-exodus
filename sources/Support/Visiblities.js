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

Visiblities = {

  /**
   *
   *
   *
   */
  update: function(element) {return;

    /**
     *
     *
     *
     */
    var y = Game.backgrounds.game.y;

    /**
     *
     *
     *
     */
    var condition;

    /**
     *
     *
     *
     */
    condition = y < -150 / element.parallax.scale();

    /**
     *
     *
     *
     */
    if(element.elements.ground.parent) {
      if(condition) {
        element.elements.ground.removeFromParent();
      }
    } else {
      if(!condition) {
        element.backgrounds.game.addChild(element.elements.ground);
      }
    }

    /**
     *
     *
     *
     */
    condition = y < -element.backgrounds.w.y - 150 / element.parallax.scale();

    /**
     *
     *
     *
     */
    if(element.elements.water1.parent) {
      if(condition) {
        element.elements.water1.removeFromParent();
        element.elements.water2.removeFromParent();
        element.elements.water3.removeFromParent();

        element.elements.fishes.removeFromParent();
      }
    } else {
      if(!condition) {
        element.backgrounds.w.addChild(element.elements.water3);
        element.backgrounds.w.addChild(element.elements.water2);
        element.backgrounds.w.addChild(element.elements.water1);

        element.backgrounds.w.addChild(element.elements.fishes);
      }
    }

    /**
     *
     *
     *
     */
    condition = y < -300 / element.parallax.scale();

    /**
     *
     *
     *
     */
    if(element.elements.parallaxes[4].parent) {
      if(condition) {
        element.elements.parallaxes[4].removeFromParent();
        element.elements.parallaxes[5].removeFromParent();
        element.elements.parallaxes[6].removeFromParent();
        element.elements.parallaxes[7].removeFromParent();
        element.elements.parallaxes[8].removeFromParent();
      }
    } else {
      if(!condition) {
        element.backgrounds.game.addChild(element.elements.parallaxes[4]);
        element.backgrounds.game.addChild(element.elements.parallaxes[5]);
        element.backgrounds.game.addChild(element.elements.parallaxes[6]);
        element.backgrounds.game.addChild(element.elements.parallaxes[7]);
        element.backgrounds.game.addChild(element.elements.parallaxes[8]);
      }
    }
  }
};
