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

var resources = {
  main: {
    font: 'resource/Fonts/Impact.ttf',
    backgrounds: [
      'resource/Graphics/background-1.png',
      'resource/Graphics/background-2.png',
      'resource/Graphics/background-3.png',
      'resource/Graphics/background-4.png'
    ],
    name: 'resource/Graphics/name.png',
    ground: 'resource/Graphics/ground.png',
    slide: 'resource/Graphics/slide.png',
    mountain: 'resource/Graphics/mountain.png',
    point: 'resource/Graphics/point.png',
    decorations: {
      rocket: {
        texture: 'resource/Graphics/rocket.png',
        particles: [
          'resource/Graphics/rocket-decoration-1.png',
          'resource/Graphics/rocket-decoration-2.png'
        ]
      }
    },
    character: {
      texture1: 'resource/Graphics/character.png',
      texture2: 'resource/Graphics/character2.png',
      texture3: 'resource/Graphics/character3.png',
      texture4: 'resource/Graphics/character4.png',
      texture5: 'resource/Graphics/character5.png',
      texture6: 'resource/Graphics/character6.png',
      atlas: 'resource/Graphics/character.atlas',
      json: 'resource/Graphics/character.json',
      shadow: 'resource/Graphics/character-shadow.png',
      smoke: 'resource/Graphics/character-smoke.png'
    },
    human: {
      texture: 'resource/Graphics/human.png',
      atlas: 'resource/Graphics/human.atlas',
      json: 'resource/Graphics/human.json'
    },
    apatosaurus: {
      texture: 'resource/Graphics/apatosaurus.png',
      atlas: 'resource/Graphics/apatosaurus.atlas',
      json: 'resource/Graphics/apatosaurus.json'
    },
    stegosaurus: {
      texture: 'resource/Graphics/stegosaurus.png',
      atlas: 'resource/Graphics/stegosaurus.atlas',
      json: 'resource/Graphics/stegosaurus.json'
    },
    triceratops: {
      texture: 'resource/Graphics/triceratops.png',
      atlas: 'resource/Graphics/triceratops.atlas',
      json: 'resource/Graphics/triceratops.json'
    },
    baloon: {
      texture: 'resource/Graphics/baloon.png',
      atlas: 'resource/Graphics/baloon.atlas',
      json: 'resource/Graphics/baloon.json'
    },
    fish: {
      texture: 'resource/Graphics/fish.png',
      atlas: 'resource/Graphics/fish.atlas',
      json: 'resource/Graphics/fish.json'
    },
    creature: {
      texture: 'resource/Graphics/creature.png',
      atlas: 'resource/Graphics/creature.atlas',
      json: 'resource/Graphics/creature.json'
    },
    stars: [
      'resource/Graphics/star-1.png',
      'resource/Graphics/star-2.png'
    ],
    clouds: [
      'resource/Graphics/cloud-1.png',
      'resource/Graphics/cloud-2.png'
    ],
    trees: [
      'resource/Graphics/tree-1.png',
      'resource/Graphics/tree-2.png',
      'resource/Graphics/tree-3.png'
    ],
    explanation: {
      texture: 'resource/Graphics/explanation.png',
      circle: 'resource/Graphics/explanation-circle.png'
    },
    awesome: {
      texture: 'resource/Graphics/awesome.png',
    },
    buttons: {
      play: 'resource/Graphics/play-button.png',
      leaderboard: 'resource/Graphics/leaderboard-button.png',
      achievements: 'resource/Graphics/achievements-button.png',
      like: 'resource/Graphics/like-button.png',
      sound: 'resource/Graphics/sound-button.png',
      store: 'resource/Graphics/store-button.png',
      share: 'resource/Graphics/share-button.png',
      credits: 'resource/Graphics/credits-button.png',
      coins: 'resource/Graphics/coins-button.png',
      empty: 'resource/Graphics/empty-button.png',
      bottom: 'resource/Graphics/bottom-button.png',
      twitter: 'resource/Graphics/twitter-button.png',
      facebook: 'resource/Graphics/facebook-button.png',
      mail: 'resource/Graphics/mail-button.png'
    },
    water: [
      'resource/Graphics/water-1.png',
      'resource/Graphics/water-2.png',
      'resource/Graphics/water-3.png'
    ],
    bonuses: [
      'resource/Graphics/bonus-1.png',
      'resource/Graphics/bonus-2.png'
    ],
    reward: {
      coin: 'resource/Graphics/reward-coin.png',
      decorations: [
        'resource/Graphics/reward-decoration-1.png'
      ],
      pig: {
        texture: 'resource/Graphics/reward-pig.png',
        hide: 'resource/Graphics/reward-hide.png',
      },
      hand: 'resource/Graphics/reward-hand.png',
      buttons: {
        continue: 'resource/Graphics/reward-continue-button.png'
      }
    },
    store: {
      coins: 'resource/Graphics/store-coins-background.png',
      price: 'resource/Graphics/store-price-background.png',
      count: 'resource/Graphics/store-items-count-background.png',
      baloon: 'resource/Graphics/store-baloon.png',
      decorations: [
        'resource/Graphics/store-decoration-1.png'
      ],
      buttons: {
        rockets: 'resource/Graphics/store-rockets-button.png',
        creatures: 'resource/Graphics/store-creatures-button.png',
        bonuses: 'resource/Graphics/store-bonuses-button.png',
        points: 'resource/Graphics/store-points-button.png',
        coins: 'resource/Graphics/store-coins-button.png',
        refresh: 'resource/Graphics/store-refresh-button.png',
        navigation: 'resource/Graphics/store-navigation-button.png'
      },
      items: [
        [],
        [],
        [
          {
            texture: 'resource/Graphics/store-item-3-1.png',
            shadow: 'resource/Graphics/store-item-3-1-shadow.png',
          },
          {
            texture: 'resource/Graphics/store-item-3-2.png',
            shadow: 'resource/Graphics/store-item-3-2-shadow.png',
          }
        ],
        [],
        [
          {
            background: 'resource/Graphics/store-item-51-background.png',
            decoration: 'resource/Graphics/store-item-51-decoration.png',
            button: 'resource/Graphics/store-item-51-button.png'
          },
          {
            background: 'resource/Graphics/store-item-52-background.png',
            decoration: 'resource/Graphics/store-item-52-decoration.png',
            button: 'resource/Graphics/store-item-52-button.png'
          },
          {
            background: 'resource/Graphics/store-item-53-background.png',
            decoration: 'resource/Graphics/store-item-53-decoration.png',
            button: 'resource/Graphics/store-item-53-button.png'
          }
        ]
      ]
    },
    counter: {
      texture: 'resource/Graphics/counter.png',
      coins:  'resource/Graphics/counter-coins.png'
    },
    coin: {
      texture: 'resource/Graphics/coin.png',
      particle: 'resource/Graphics/coin-particle.png'
    },
    bonus: {
      particle: 'resource/Graphics/bonus-particle.png'
    },
    moon: 'resource/Graphics/moon.png',
    continue: {
      background: 'resource/Graphics/continue-background.png',
      element: 'resource/Graphics/continue-element.png'
    },
    credits: {
      decorations: [
        'resource/Graphics/credits-decoration-1.png',
        'resource/Graphics/credits-decoration-2.png',
        'resource/Graphics/credits-decoration-3.png'
      ],
      powered: [
        'resource/Graphics/cocos2dx.png',
        'resource/Graphics/freepick.png'
      ]
    },
    tutorial: {
      texture: 'resource/Graphics/tutorial.png',
      atlas: 'resource/Graphics/tutorial.atlas',
      json: 'resource/Graphics/tutorial.json'
    },
    music: {
      background: 'resource/Music/music-1.music'
    },
    sound: {
      touch: 'resource/Sound/touch.sound',
      save: 'resource/Sound/save.sound',
      swipe: 'resource/Sound/swipe.sound',
      awesome: 'resource/Sound/awesome.sound',
      unlock: 'resource/Sound/unlock.sound',
      continue: 'resource/Sound/continue.sound',
      character: {
        destroy: 'resource/Sound/destroy.sound',
        engine : {
          start: 'resource/Sound/engine-start.sound',
          repeat: 'resource/Sound/engine-repeat.sound'
        }
      },
      counter: {
        count: [
          'resource/Sound/count-1.sound',
          'resource/Sound/count-2.sound',
          'resource/Sound/count-3.sound'
        ],
        fail: 'resource/Sound/fail.sound',
        coins: 'resource/Sound/coins.sound'
      },
      store: {
        select: 'resource/Sound/store-select.sound',
        purchase: 'resource/Sound/store-purchase.sound',
        more: 'resource/Sound/store-more.sound'
      },
      coins: {
        collect: 'resource/Sound/coins-collect.sound',
        animation: {
          finish: 'resource/Sound/coins-animation-finish.sound'
        }
      },
      bonuses: {
        actions: [
          '',
          'resource/Sound/bonus-2.sound'
        ],
        use: [
          'resource/Sound/bonus-use-1.sound',
          'resource/Sound/bonus-use-2.sound',
          'resource/Sound/bonus-use-3.sound'
        ]
      }
    }
  }
};
