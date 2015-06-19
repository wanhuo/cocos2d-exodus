0/**
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
          item: new StoreItem101
        },
        {
          price: 0,
          type: this.types.permanent,
          owned: true,
          selectable: true,
          selected: Data.get(false, properties.rocket) === 1,
          selectCode: properties.rocket,
          purchaseCode: 0,
          item: new StoreItem102
        },
        {
          price: 0,
          type: this.types.permanent,
          owned: true,
          selectable: true,
          selected: Data.get(false, properties.rocket) === 2,
          selectCode: properties.rocket,
          purchaseCode: 0,
          item: new StoreItem103
        },
        {
          price: 250,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[3]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 3,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[3],
          item: new StoreItem104
        },
        {
          price: 275,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[4]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 4,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[4],
          item: new StoreItem105
        },
        {
          price: 325,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[5]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 5,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[5],
          item: new StoreItem106
        },
        {
          price: 350,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[6]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 6,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[6],
          item: new StoreItem107
        },
        {
          price: 425,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[7]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 7,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[7],
          item: new StoreItem108
        },
        {
          price: 475,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[8]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 8,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[8],
          item: new StoreItem109
        },
        {
          price: 525,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[9]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 9,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[9],
          item: new StoreItem110
        },
        /*{
          price: 625,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[10]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 10,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[10],
          item: new StoreItem111
        },
        {
          price: 650,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[11]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 11,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[11],
          item: new StoreItem112
        },
        {
          price: 675,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[12]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 12,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[12],
          item: new StoreItem113
        },*/
        {
          price: 725,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[13]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 13,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[13],
          item: new StoreItem114
        },
        /*{
          price: 850,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[14]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 14,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[14],
          item: new StoreItem115
        },*/
        {
          price: 875,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[15]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 15,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[15],
          item: new StoreItem116
        },
        {
          price: 925,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[16]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 16,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[16],
          item: new StoreItem117
        },
        {
          price: 950,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[17]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 17,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[17],
          item: new StoreItem118
        },
        {
          price: 975,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[18]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 18,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[18],
          item: new StoreItem119
        },
        {
          price: 1020,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[19]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 19,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[19],
          item: new StoreItem120
        },
        /*{
          price: 1050,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[20]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 20,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[20],
          item: new StoreItem121
        },
        {
          price: 1080,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[21]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 21,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[21],
          item: new StoreItem122
        },
        {
          price: 1110,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[22]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 22,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[22],
          item: new StoreItem123
        },*/
        {
          price: 1140,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[23]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 23,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[23],
          item: new StoreItem124
        },
        {
          price: 1195,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[24]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 24,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[24],
          item: new StoreItem125
        },
        {
          price: 1225,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[25]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 25,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[25],
          item: new StoreItem126
        },
        {
          price: 1275,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[26]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 26,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[26],
          item: new StoreItem127
        },
        {
          price: 1320,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[27]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 27,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[27],
          item: new StoreItem128
        },
        {
          price: 1350,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[28]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 28,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[28],
          item: new StoreItem129
        },
        {
          price: 1370,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[29]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 29,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[29],
          item: new StoreItem130
        },
        {
          price: 1390,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[30]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 30,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[30],
          item: new StoreItem131
        },
        {
          price: 1400,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[31]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 31,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[31],
          item: new StoreItem132
        },
        {
          price: 1450,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[32]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 32,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[32],
          item: new StoreItem133
        },
        {
          price: 1500,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[33]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 33,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[33],
          item: new StoreItem134
        },
        {
          price: 1500,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[34]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 34,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[34],
          item: new StoreItem135
        },
        {
          price: 1500,
          type: this.types.permanent,
          owned: Data.get(false, properties.rockets[35]),
          selectable: true,
          selected: Data.get(false, properties.rocket) === 35,
          selectCode: properties.rocket,
          purchaseCode: properties.rockets[35],
          item: new StoreItem136
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
