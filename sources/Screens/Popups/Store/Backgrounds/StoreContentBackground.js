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

StoreContentBackground = StoreBackground.extend({

  /**
   *
   *
   *
   */
  ctor: function(index) {
    this._super();

    /**
     *
     *
     *
     */
    this.parameters = {
      index: 0
    };

    /**
     *
     *
     *
     */
    this.backgrounds = [];

    /**
     *
     *
     *
     */
    this.buttons = {
      navigation: {
        left: new Button(resources.main.store.buttons.navigation, 1, 2, this, this.onNavigationLeft.bind(this)),
        right: new Button(resources.main.store.buttons.navigation, 1, 2, this, this.onNavigationRight.bind(this))
      }
    };

    /**
     *
     *
     *
     */
    this.buttons.navigation.left.create().attr({
      x: 50,
      y: Camera.center.y - 200
    });
    this.buttons.navigation.right.create().attr({
      x: Camera.width - 50,
      y: Camera.center.y - 200
    });

    /**
     *
     *
     *
     */
    this.buttons.navigation.left.setFlippedX(true);
    this.buttons.navigation.right.setFlippedX(false);

    /**
     *
     *
     *
     */
    this.buttons.navigation.left.register = function() {

      /**
       *
       *
       *
       */
      Button.prototype.register.call(this);

      /**
       *
       *
       *
       */
      this.visible = true;
    }.bind(this.buttons.navigation.left);
    this.buttons.navigation.right.register = function() {

      /**
       *
       *
       *
       */
      Button.prototype.register.call(this);

      /**
       *
       *
       *
       */
      this.visible = true;
    }.bind(this.buttons.navigation.right);

    /**
     *
     *
     *
     */
    this.buttons.navigation.left.unregister = function() {

      /**
       *
       *
       *
       */
      Button.prototype.unregister.call(this);

      /**
       *
       *
       *
       */
      this.visible = false;
    }.bind(this.buttons.navigation.left);
    this.buttons.navigation.right.unregister = function() {

      /**
       *
       *
       *
       */
      Button.prototype.unregister.call(this);

      /**
       *
       *
       *
       */
      this.visible = false;
    }.bind(this.buttons.navigation.right);

    /**
     *
     *
     *
     */
    var id = 0;

    /**
     *
     *
     *
     */
    Items.items[index].each(function(element) {

      /**
       *
       *
       *
       */
      this.backgrounds.push(new StoreContent(index + 1, id + 1));

      /**
       *
       *
       *
       */
      id++;
    }.bind(this));
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
    this.parameters.index = 0;

    /**
     *
     *
     *
     */
    this.onNavigation();
  },
  onExit: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.backgrounds.each(function(element) {

      /**
       *
       *
       *
       */
      element.removeFromParent();
    });
  },

  /**
   *
   *
   *
   */
  onNavigation: function() {

    /**
     *
     *
     *
     */
    this.backgrounds.each(function(element) {

      /**
       *
       *
       *
       */
      element.removeFromParent();
    });

    /**
     *
     *
     *
     */
    this.addChild(this.backgrounds[this.parameters.index]);

    /**
     *
     *
     *
     */
    if(this.parameters.index <= 0) {
      this.buttons.navigation.left.unregister();
    } else {
      this.buttons.navigation.left.register();
    }

    /**
     *
     *
     *
     */
    if(this.parameters.index >= this.backgrounds.length - 1) {
      this.buttons.navigation.right.unregister();
    } else {
      this.buttons.navigation.right.register();
    }
  },

  /**
   *
   *
   *
   */
  onNavigationLeft: function() {

    /**
     *
     *
     *
     */
    if(this.backgrounds[this.parameters.index].getNumberOfRunningActions() > 0) return false;

    /**
     *
     *
     *
     */
    if(this.buttons.navigation.left.registered()) {

      /**
       *
       *
       *
       */
      this.parameters.index--;

      /**
       *
       *
       *
       */
      this.onNavigation();
    } else {

      /**
       *
       *
       *
       */
      var time = 0;

      /**
       *
       *
       *
       */
      this.backgrounds[this.parameters.index].children.each(function(element) {

        /**
         *
         *
         *
         */
        element.runAction(
          cc.Sequence.create(
            cc.DelayTime.create(time),
            cc.EaseSineInOut.create(
              cc.MoveTo.create(0.1, {
                x: element.x + 10,
                y: element.y
              })
            ),
            cc.EaseSineInOut.create(
              cc.MoveTo.create(0.1, {
                x: element.x,
                y: element.y
              })
            )
          )
        );

        /**
         *
         *
         *
         */
        time += 0.1;
      });
    }
  },
  onNavigationRight: function() {

    /**
     *
     *
     *
     */
    if(this.backgrounds[this.parameters.index].getNumberOfRunningActions() > 0) return false;

    /**
     *
     *
     *
     */
    if(this.buttons.navigation.right.registered()) {

      /**
       *
       *
       *
       */
      this.parameters.index++;

      /**
       *
       *
       *
       */
      this.onNavigation();
    } else {

      /**
       *
       *
       *
       */
      var time = 0;

      /**
       *
       *
       *
       */
      this.backgrounds[this.parameters.index].children.each(function(element) {

        /**
         *
         *
         *
         */
        element.runAction(
          cc.Sequence.create(
            cc.DelayTime.create(time),
            cc.EaseSineInOut.create(
              cc.MoveTo.create(0.1, {
                x: element.x - 10,
                y: element.y
              })
            ),
            cc.EaseSineInOut.create(
              cc.MoveTo.create(0.1, {
                x: element.x,
                y: element.y
              })
            )
          )
        );

        /**
         *
         *
         *
         */
        time += 0.1;
      });
    }
  },

  /**
   *
   *
   *
   */
  onSwipeLeft: function() {

    /**
     *
     *
     *
     */
    this.onNavigationRight();
  },
  onSwipeRight: function() {

    /**
     *
     *
     *
     */
    this.onNavigationLeft();
  }
});
