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

Tutorial = {

  /**
   *
   *
   *
   */
  parameters: {
    time: [
      1000,
      100,
      0,
      200,
      0
    ],
    passed: [
      false,//cc.sys.localStorage.getItem(properties.tutorial.chapters.chapter1),
      false,//cc.sys.localStorage.getItem(properties.tutorial.chapters.chapter2),
      false,//cc.sys.localStorage.getItem(properties.tutorial.chapters.chapter3),
      false,//cc.sys.localStorage.getItem(properties.tutorial.chapters.chapter4),
      false//cc.sys.localStorage.getItem(properties.tutorial.chapters.chapter5)
    ]
  },

  /**
   *
   *
   *
   */
  show: function(index) {

    /**
     *
     *
     *
     */
    if(this.parameters.passed[index - 1]) return false;

    /**
     *
     *
     *
     */
    this.parameters.passed[index - 1] = true;
    Data.set(true, 100 + index, true);

    /**
     *
     *
     *
     */
    setTimeout(function() {

      /**
       *
       *
       *
       */
      Game.parameters.tutorial.current = Tutorial.chapter(index);

      /**
       *
       *
       *
       */
      Game.changeState(Game.parameters.states.tutorial);
    }, this.parameters.time[index - 1]);

    /**
     *
     *
     *
     */
    return true;
  },

  /**
   *
   *
   *
   */
  chapter: function(id) {

    /**
     *
     *
     *
     */
    switch(id) {
      case 1:
      return new Chapter1;
      case 2:
      return new Chapter2;
      case 3:
      return new Chapter3;
      case 4:
      return new Chapter4;
      case 5:
      return new Chapter5;
    }
  }
};
