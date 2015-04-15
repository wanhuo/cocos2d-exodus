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

Items = {

  /**
   *
   *
   *
   */
  types: {
    consumable: 1,
    permanent: 2,
    upgrade: 3
  },

  /**
   *
   *
   *
   */
  items: [

    /**
     *
     * Rockets
     *
     */
    [
    ],

    /**
     *
     * Creatures
     *
     */
    [
    ],

    /**
     *
     * Bonuses
     *
     */
    [
      {
        price: 25,
        type: 1,
        unlock: 5,
        item: new StoreItem31
      },
      {
        price: 250,
        type: 1,
        unlock: 25,
        item: new StoreItem32
      }
    ],

    /**
     *
     * Points
     *
     */
    [
    ],

    /**
     *
     * Coins
     *
     */
    [
    ]
  ]
};
