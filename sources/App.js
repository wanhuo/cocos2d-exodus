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

/** @expose */
tooflya = {};

/**
 *
 *
 *
 */
App = {
  release: false,
  config: {
    splash: false,
    application: {
      tooflya: 41,
      android: 42,
      apple: 43
    },
    graphics: {
      x: 720,
      y: 1280
    },
    orientations: {
      portrait: true,
      landscape: false
    },
    languages: [
      {iso: 'en', id: 0},
      {iso: 'ru', id: 1},
      {iso: 'pt', id: 2},
      {iso: 'fr', id: 3}
    ],
    analytics: {
      tooflya: 'UA-48406912-20',
      android: 'UA-48406912-18',
      apple: 'UA-48406912-19'
    },
    services: {
      leaderboards: {
        best: 'CgkI88CN0aIVEAIQBg'
      },
      achievements: {
        scores: [
          '5h4aTO874O',
          'RT129bNv88',
          'G1LtY2BAQx',
          '85GN3e7785',
          'PAL233Ram5'
        ],
        characters: [
          'WYP4TiB9gB',
          '5nJS6d7U7s',
          'HtiM9GQzah',
          'Zdim7SxsrZ',
          '20PyRG525U'
        ],
        games: [
          'saN3y632ZK',
          'Cy39chaqGG',
          'Bek0TNk0ez',
          '950yV01zA9',
          '4Z11fzxV63'
        ]
      }
    },
    plugins: {
      ketchapp: true,
      heyzap: {
        apple: 'ff4d63e68db9518cacc9a4b5d8e375d8',
        android: 'ff4d63e68db9518cacc9a4b5d8e375d8'
      },
      batch: {
        apple: {
          id: '550C4647A0FEA0E80D57237599349D'
        },
        android: {
          id: '550DA9DB3D4DE2A31807D6F9BE3CA2'
        }
      }
    },
    links: {
      apple: 'https://itunes.apple.com/app/exodus/id1022196879',
      android: 'https://t.co/tHslobAt8u'
    }
  }
};

/**
 *
 *
 *
 */
if(cc.sys.isNative) {
  switch(cc.sys.os) {
    case cc.sys.OS_ANDROID:
    App.config.application = App.config.application.android;
    break;
    case cc.sys.OS_IOS:
    App.config.application = App.config.application.apple;
    break;
  }
} else {
  // TODO: Check web platform.
  App.config.application = App.config.application.tooflya;
}
