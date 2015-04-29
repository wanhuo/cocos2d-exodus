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

Rocket = TiledEntity.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.decorations.rocket.texture, 4, 2);

    /**
     *
     *
     *
     */
    this.parameters = {
      vector: {
        x: 0,
        y: 0
      },
      speed: {
        x: 0,
        y: 0
      },
      decorations: {
        time: {
          current: 1.0,
          elapsed: 0.0
        }
      },
      movement: {
        state: true,
        time: {
          current: 0.5,
          elapsed: 0
        }
      }
    };

    /**
     *
     *
     *
     */
    this.needScheduleUpdate = true;
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
    this.parameters.decorations.time.elapsed = 0;

    /**
     *
     *
     *
     */
    this.parameters.vector.x = 0;
    this.parameters.vector.y = 1;

    /**
     *
     *
     *
     */
    this.parameters.speed.x = random(2.0, 5.0);
    this.parameters.speed.y = random(2.0, 5.0);

    /**
     *
     *
     *
     */
    this.setRandomFrameIndex();

    /**
     *
     *
     *
     */
    this.x = random(0, Camera.width);
    this.y = 0;
  },
  onDestroy: function() {
    this._super();

    /**
     *
     *
     *
     */
    var element = Game.elements.rockets.particles[1].create();

    /**
     *
     *
     *
     */
    element.x = this.x;
    element.y = this.y;

    /**
     *
     *
     *
     */
    element.scale = 0;

    /**
     *
     *
     *
     */
    element.opacity = 255;

    /**
     *
     *
     *
     */
    element.runAction(
      cc.Spawn.create(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.ScaleTo.create(0.2, 5.0)
          ),
          cc.CallFunc.create(element.destroy, element)
        ),
        cc.Sequence.create(
          cc.DelayTime.create(0.1),
          cc.FadeOut.create(0.1)
        )
      )
    );
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
    this.parameters.movement.time.elapsed += time;
    this.parameters.decorations.time.elapsed += time;

    /**
     *
     *
     *
     */
    if(this.parameters.movement.time.elapsed >= this.parameters.movement.time.current) {
      this.parameters.movement.time.elapsed = 0;

      /**
       *
       *
       *
       */
      this.parameters.movement.state = probably(50);
    }

    /**
     *
     *
     *
     */
    if(this.parameters.decorations.time.elapsed >= this.parameters.decorations.time.current / this.parameters.speed.y) {
      this.parameters.decorations.time.elapsed = 0;

      /**
       *
       *
       *
       */
      var element = Game.elements.rockets.particles[0].create();

      /**
       *
       *
       *
       */
      element.opacity = 255;

      /**
       *
       *
       *
       */
      element.x = this.x;
      element.y = this.y;

      /**
       *
       *
       *
       */
      element.runAction(
        cc.Sequence.create(
          cc.DelayTime.create(1.0),
          cc.FadeOut.create(1.0),
          cc.CallFunc.create(element.destroy, element)
        )
      );
    }

    /**
     *
     *
     *
     */
    if(this.getNumberOfRunningActions() < 1) {

      /**
       *
       *
       *
       */
      this.parameters.vector.x += 0.01 * (this.parameters.movement.state ? 1 : -1);

      /**
       *
       *
       *
       */
      this.x += this.parameters.vector.x * this.parameters.speed.x;
      this.y += this.parameters.vector.y * this.parameters.speed.y;

      /**
       *
       *
       *
       */
      this.rotation = Math.atan2(this.parameters.vector.x * this.parameters.speed.x, this.parameters.vector.y * this.parameters.speed.y) * 180 / Math.PI;

      /**
       *
       *
       *
       */
      if(probably(0.1)) {

        /**
         *
         *
         *
         */
        this.destroy();
      } else {

        /**
         *
         *
         *
         */
        if(this.x < -this.width / 2 || this.x > Camera.width + this.width / 2 || this.y < -this.height / 2 || this.y > Camera.height + this.height / 2) {

          /**
           *
           *
           *
           */
          this.destroy();
        }
      }
    }
  },

  /**
   *
   *
   *
   */
  deepCopy: function() {
    return new Rocket;
  }
});
