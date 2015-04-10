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
  'coins': [
    {title: '$1', font: 'Impact', size: 24, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 24, dimensions: false, color: [228, 149, 81]}
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
    {title: 'Please help me!\n\nOur world is flooded, and you have a rocket! Tap the screen to help us escape!', font: 'Impact', size: 32, dimensions: false, color: [232, 153, 255]},
    {title: 'Пожалуйста помоги!\n\nНаш мир затапливает, а ведь у тебя есть ракета! Тапай по экрану чтобы мы бежали быстрей!', font: 'Impact', size: 32, dimensions: false, color: [232, 153, 255]}
  ],
  'tutorial-chapter-2': [
    {title: 'Perfect. Everything is ready to start!\n\nJust click again. We are ready!', font: 'Impact', size: 32, dimensions: false, color: [232, 153, 255]},
    {title: 'Отлично. Все готово к старту!\n\nПросто нажми еще раз. Мы готовы!', font: 'Impact', size: 32, dimensions: false, color: [232, 153, 255]}
  ],
  'tutorial-chapter-3': [
    {title: 'It is very easy to control the ship: tap the screen when the rocket will fly through the green point!\n\nOn the right?', font: 'Impact', size: 32, dimensions: false, color: [40, 201, 0]},
    {title: 'Управлять кораблем очень легко: нажимай на экран когда ракета достигнет зеленой точки!\n\nСправишься?', font: 'Impact', size: 32, dimensions: false, color: [40, 201, 0]}
  ],
  'tutorial-chapter-4': [
    {title: 'We forgot to warn you about the red points! They pull the ship down!!', font: 'Impact', size: 32, dimensions: false, color: [225, 21, 161]},
    {title: 'Мы забыли предупредить о красных точках! Они утянут корабль вниз!!', font: 'Impact', size: 32, dimensions: false, color: [225, 21, 161]}
  ],
  'tutorial-chapter-5': [
    {title: 'It looks like you made a mistake.\n\nDo not worry, next time be carefully.', font: 'Impact', size: 32, dimensions: false, color: [255, 182, 42]},
    {title: 'Похоже ты совершил ошибку.\n\nНе расстраивайся, в следующий раз будь внимательнее.', font: 'Impact', size: 32, dimensions: false, color: [255, 182, 42]}
  ],
  'reward-coins': [
    {title: '$1', font: 'Impact', size: 180, dimensions: false, color: [74, 204, 200]},
    {title: '$1', font: 'Impact', size: 180, dimensions: false, color: [74, 204, 200]}
  ],
  'continue-time': [
    {title: '$1', font: 'Impact', size: 114, dimensions: false, color: [132, 209, 223]},
    {title: '$1', font: 'Impact', size: 114, dimensions: false, color: [132, 209, 223]}
  ],
  'continue-action': [
    {title: 'Would you like to\nget an extra life?', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Хотите получить\nдополнительную жизнь?', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'never-show-me': [
    {title: 'Never show me this window', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]},
    {title: 'Больше не показывать мне это', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]}
  ],
  'button-text-coins': [
    {title: '$1', font: 'Impact', size: 37, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 37, dimensions: false, color: [228, 149, 81]}
  ],
  'button-text-nope': [
    {title: 'Nope', font: 'Impact', size: 37, dimensions: false, color: [228, 149, 81]},
    {title: 'Нет уж', font: 'Impact', size: 37, dimensions: false, color: [228, 149, 81]}
  ],
  'credits-title-1': [
    {title: 'Thanks for playing!', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-2': [
    {title: 'Product Name:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-3': [
    {title: 'Version:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-4': [
    {title: 'Build:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-5': [
    {title: 'Support', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-6': [
    {title: 'You can get support in social\nnetworks, or send us an email.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-7': [
    {title: 'Support code:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-8': [
    {title: 'Developed by', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-9': [
    {title: 'Developers', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-10': [
    {title: 'Igor Mats', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-11': [
    {title: 'Artists', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-12': [
    {title: 'Dmitry Shane', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-13': [
    {title: 'PR', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-14': [
    {title: 'Alexandr Lysenko', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-15': [
    {title: 'Special Thanks', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-16': [
    {title: 'Tooflya Inc. Director', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-17': [
    {title: 'Yaroslav Markevich', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Ярослав Маркевич', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-18': [
    {title: 'Powered by', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'share-message': [
    {title: 'OMG! I\'ve got $1 points playing Rocket Escape! #RocketEscape @tooflya ', font: 'Impact', size: 0, dimensions: false},
    {title: 'Ого! Я достиг $1 очков в игре Rocket Escape! #RocketEscape @tooflya ', font: 'Impact', size: 0, dimensions: false}
  ]
};
