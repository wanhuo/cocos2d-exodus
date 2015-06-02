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

Items = cc.Class.extend({

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
    Items = this;

    /**
     *
     *
     *
     */
    this.types = {
      consumable: 1,
      permanent: 2,
      upgrade: 3
    };

    /**
     *
     *
     *
     */
    this.items = [

      /**
       *
       * Rockets
       *
       */
      [
        {
          price: 0,
          type: this.types.permanent,
          owned: true,
          selectable: true,
          selected: round(Data.get(false, properties.rocket)) == 0,
          selectCode: properties.rocket,
          purchaseCode: 0,
          item: new StoreItem11
        },
        {
          price: 0,
          type: this.types.permanent,
          owned: true,
          selectable: true,
          selected: Data.get(false, properties.rocket) === 1,
          selectCode: properties.rocket,
          purchaseCode: 0,
          item: new StoreItem12
        },
        {
          price: 0,
          type: this.types.permanent,
          owned: true,
          selectable: true,
          selected: Data.get(false, properties.rocket) === 2,
          selectCode: properties.rocket,
          purchaseCode: 0,
          item: new StoreItem13
        },
        {
          price: 250,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[3]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 3,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[3],
          item: new StoreItem14
        },
        {
          price: 750,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[4]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 4,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[4],
          item: new StoreItem15
        },
        {
          price: 1500,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[5]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 5,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[5],
          item: new StoreItem16
        },
        {
          price: 2500,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[6]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 6,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[6],
          item: new StoreItem17
        },
        {
          price: 3250,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[7]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 7,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[7],
          item: new StoreItem18
        },
        {
          price: 4500,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[8]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 8,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[8],
          item: new StoreItem19
        }
      ],

      /**
       *
       * Creatures
       *
       */
      [
        {
          price: 50,
          type: this.types.consumable,
          purchaseCode: properties.creatures[0],
          item: new StoreItem21
        },
        {
          price: 350,
          type: this.types.consumable,
          purchaseCode: properties.creatures[1],
          item: new StoreItem22
        },
        {
          price: 250,
          type: this.types.consumable,
          purchaseCode: properties.creatures[2],
          item: new StoreItem23
        },
        {
          price: 500,
          type: this.types.consumable,
          purchaseCode: properties.creatures[3],
          item: new StoreItem24
        }
      ],

      /**
       *
       * Bonuses
       *
       */
      [
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
        {
          price: 0,
          type: this.types.permanent,
          purchaseCode: 0,
          owned: true,
          selectable: false,
          available: true,
          item: new StoreItem51
        },
        {
          price: 0,
          type: this.types.permanent,
          purchaseCode: 0,
          owned: true,
          selectable: false,
          available: true,
          item: new StoreItem52
        },
        {
          price: 0,
          type: this.types.permanent,
          purchaseCode: 0,
          owned: true,
          selectable: false,
          available: true,
          item: new StoreItem53
        }
      ]
    ]
  }
});
