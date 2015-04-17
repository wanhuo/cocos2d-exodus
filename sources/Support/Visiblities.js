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
  elements: [],

  /**
   *
   *
   *
   */
  setup: function() {

    /** Generate elements visiblity rules. */

    /**
     *
     *
     *
     */
    Game.elements.backgrounds[0].visiblities = 'Game.backgrounds.g.y <= -Camera.height';
    Game.elements.backgrounds[1].visiblities = 'Game.backgrounds.g.y >= -Camera.height * 0 || Game.backgrounds.g.y <= -Camera.height * 2';
    Game.elements.backgrounds[2].visiblities = 'Game.backgrounds.g.y >= -Camera.height * 1 || Game.backgrounds.g.y <= -Camera.height * 3';
    Game.elements.backgrounds[3].visiblities = 'Game.backgrounds.g.y >= -Camera.height * 2 || Game.backgrounds.g.y <= -Camera.height * 4';

    /**
     *
     *
     *
     */
    Game.buttons.like.visiblities = 'Game.backgrounds.b.y >= 270';
    Game.buttons.sound.visiblities = 'Game.backgrounds.b.y >= 270';
    Game.buttons.leaderboard.visiblities = 'Game.backgrounds.b.y >= 270';
    Game.buttons.achievements.visiblities = 'Game.backgrounds.b.y >= 270';
    Game.buttons.store.visiblities = 'Game.backgrounds.b.y >= 270';

    /**
     *
     *
     *
     */
    Counter.text.best.visiblities = 'Game.backgrounds.b.y >= 270';
    Counter.text.jumps.visiblities = 'Game.backgrounds.b.y >= 270';
    Counter.text.deaths.visiblities = 'Game.backgrounds.b.y >= 270';

    /**
     *
     *
     *
     */
    Game.elements.water1.visiblities = 'y + Game.backgrounds.w.y < -150 / s';
    Game.elements.water2.visiblities = 'y + Game.backgrounds.w.y < -150 / s';
    Game.elements.water3.visiblities = 'y + Game.backgrounds.w.y < -150 / s';

    /**
     *
     *
     *
     */
    Game.elements.fishes.visiblities = 'y + Game.backgrounds.w.y < -150 / s';

    /**
     *
     *
     *
     */
    Game.elements.people.visiblities = 'Game.elements.people.count().count < 1';

    /**
     *
     *
     *
     */
    Game.elements.ground.visiblities = 'y < -130 / s';

    /**
     *
     *
     *
     */
    Game.elements.moon.visiblities = 'y > -Camera.height * 2';

    /**
     *
     *
     *
     */
    Game.elements.parallaxes.clouds1.visiblities = 'y < -c';
    Game.elements.parallaxes.clouds2.visiblities = 'y >= 0 || y < -c * 2';

    /**
     *
     *
     *
     */
    Game.elements.parallaxes.stars1.visiblities = 'y >= 0 || y < -c * 2';
    Game.elements.parallaxes.stars2.visiblities = 'y >= 0 || y < -c * 2';

    /**
     *
     *
     *
     */
    Game.elements.parallaxes.mountains1.visiblities = 'y < -600 / s';
    Game.elements.parallaxes.mountains2.visiblities = 'y < -600 / s';

    /**
     *
     *
     *
     */
    Game.elements.parallaxes.trees1.visiblities = 'y < -300 / s';
    Game.elements.parallaxes.trees2.visiblities = 'y < -300 / s';
    Game.elements.parallaxes.trees3.visiblities = 'y < -300 / s';

    /** Push elements. */

    /**
     *
     *
     *
     */
    this.elements.push(Game.elements.backgrounds[0]);
    this.elements.push(Game.elements.backgrounds[1]);
    this.elements.push(Game.elements.backgrounds[2]);
    this.elements.push(Game.elements.backgrounds[3]);

    /**
     *
     *
     *
     */
    this.elements.push(Game.buttons.like);
    this.elements.push(Game.buttons.sound);
    this.elements.push(Game.buttons.leaderboard);
    this.elements.push(Game.buttons.achievements);
    this.elements.push(Game.buttons.store);

    /**
     *
     *
     *
     */
    this.elements.push(Counter.text.best);
    this.elements.push(Counter.text.jumps);
    this.elements.push(Counter.text.deaths);

    /**
     *
     *
     *
     */
    this.elements.push(Game.elements.water3);
    this.elements.push(Game.elements.water2);
    this.elements.push(Game.elements.water1);

    /**
     *
     *
     *
     */
    this.elements.push(Game.elements.fishes);

    /**
     *
     *
     *
     */
    this.elements.push(Game.elements.people);

    /**
     *
     *
     *
     */
    this.elements.push(Game.elements.moon);

    /**
     *
     *
     *
     */
    this.elements.push(Game.elements.parallaxes.clouds1);
    this.elements.push(Game.elements.parallaxes.clouds2);

    /**
     *
     *
     *
     */
    this.elements.push(Game.elements.parallaxes.stars1);
    this.elements.push(Game.elements.parallaxes.stars2);

    /**
     *
     *
     *
     */
    this.elements.push(Game.elements.parallaxes.mountains1);
    this.elements.push(Game.elements.parallaxes.mountains2);

    /**
     *
     *
     *
     */
    this.elements.push(Game.elements.parallaxes.trees1);
    this.elements.push(Game.elements.parallaxes.trees2);
    this.elements.push(Game.elements.parallaxes.trees3);

    /**
     *
     *
     *
     */
    this.elements.push(Game.elements.ground);
  },

  /**
   *
   *
   *
   */
  eval: function(element) {

    /**
     *
     *
     *
     */
    var c = Camera.height * Game.parameters.backgrounds.position.ratio;

    /**
     *
     *
     *
     */
    var s = Game.parallax.scale();

    /**
     *
     *
     *
     */
    var y = Game.backgrounds.game.y;
    var x = Game.backgrounds.game.x;

    /**
     *
     *
     *
     */
    return eval(element.visiblities);
  },

  /**
   *
   *
   *
   */
  update: function() {

    /**
     *
     *
     *
     */
    this.elements.each(function(element) {

      /**
       *
       *
       *
       */
      if(element.parent) {

        /**
         *
         *
         *
         */
        if(Visiblities.eval(element)) {

          /**
           *
           *
           *
           */
          element.link = element.parent;

          /**
           *
           *
           *
           */
          element.retain();

          /**
           *
           *
           *
           */
          element.removeFromParent();
        }
      } else {

        /**
         *
         *
         *
         */
        if(!Visiblities.eval(element) && element.link) {

          /**
           *
           *
           *
           */
          element.link.addChild(element);

          /**
           *
           *
           *
           */
          element.release();
        }
      }
    })
  }
};
