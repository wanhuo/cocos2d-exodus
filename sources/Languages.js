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
  'close': [
    {title: 'Close', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]},
    {title: 'Закрыть', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]}
  ],
  'cancel': [
    {title: 'Cancel', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]},
    {title: 'Отмена', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]}
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
    {title: 'Спасибо за игру!', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-2': [
    {title: 'Product Name:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Название:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-3': [
    {title: 'Version:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Версия:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-4': [
    {title: 'Build:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Сборка:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-5': [
    {title: 'Support', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Поддержка', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-6': [
    {title: 'You can get support in social\nnetworks or send us an email.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Вы можете получить поддержку в социальных\nсетях или написав нам письмо.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-7': [
    {title: 'Support code:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Код поддержки:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-8': [
    {title: 'Developed by', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Разработка', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-9': [
    {title: 'Programmers', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Программисты', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-10': [
    {title: 'Igor Mats', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Игорь Мац', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-11': [
    {title: 'Designers', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Дизайнеры', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-12': [
    {title: 'Dmitry Shane', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дмитрий Шейн', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-13': [
    {title: 'PR', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Маркетинг', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-14': [
    {title: 'Aleksandr Lysenko', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Александр Лысенко', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-15': [
    {title: 'Special Thanks', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Огромное спасибо', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
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
    {title: 'Разработано с помощью', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-19': [
    {title: 'Rocket Escape', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Rocket Escape', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-20': [
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-21': [
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-22': [
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'store-title-0': [
    {title: 'Rockets', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Рокеты', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]}
  ],
  'store-title-1': [
    {title: 'Creatures', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Существа', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]}
  ],
  'store-title-2': [
    {title: 'Bonuses', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Бонусы', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]}
  ],
  'store-title-3': [
    {title: 'Points', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Точки', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]}
  ],
  'store-title-4': [
    {title: 'Coins', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Монеты', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]}
  ],
  'store-no-items-title': [
    {title: 'No Items', font: 'Impact', size: 48, dimensions: false, color: [255, 255, 255]},
    {title: 'Нет позиций', font: 'Impact', size: 48, dimensions: false, color: [255, 255, 255]}
  ],
  'store-no-items-description': [
    {title: 'There is no items.\nWe are working hard to add\nmore content for you.', font: 'Impact', size: 36, dimensions: false, color: [255, 255, 255]},
    {title: 'В этом разделе нет позиций\nМы много работаем чтобы\nдобавить больше контента для вас.', font: 'Impact', size: 36, dimensions: false, color: [255, 255, 255]}
  ],
  'store-refresh': [
    {title: 'Refresh to see is content were added.', font: 'Impact', size: 24, dimensions: false, color: [255, 255, 255]},
    {title: 'Обновить. Вдруг мы уже добавили много нового?', font: 'Impact', size: 24, dimensions: false, color: [255, 255, 255]}
  ],
  'store-price': [
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [228, 149, 81]}
  ],
  'store-count': [
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [228, 149, 81]}
  ],
  'store-purchase': [
    {title: '     Purchase', font: 'Impact', size: 28, dimensions: false, color: [228, 149, 81]},
    {title: '  Купить', font: 'Impact', size: 28, dimensions: false, color: [228, 149, 81]}
  ],
  'store-select': [
    {title: 'Select', font: 'Impact', size: 28, dimensions: false, color: [228, 149, 81]},
    {title: 'Выбрать', font: 'Impact', size: 28, dimensions: false, color: [228, 149, 81]}
  ],
  'store-selected': [
    {title: 'You have select this item', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Вы выбрали эту позицию', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-coins': [
    {title: '$1', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]}
  ],
  'store-unlock': [
    {title: 'You should get $1 points\nto unlock this item', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Вы должны набрать $1 очков\nдля разблокировки', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-1': [
    {title: 'Simple Orange Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Оранжевая рокета', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-2': [
    {title: 'Simple White Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Белая рокета', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-3': [
    {title: 'Simple Red Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Красная рокета', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-4': [
    {title: 'Some Additional Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-5': [
    {title: 'Some Additional Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-6': [
    {title: 'Some Additional Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-7': [
    {title: 'Some Additional Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-8': [
    {title: 'Some Additional Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-9': [
    {title: 'Some Additional Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-10': [
    {title: 'Some Additional Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-2-1': [
    {title: 'Human', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Человек', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-2-2': [
    {title: 'Stegosaurus', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Стегозавр', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-2-3': [
    {title: 'Apatosaurus', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Апатозавр', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-2-4': [
    {title: 'Triceratops', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Трицераптор', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-3-1': [
    {title: 'Coins Magnet', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Магнит монеток', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-3-2': [
    {title: 'Lucky Horseshoe', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Счастливая подкова', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-1': [
    {title: 'Simple orange rocket available by default.\n You can change it.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Простая оранжевая рокета доспуна\n по-умолчанию. Вы можете сменить ее.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-2': [
    {title: 'Simple white rocket available by default.\n You can change it.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Простая белая рокета доспуна\n по-умолчанию. Вы можете сменить ее.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-3': [
    {title: 'Simple red rocket available by default.\n You can change it.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Простая красная рокета доспуна\n по-умолчанию. Вы можете сменить ее.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-4': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-5': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-6': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-7': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-8': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-9': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-10': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная рокета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-2-1': [
    {title: 'Large team is always good!\n Rocket will steer from heavy peak.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Большая команда всегда хорошо!\n Рокета вырулит из тяжелых пике.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-2-2': [
    {title: 'Stegosaurus can save the rocket from crash\n with 25% probability.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Стегозавр может спасти рокету от крушения\n с вероятностью 25%.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-2-3': [
    {title: 'Apatosaurus so huge!!\n It slows down the rocket.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Апатозавр настолько тяжелый, что\n замедляет рокету.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-2-4': [
    {title: 'Triceratops absorbs rocket\'s vibrations\n in areas of turbulence', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Трицераптор поглощает колебания рокеты\n в зонах турбулентности.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-3-1': [
    {title: 'Coins Magnet collect all coins automatically.\n No need to tap on each coin.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Магнит собирает монетки автоматически.\n Вам не нужно жать на каждую монетку.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-3-2': [
    {title: 'Increases the probability of a\n coin for 2 times.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Увеличивает вероятность появления\n монетки в 2 раза.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'share-message': [
    {title: 'OMG! I\'ve got $1 points playing Rocket Escape! #RocketEscape @tooflya ', font: 'Impact', size: 0, dimensions: false},
    {title: 'Ого! Я достиг $1 очков в игре Rocket Escape! #RocketEscape @tooflya ', font: 'Impact', size: 0, dimensions: false}
  ]
};
