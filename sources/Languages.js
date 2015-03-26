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

var languages = {
  'counter': [
    {title: '$1', font: 'Impact', size: 114, dimensions: false, color: [42, 104, 93]},
    {title: '$1', font: 'Impact', size: 114, dimensions: false, color: [42, 104, 93]}
  ],
  'best': [
    {title: 'BEST SCORE: $1', font: 'Impact', size: 36, dimensions: false, color: [42, 104, 93]},
    {title: 'Лучший результат: $1', font: 'Impact', size: 36, dimensions: false, color: [42, 104, 93]}
  ],
  'jumps': [
    {title: 'TAPS: $1', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Нажатий: $1', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]}
  ],
  'deaths': [
    {title: 'DEATHS: $1', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Проигрышей: $1', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]}
  ],
  'share': [
    {title: 'Tap counter to share your result', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Нажмите на счетчик чтобы\nподелиться результатами', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]}
  ],
  'start': [
    {title: 'Tap screen to launch a rocket', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Нажмите на экран\nдля запуска ракеты', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]}
  ],
  'decoration-0': [
    {title: 'TO THE MOON', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Направляюсь к луне!', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]}
  ],
  'decoration-1': [
    {title: 'I CAN SEE MY HOUSE FROM HERE', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Я вижу свой дом отсюда!', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]}
  ],
  'mistake': [
    {title: 'Ouch', font: 'Impact', size: 46, dimensions: false, color: [255, 221, 96]},
    {title: 'Ой', font: 'Impact', size: 46, dimensions: false, color: [255, 221, 96]}
  ],
  'fail': [
    {title: 'Fail', font: 'Impact', size: 46, dimensions: false, color: [237, 58, 90]},
    {title: 'Долетался', font: 'Impact', size: 46, dimensions: false, color: [237, 58, 90]}
  ],
  'tutorial': [
    {title: '$1', font: 'Impact', size: 32, dimensions: false},
    {title: '$1', font: 'Impact', size: 32, dimensions: false}
  ],
  'tutorial-chapter-1': [
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [232, 153, 255]},
    {title: 'Пожалуйста помоги!\n\nНаш мир затапливает, а ведь у тебя есть ракета!\nТапай по экрану чтобы мы\nбежали быстрей!', font: 'Impact', size: 32, dimensions: false, color: [232, 153, 255]}
  ],
  'tutorial-chapter-2': [
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [232, 153, 255]},
    {title: 'Отлично. Все готово к старту!\n\nПросто нажми еще раз.\nМы готовы!', font: 'Impact', size: 32, dimensions: false, color: [232, 153, 255]}
  ],
  'tutorial-chapter-3': [
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [40, 201, 0]},
    {title: 'Управлять кораблем очень\nлегко: нажимай на экран\nкогда ракета достигнет\nзеленой точки!\n\nСправишься?', font: 'Impact', size: 32, dimensions: false, color: [40, 201, 0]}
  ],
  'tutorial-chapter-4': [
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [225, 21, 161]},
    {title: 'Мы забыли предупредить о красных точках! Они утянут\nкорабль вниз!!', font: 'Impact', size: 32, dimensions: false, color: [225, 21, 161]}
  ],
  'tutorial-chapter-5': [
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 182, 42]},
    {title: 'Похоже ты совершил\nошибку.\n\nНе расстраивайся, не всем суждено быть пилотами!', font: 'Impact', size: 32, dimensions: false, color: [255, 182, 42]}
  ],
  'share-message': [
    {title: 'OMG! I\'ve got$1points playing Rocket Escape! #RocketEscape @tooflya', font: 'Impact', size: 0, dimensions: false},
    {title: 'Ого! Я достиг$1очков в игре Rocket Escape! #RocketEscape @tooflya', font: 'Impact', size: 0, dimensions: false}
  ]
};
