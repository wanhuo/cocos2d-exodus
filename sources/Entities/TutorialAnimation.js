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

TutorialAnimation = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function(animation) {
    this._super(animation.json, animation.atlas, 1.0, Credits.backgrounds.scroll);

    /**
     *
     * 
     *
     */
    this.parameters = {
      animations: {
        animation: {
          index: 1,
          name: 'animation',
          loop: true
        },
        click: {
          index: 2,
          name: 'click',
          loop: false
        }
      }
    };

    /**
     *
     *
     *
     */
    this.setAnimationListener(this, this.onAnimationStateChanged.bind(this));

    /**
     *
     *
     *
     */
    this.needScheduleUpdate = true;

    /**
     *
     *
     *
     */
    Spine.prototype.onCreateTextures.call(this);
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
    this.setSlotsToSetupPose();
    this.setBonesToSetupPose();

    /**
     *
     *
     *
     */
    this.clearTracks();

    /**
     *
     *
     *
     */
    this.setAnimation(this.parameters.animations.animation.index, this.parameters.animations.animation.name, this.parameters.animations.animation.loop);
  },
  onDestroy: function() {
    this._super();
  },

  /**
   *
   *
   *
   */
  onCreateTextures: function() {
  },
  onDestroyTextures: function() {
  },

  /**
   *
   *
   *
   */
  onAnimationStateChanged: function(target, index, type, event) {
    if(event) {
      this.setAnimation(this.parameters.animations.click.index, this.parameters.animations.click.name, this.parameters.animations.click.loop);
    }
  }
});
