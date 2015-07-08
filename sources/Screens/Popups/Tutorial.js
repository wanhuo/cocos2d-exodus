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

Tutorial = Popup.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(cc.color(122, 195, 194));

    /**
     *
     *
     *
     */
    Tutorial = this;

    /**
     *
     *
     *
     */
    this.parameters = {
      index: 0,
      popup: {
        scheduler: true
      },
      animations: {
        chapters: [
          {
            index: 1,
            name: 'step1',
            time: 0.5,
            loop: false,
            count: {
              current: 0,
              complete: 5
            }
          },
          {
            index: 2,
            name: 'step2',
            time: 0.25,
            loop: false,
            count: {
              current: 0,
              complete: 5
            }
          }
        ]
      }
    };

    /**
     *
     *
     *
     */
    this.backgrounds = {
      s: new Background(this),
      d: new Background(this)
    };

    /**
     *
     *
     *
     */
    this.backgrounds.s.setCascadeOpacityEnabled(true);
    this.backgrounds.d.setCascadeOpacityEnabled(true);

    /**
     *
     *
     *
     */
    this.elements = {
      chapters: [
        new Spine(resources.main.tutorial.tutorial.json, resources.main.tutorial.tutorial.atlas, 1.0, this.backgrounds.d),
        new Spine(resources.main.tutorial.tutorial.json, resources.main.tutorial.tutorial.atlas, 1.0, this.backgrounds.d)
      ],
      hands: [
        new AnimatedEntity(resources.main.tutorial.hand, 2, 1, this.backgrounds.d),
        new AnimatedEntity(resources.main.tutorial.hand, 2, 1, this.backgrounds.d)
      ],
      navigation: {
        backgrounds: [
          new Entity(resources.main.tutorial.navigation[0], this.backgrounds.s),
          new Entity(resources.main.tutorial.navigation[0], this.backgrounds.s)
        ],
        actions: [
          new Entity(resources.main.tutorial.navigation[1], this.backgrounds.s),
          new Entity(resources.main.tutorial.navigation[1], this.backgrounds.s)
        ]
      }
    };

    /**
     *
     *
     *
     */
    this.text = {
      play: new Text('tutorial-text-1', this.backgrounds.s),
      taps: [
        new Text('tap', this.backgrounds.d),
        new Text('tap', this.backgrounds.d)
      ],
      chapters: [
        new Text('tutorial-text-2', this.backgrounds.d),
        new Text('tutorial-text-3', this.backgrounds.d)
      ]
    };

    /**
     *
     *
     *
     */
    this.text.play.create().attr({
      x: Camera.center.x,
      y: Camera.height - 100
    });

    /**
     *
     *
     *
     */
    for(var i = 0; i < this.elements.chapters.length; i++) {

      /**
       *
       *
       *
       */
      var element = this.elements.chapters[i];

      /**
       *
       *
       *
       */
      element.create().attr({
        x: Camera.center.x + Camera.width * i,
        y: Camera.center.y
      });

      /**
       *
       *
       *
       */
      element.needScheduleUpdate = true;


      /**
       *
       *
       *
       */
      element.i = i;

      /**
       *
       *
       *
       */
      element.onAnimationStateChanged = function(target, index, type, event) {

        /**
         *
         *
         *
         */
        switch(type) {
          case 0:
          break;
          case 2:

          /**
           *
           *
           *
           */
          Tutorial.parameters.animations.chapters[this.i].count.current++;

          /**
           *
           *
           *
           */
          if(Tutorial.parameters.animations.chapters[this.i].count.current >= Tutorial.parameters.animations.chapters[this.i].count.complete) {

            /**
             *
             *
             *
             */
            Tutorial.onSwipeLeft();
          } else {

            /**
             *
             *
             *
             */
            this.setTimeScale(Tutorial.parameters.animations.chapters[this.i].time);
            this.setAnimation(Tutorial.parameters.animations.chapters[this.i].index, Tutorial.parameters.animations.chapters[this.i].name, Tutorial.parameters.animations.chapters[this.i].loop);
          }
          break;
        }

        /**
         *
         *
         *
         */
        if(event) {

          /**
           *
           *
           *
           */
          switch(event.data.name) {
            case 'step1-load':

            /**
             *
             *
             *
             */
            if(Tutorial.parameters.index == 0) {

              /**
               *
               *
               *
               */
              Sound.play(resources.main.sound.save);
            }
            break;
            case 'step2-click':

            /**
             *
             *
             *
             */
            if(Tutorial.parameters.index == 1) {

              /**
               *
               *
               *
               */
              Sound.play(resources.main.sound.counter.count.random());
            }

            /**
             *
             *
             *
             */
            Tutorial.elements.hands[1].stopAllActions();
            Tutorial.elements.hands[1].runAction(
                cc.Sequence.create(
                  cc.ScaleTo.create(0.0, 1.0),
                  cc.DelayTime.create(0.2),
                  cc.ScaleTo.create(0.0, 1.5)
                )
            );
            Tutorial.elements.hands[1].animate(0.2, 1);

            /**
             *
             *
             *
             */
            Tutorial.text.taps[1].runAction(
              cc.Sequence.create(
                cc.FadeIn.create(0.0),
                cc.DelayTime.create(0.2),
                cc.FadeOut.create(0.0)
              )
            );

            /**
             *
             *
             *
             */
            Tutorial.elements.hands[1].animationTimeElapsed = 1;
            break;
          }
        }
      };

      /**
       *
       *
       *
       */
      element.setAnimationListener(element, element.onAnimationStateChanged.bind(element));

      /**
       *
       *
       *
       */
      this.elements.hands[i].needScheduleUpdate = true;
      this.elements.hands[i].create().attr({
        x: Camera.center.x + Camera.width * i,
        y: Camera.center.y - 375
      });

      /**
       *
       *
       *
       */
      this.text.chapters[i].setAnchorPoint({
        x: 0.5,
        y: 0.0
      });

      /**
       *
       *
       *
       */
      this.text.chapters[i].create().attr({
        x: Camera.center.x + Camera.width * i,
        y: Camera.height - 290
      });

      /**
       *
       *
       *
       */
      this.text.taps[i].create().attr({
        x: Camera.center.x + Camera.width * i,
        y: Camera.center.y + 200
      });
      this.text.taps[i].setLocalZOrder(100);

      /**
       *
       *
       *
       */
      this.elements.navigation.backgrounds[i].create().attr({
        x: Camera.center.x + 25 * (i === 0 ? -1 : 1),
        y: 50
      });

      /**
       *
       *
       *
       */
      this.elements.navigation.actions[i].create().attr({
        x: Camera.center.x + 25 * (i === 0 ? -1 : 1),
        y: 50,
        scale: 0
      });
    }

    /**
     *
     *
     *
     */
    this.elements.hands[1].y += 100;
    this.elements.hands[1].scale = 1.5;

    /**
     *
     *
     *
     */
    this.elements.hands[0].animate(0.1);

    /**
     *
     *
     *
     */
    this.text.taps[0].runAction(
      cc.RepeatForever.create(
        cc.Sequence.create(
          cc.FadeIn.create(0.0),
          cc.DelayTime.create(0.1),
          cc.FadeOut.create(0.0),
          cc.DelayTime.create(0.1)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.text.taps[1].opacity = 0;
  },

  /**
   *
   *
   *
   */
  show: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.FadeIn.create(0.2)
        )
      )
    );
  },
  hide: function() {

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.FadeOut.create(0.2)
        ),
        cc.CallFunc.create(this.removeFromParent, this)
      )
    );
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
    this.backgrounds.d.x = 0;

    /**
     *
     *
     *
     */
    this.elements.navigation.actions[0].scale = 1;
    this.elements.navigation.actions[1].scale = 0;

    /**
     *
     *
     *
     */
    this.onIndexChanged();
  },
  onExit: function() {
    this._super();

    /**
     *
     *
     *
     */
    if(!Data.get(false, properties.tutorial)) {

      /**
       *
       *
       *
       */
      Data.set(false, properties.tutorial, 1);

      /**
       *
       *
       *
       */
      Game.onPlay();
    }
  },

  /**
   *
   *
   *
   */
  onIndexChanged: function() {

    /**
     *
     *
     *
     */
    this.parameters.animations.chapters[0].count.current = 0;
    this.parameters.animations.chapters[1].count.current = 0;

    /**
     *
     *
     *
     */
    this.elements.chapters[0].clearTracks();
    this.elements.chapters[1].clearTracks();

    /**
     *
     *
     *
     */
    this.elements.chapters[this.parameters.index].setTimeScale(this.parameters.animations.chapters[this.parameters.index].time);
    this.elements.chapters[this.parameters.index].setAnimation(this.parameters.animations.chapters[this.parameters.index].index, this.parameters.animations.chapters[this.parameters.index].name, this.parameters.animations.chapters[this.parameters.index].loop);
  },

  /**
   *
   *
   *
   */
  /*onTouch: function() {
    this.onSwipeLeft();
  },*/

  /**
   *
   *
   *
   */
  onSwipe: function() {
    return this.backgrounds.d.getNumberOfRunningActions() <= 0;
  },
  onSwipeLeft: function() {

    /**
     *
     *
     *
     */
    if(this.parameters.index > 0) {
      
      /**
       *
       *
       *
       */
      this.hide();
      
      /**
       *
       *
       *
       */
      return false;
    }

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
    this.backgrounds.d.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.MoveBy.create(0.2, {
            x: -Camera.width,
            y: 0
          })
        )
      )
    );

    /**
     *
     *
     *
     */
    this.elements.navigation.actions[0].runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.2, 0.0)
        )
      )
    );
    this.elements.navigation.actions[1].runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        )
      )
    );    

    /**
     *
     *
     *
     */
    this.onIndexChanged();
  },
  onSwipeRight: function() {

    /**
     *
     *
     *
     */
    if(this.parameters.index < 1) return false;

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
    this.backgrounds.d.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.MoveBy.create(0.2, {
            x: Camera.width,
            y: 0
          })
        )
      )
    );

    /**
     *
     *
     *
     */
    this.elements.navigation.actions[1].runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.2, 0.0)
        )
      )
    );
    this.elements.navigation.actions[0].runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.onIndexChanged();
  }
});
