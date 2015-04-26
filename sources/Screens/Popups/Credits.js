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

Credits = Popup.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(cc.color(21, 176, 191));

    /**
     *
     *
     *
     */
    Credits = this;

    /**
     *
     *
     *
     */
    this.parameters = {
      popup: {
        scheduler: true
      },
      height: 800,
      scroll: {
        padding: 50
      }
    };

    /**
     *
     *
     *
     */
    this.opacity = 255;

    /**
     *
     *
     *
     */
    this.backgrounds = {
      scroll: new ccui.ScrollView,
      decorations: new Background(this)
    };

    /**
     *
     *
     *
     */
    this.backgrounds.scroll.setDirection(ccui.ScrollView.DIR_VERTICAL);
    this.backgrounds.scroll.setBounceEnabled(true);
    this.backgrounds.scroll.setTouchEnabled(true);
    this.backgrounds.scroll.setContentSize({
      width: Camera.width,
      height: Camera.height
    });

    /**
     *
     *
     *
     */
    this.addChild(this.backgrounds.scroll);

    /**
     *
     *
     *
     */
    this.elements = {
      decorations: [
        new Entity(resources.main.credits.decorations[0], this.backgrounds.decorations),
        new Entity(resources.main.credits.decorations[1], this.backgrounds.decorations),
        new Entity(resources.main.credits.decorations[2], this.backgrounds.decorations)
      ],
      powered: [
        new Entity(resources.main.credits.powered[0], this.backgrounds.scroll),
        new Entity(resources.main.credits.powered[1], this.backgrounds.scroll)
      ]
    };

    /**
     *
     *
     *
     */
    this.buttons = {
      twitter: new Button(resources.main.buttons.twitter, 1, 2, this.backgrounds.scroll, this.onTwitter.bind(this)),
      facebook: new Button(resources.main.buttons.facebook, 1, 2, this.backgrounds.scroll, this.onFacebook.bind(this)),
      mail: new Button(resources.main.buttons.mail, 1, 2, this.backgrounds.scroll, this.onMail.bind(this))
    };

    /**
     *
     *
     *
     */
    this.text = [
      new Text('credits-title-1', this.backgrounds.scroll),
      new Text('credits-title-2', this.backgrounds.scroll, Text.position.right),
      new Text('credits-title-3', this.backgrounds.scroll, Text.position.right),
      new Text('credits-title-4', this.backgrounds.scroll, Text.position.right),
      new Text('credits-title-5', this.backgrounds.scroll),
      new Text('credits-title-6', this.backgrounds.scroll),
      new Text('credits-title-7', this.backgrounds.scroll, Text.position.right),
      new Text('credits-title-8', this.backgrounds.scroll),
      new Text('credits-title-9', this.backgrounds.scroll),
      new Text('credits-title-10', this.backgrounds.scroll),
      new Text('credits-title-11', this.backgrounds.scroll),
      new Text('credits-title-12', this.backgrounds.scroll),
      new Text('credits-title-13', this.backgrounds.scroll),
      new Text('credits-title-14', this.backgrounds.scroll),
      new Text('credits-title-15', this.backgrounds.scroll),
      new Text('credits-title-16', this.backgrounds.scroll),
      new Text('credits-title-17', this.backgrounds.scroll),
      new Text('credits-title-18', this.backgrounds.scroll),
      new Text('credits-title-19', this.backgrounds.scroll, Text.position.left),
      new Text('credits-title-20', this.backgrounds.scroll, Text.position.left),
      new Text('credits-title-21', this.backgrounds.scroll, Text.position.left),
      new Text('credits-title-22', this.backgrounds.scroll, Text.position.left)
    ];

    /**
     *
     *
     *
     */
    this.elements.decorations[0].create().attr({
      x: 120,
      y: Camera.height - 300
    });
    this.elements.decorations[1].create().attr({
      x: Camera.width - 150,
      y: Camera.height - 400
    });
    this.elements.decorations[2].create().attr({
      x: 120,
      y: Camera.height - 800
    });

    /**
     *
     *
     *
     */
    this.buttons.twitter.create().attr({
      x: Camera.center.x - 75,
      y: Camera.height - 650
    });
    this.buttons.facebook.create().attr({
      x: Camera.center.x,
      y: Camera.height - 650
    });
    this.buttons.mail.create().attr({
      x: Camera.center.x + 75,
      y: Camera.height - 650
    });

    /**
     *
     *
     *
     */
    this.text[0].create().attr({
      x: Camera.center.x,
      y: Camera.height - 100
    });
    this.text[1].create().attr({
      x: Camera.center.x,
      y: Camera.height - 160
    });
    this.text[2].create().attr({
      x: Camera.center.x,
      y: Camera.height - 200
    });
    this.text[3].create().attr({
      x: Camera.center.x,
      y: Camera.height - 240
    });

    /**
     *
     *
     *
     */
    this.text[4].create().attr({
      x: Camera.center.x,
      y: Camera.height - 440
    });
    this.text[5].create().attr({
      x: Camera.center.x,
      y: Camera.height - 520
    });
    this.text[6].create().attr({
      x: Camera.center.x,
      y: Camera.height - 580
    });

    /**
     *
     *
     *
     */
    this.text[7].create().attr({
      x: Camera.center.x,
      y: Camera.height - 780
    });
    this.text[8].create().attr({
      x: Camera.center.x,
      y: Camera.height - 840
    });
    this.text[9].create().attr({
      x: Camera.center.x,
      y: Camera.height - 880
    });
    this.text[10].create().attr({
      x: Camera.center.x,
      y: Camera.height - 940
    });
    this.text[11].create().attr({
      x: Camera.center.x,
      y: Camera.height - 980
    });
    this.text[12].create().attr({
      x: Camera.center.x,
      y: Camera.height - 1040
    });
    this.text[13].create().attr({
      x: Camera.center.x,
      y: Camera.height - 1080
    });

    /**
     *
     *
     *
     */
    this.text[14].create().attr({
      x: Camera.center.x,
      y: Camera.height - 1280
    });
    this.text[15].create().attr({
      x: Camera.center.x,
      y: Camera.height - 1340
    });
    this.text[16].create().attr({
      x: Camera.center.x,
      y: Camera.height - 1380
    });

    /**
     *
     *
     *
     */
    this.text[17].create().attr({
      x: Camera.center.x,
      y: Camera.height - 1580
    });

    /**
     *
     *
     *
     */
    this.text[18].create().attr({
      x: Camera.center.x,
      y: this.text[1].y
    });
    this.text[19].create().attr({
      x: Camera.center.x,
      y: this.text[2].y
    });
    this.text[20].create().attr({
      x: Camera.center.x,
      y: this.text[3].y
    });
    this.text[21].create().attr({
      x: Camera.center.x,
      y: this.text[6].y
    });

    /**
     *
     *
     *
     */
    this.text[19].format(' ' + Internal.getVersionCode());
    this.text[20].format(' ' + Internal.getBuildNumber());
    this.text[21].format(' ' + Internal.getSupportCode());

    /**
     *
     *
     *
     */
    this.elements.powered[0].create().attr({
      x: Camera.center.x,
      y: Camera.height - 1780
    });
    this.elements.powered[1].create().attr({
      x: Camera.center.x,
      y: Camera.height - 1980
    });

    /**
     *
     *
     *
     */
    this.backgrounds.scroll.setInnerContainerSize({
      width: Camera.width,
      height: Camera.height + abs(this.elements.powered[1].y - this.parameters.scroll.padding) + (Camera.height - this.parameters.height)
    });

    /**
     *
     *
     *
     */
    this.backgrounds.scroll.children.each(function(element) {

      /**
       *
       *
       *
       */
      element.y += abs(this.elements.powered[1].y - this.parameters.scroll.padding) + (Camera.height - this.parameters.height);
    }.bind(this));

    /**
     *
     *
     *
     */
    this.backgrounds.scroll.d = Credits.backgrounds.scroll.getInnerContainer().y;

    /**
     *
     *
     *
     *
     *
     */
    // TODO: Make credits button allow dragging.
  },

  /**
   *
   *
   *
   */
  onTwitter: function() {

    /**
     *
     *
     *
     */
    Media.openTwitter();
  },
  onFacebook: function() {

    /**
     *
     *
     *
     */
    Media.openFacebook();
  },
  onMail: function() {

    /**
     *
     *
     *
     */
    // TODO: Open mail.
  },

  /**
   *
   *
   *
   */
  show: function() {

    /**
     *
     *
     *
     */
    Game.backgrounds.menu.holder.addChild(this);

    /**
     *
     *
     *
     */
    this.y = -Camera.height;

    /**
     *
     *
     *
     */
    Game.backgrounds.menu.background.runAction(
      cc.EaseSineInOut.create(
        cc.FadeTo.create(0.5, 200)
      )
    );

    /**
     *
     *
     *
     */
    Game.backgrounds.menu.holder.runAction(
      cc.EaseSineInOut.create(
        cc.MoveTo.create(0.5, {
          x: 0,
          y: this.parameters.height
        })
      )
    );
  },
  hide: function() {

    /**
     *
     *
     *
     */
    Game.backgrounds.menu.background.runAction(
      cc.EaseSineInOut.create(
        cc.FadeTo.create(0.5, 0)
      )
    );

    /**
     *
     *
     *
     */
    Game.backgrounds.menu.holder.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.5, {
            x: 0,
            y: 0
          })
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
  toogle: function() {

    /**
     *
     *
     *
     */
    if(this.state.create) {
    
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
    } else {

      /**
       *
       *
       *
       */
      this.show();
    
      /**
       *
       *
       *
       */
      return true;
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
    this.backgrounds.decorations.y = -(this.backgrounds.scroll.d - Credits.backgrounds.scroll.getInnerContainer().y) / 10;
  }
});
