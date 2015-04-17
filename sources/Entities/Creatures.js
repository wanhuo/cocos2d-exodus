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

Creatures = cc.Class.extend({

  /**
   *
   *
   *
   */
  ctor: function(elements) {

    /**
     *
     *
     *
     */
    Creatures = this;

    /**
     *
     *
     *
     */
    this.elements = elements;
  },

  /**
   *
   *
   *
   */
  execute: function(command, children) {

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
      if(children) {

        /**
         *
         *
         *
         */
        for(var i = 0; i < element.count().count; i++) {

          /**
           *
           *
           *
           */
          var child = element.get(i);

          /**
           *
           *
           *
           */
          eval(command);
        }
      } else {

        /**
         *
         *
         *
         */
        eval(command);
      }
    });
  },

  /**
   *
   *
   *
   */
  clear: function() {this.execute('element.clear()')},
  time: function() {this.execute('child.parameters.time++', true)},

  /**
   *
   *
   *
   */
  pauseSchedulerAndActions: function() {this.execute('element.pauseSchedulerAndActions()')},
  resumeSchedulerAndActions: function() {this.execute('element.resumeSchedulerAndActions()')},

  /**
   *
   *
   *
   */
  count: function() {
    var count = 0;

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
      count += element.count().count;
    });

    /**
     *
     *
     *
     */
    return count;
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
    this.current = [
      round(Data.get(false, properties.creatures[0])) + 1,
      round(Data.get(false, properties.creatures[1])),
      round(Data.get(false, properties.creatures[2])) + 1,
      round(Data.get(false, properties.creatures[3])) + 1
    ];

    /**
     *
     *
     *
     */
    for(var i = 0; i < this.elements.length; i++) {
      var element = this.elements[i];

      /**
       *
       *
       *
       */
      var count = Data.get(false, properties.creatures[i]) + (i == 0 ? 5 : 0);

      /**
       *
       *
       *
       */
      for(var j = 0; j < count; j++) {
        element.create();
      }
    }
  }
});
