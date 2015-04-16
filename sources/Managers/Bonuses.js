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

Bonuses = cc.Class.extend({

  /**
   *
   *
   *
   */
  ctor: function() {

    /**
     *
     *
     *
     */
    Bonuses = this;

    /**
     *
     *
     *
     */
    this.elements = [];

    /**
     *
     *
     *
     */
    for(var i = 0; i < properties.bonuses.length; i++) {

      /**
       *
       *
       *
       */
      var button = new Bonus(resources.main.bonuses[i]);

      /**
       *
       *
       *
       */
      button.action = this.onActivate.bind(button);

      /**
       *
       *
       *
       */
      this.elements.push(button);
    }
  },

  /**
   *
   *
   *
   */
  create: function() {

    /**
     *
     *
     *
     */
    this.states = [];

    /**
     *
     *
     *
     */
    var count = 1;

    /**
     *
     *
     *
     */
    var time = 1.0;

    /**
     *
     *
     *
     */
    for(var i = 0; i < properties.bonuses.length; i++) {

      /**
       *
       *
       *
       */
      if(Data.get(false, properties.bonuses[i]) > 0) {

        /**
         *
         *
         *
         */
        var element = this.elements[i].create();

        /**
         *
         *
         *
         */
        element.opacity = 0;

        /**
         *
         *
         *
         */
        element.x = Camera.center.x + (count == 2 ? 42 : 0);
        element.y = Camera.center.y - 35 - 50;

        /**
         *
         *
         *
         */
        element.runAction(
          cc.Sequence.create(
            cc.DelayTime.create(time),
            cc.CallFunc.create(function(el) {

              /**
               *
               *
               *
               */
              for(var i = this.elements.indexOf(el) - 1; i >= 0; i--) {

                /**
                 *
                 *
                 *
                 */
                var el = this.elements[i];

                /**
                 *
                 *
                 *
                 */
                if(el.state.create) {

                  /**
                   *
                   *
                   *
                   */
                  el.runAction(
                    cc.EaseSineInOut.create(
                      cc.MoveTo.create(0.1, {
                        x: el.x + (count % 2 == 0 ? 42 : 42) * (el.x > Camera.center.x ? 1 : -1),
                        y: el.y
                      })
                    )
                  );
                }
              }
            }.bind(this, element)),
            cc.Spawn.create(
              cc.EaseSineInOut.create(
                cc.FadeIn.create(0.25)
              ),
              cc.EaseSineInOut.create(
                cc.MoveTo.create(0.25, {
                  x: element.x,
                  y: element.y + 50
                })
              )
            )
          )
        );

        /**
         *
         *
         *
         */
        time += 0.25;

        /**
         *
         *
         *
         */
        count++;
      }
    }
  },
  destroy: function() {

    /**
     *
     *
     *
     */
    var time = 0.0;

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
      if(element.state.create && element.getNumberOfRunningActions() < 1) {

        /**
         *
         *
         *
         */
        element.runAction(
          cc.Spawn.create(
            cc.Sequence.create(
              cc.DelayTime.create(time),
              cc.FadeOut.create(0.1),
              cc.CallFunc.create(element.destroy, element)
            ),
            cc.Sequence.create(
              cc.DelayTime.create(time),
              cc.MoveTo.create(0.1, {
                x: element.x,
                y: element.y - 50
              })
            )
          )
        );
      }
    });
  },

  /**
   *
   *
   *
   */
  clear: function() {

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
      if(element.state.create && element.getNumberOfRunningActions() < 1) {

        /**
         *
         *
         *
         */
        element.destroy();
      }
    });
  },

  /**
   *
   *
   *
   */
  onActivate: function() {

    /**
     *
     *
     *
     */
    var index = Bonuses.elements.indexOf(this);

    /**
     *
     *
     *
     */
    Bonuses.states[index] = true;

    /**
     *
     *
     *
     */
    Data.update(false, properties.bonuses[index], -1);

    /**
     *
     *
     *
     */
    var scale = random(1, 2);

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.BezierTo.create(0.5 * scale, [
          {
            x: this.x,
            y: this.y
          },
          {
            x: this.x + random(0, Camera.center.x) * probably(50) ? 1 : -1,
            y: this.y - random(0, Camera.center.y)
          },
          {
            x: Counter.x,
            y: Counter.y
          }
        ]),
        cc.CallFunc.create(Counter.onCount, Counter),
        cc.CallFunc.create(this.destroy, this)
      )
    );

    /**
     *
     *
     *
     */
    for(var i = 0; i < Bonuses.elements.length; i++) {

      /**
       *
       *
       *
       */
      if(i != index) {

        /**
         *
         *
         *
         */
        var element = Bonuses.elements[i];

        /**
         *
         *
         *
         */
        if(element.state.create) {

          /**
           *
           *
           *
           */
          element.runAction(
            cc.EaseSineInOut.create(
              cc.MoveTo.create(0.2, {
                x: element.x + 42 * (i < index ? 1 : -1),
                y: element.y
              })
            )
          );
        }
      }
    }
  }
});
