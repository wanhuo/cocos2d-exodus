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
    {title: '$1', font: 'Impact', size: 114, dimensions: false, color: [42, 104, 93]},
    {title: '$1', font: 'Impact', size: 114, dimensions: false, color: [42, 104, 93]},
    {title: '$1', font: 'Impact', size: 114, dimensions: false, color: [42, 104, 93]}
  ],
  'tap': [
    {title: 'TAP', font: 'Impact', size: 72, dimensions: false, color: [255, 255, 255]},
    {title: 'TAP', font: 'Impact', size: 72, dimensions: false, color: [255, 255, 255]},
    {title: 'TAP', font: 'Impact', size: 72, dimensions: false, color: [255, 255, 255]},
    {title: 'TAP', font: 'Impact', size: 72, dimensions: false, color: [255, 255, 255]}
  ],
  'items-count': [
    {title: '$1', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]},
    {title: '$1', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]},
    {title: '$1', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]},
    {title: '$1', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]}
  ],
  'best': [
    {title: 'BEST SCORE: $1', font: 'Impact', size: 36, dimensions: false, color: [42, 104, 93]},
    {title: 'Лучший результат: $1', font: 'Impact', size: 28, dimensions: false, color: [42, 104, 93]},
    {title: 'MELHOR SCORE: $1', font: 'Impact', size: 28, dimensions: false, color: [42, 104, 93]},
    {title: 'MEILLEUR: $1', font: 'Impact', size: 36, dimensions: false, color: [42, 104, 93]}
  ],
  'jumps': [
    {title: 'TAPS: $1', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Нажатий: $1', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'TOQUES: $1', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'TAPS: $1', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]}
  ],
  'deaths': [
    {title: 'DEATHS: $1', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Проигрышей: $1', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'MORTES: $1', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'MORTS: $1', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]}
  ],
  'share': [
    {title: 'Tap counter to share your result', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Нажмите на счетчик чтобы\nподелиться результатами', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Toca na contagem de pontos\npara partilhar a tua pontuação', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Appuyer sur le compteur\npour partager votre score', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]}
  ],
  'start': [
    {title: 'Tap screen to launch a rocket', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Нажмите на экран\nдля запуска ракеты', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Toca no ecrã para\nlançar um rocket', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Appuyer sur l\'écran\npour lancer la fusée', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]}
  ],
  'coins': [
    {title: '$1', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]}
  ],
  'video-coins': [
    {title: '$1 FREE', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]},
    {title: '$1 FREE', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]},
    {title: '$1 FREE', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]},
    {title: '$1 FREE', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]}
  ],
  'decoration-0': [
    {title: 'TO THE MOON', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Направляюсь к луне!', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'RUMO À LUA', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'DIRECTION LA LUNE', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]}
  ],
  'decoration-1': [
    {title: 'I CAN SEE MY HOUSE FROM HERE', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'Я вижу свой дом отсюда!', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'EU CONSIGO VER A MINHA CASA DAQUI', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]},
    {title: 'JE PEUX VOIR MA MAISON D\'ICI', font: 'Impact', size: 32, dimensions: false, color: [42, 104, 93]}
  ],
  'mistake': [
    {title: 'Ouch', font: 'Impact', size: 46, dimensions: false, color: [255, 221, 96]},
    {title: 'Ой', font: 'Impact', size: 46, dimensions: false, color: [255, 221, 96]},
    {title: 'Ouch', font: 'Impact', size: 46, dimensions: false, color: [255, 221, 96]},
    {title: 'Ouch', font: 'Impact', size: 46, dimensions: false, color: [255, 221, 96]}
  ],
  'fail': [
    {title: 'Miss', font: 'Impact', size: 46, dimensions: false, color: [237, 58, 90]},
    {title: 'Долетался', font: 'Impact', size: 46, dimensions: false, color: [237, 58, 90]},
    {title: 'Falhaste', font: 'Impact', size: 46, dimensions: false, color: [237, 58, 90]},
    {title: 'Raté', font: 'Impact', size: 46, dimensions: false, color: [237, 58, 90]}
  ],
  'finish-coins': [
    {title: '$1', font: 'Impact', size: 180, dimensions: false, color: [74, 204, 200]},
    {title: '$1', font: 'Impact', size: 180, dimensions: false, color: [74, 204, 200]},
    {title: '$1', font: 'Impact', size: 180, dimensions: false, color: [74, 204, 200]},
    {title: '$1', font: 'Impact', size: 180, dimensions: false, color: [74, 204, 200]}
  ],
  'close': [
    {title: 'Close', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]},
    {title: 'Закрыть', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]},
    {title: 'Fechar', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]},
    {title: 'Fermer', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]}
  ],
  'cancel': [
    {title: 'Cancel', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]},
    {title: 'Отмена', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]},
    {title: 'Cancelar', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]},
    {title: 'Annuler', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]}
  ],
  'button-text-coins': [
    {title: '$1', font: 'Impact', size: 37, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 37, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 37, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 37, dimensions: false, color: [228, 149, 81]}
  ],
  'button-text-nope': [
    {title: 'Nope', font: 'Impact', size: 37, dimensions: false, color: [228, 149, 81]},
    {title: 'Нет уж', font: 'Impact', size: 37, dimensions: false, color: [228, 149, 81]},
    {title: 'Nope', font: 'Impact', size: 37, dimensions: false, color: [228, 149, 81]},
    {title: 'Nope', font: 'Impact', size: 37, dimensions: false, color: [228, 149, 81]}
  ],
  'awesome': [
    {title: 'Best score: $1', font: 'Impact', size: 72, dimensions: false, color: [255, 255, 255]},
    {title: 'Лучший результат: $1', font: 'Impact', size: 72, dimensions: false, color: [255, 255, 255]},
    {title: 'Melhor score: $1', font: 'Impact', size: 72, dimensions: false, color: [255, 255, 255]},
    {title: 'Meilleur score: $1', font: 'Impact', size: 72, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-1': [
    {title: 'Thanks for playing!', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Спасибо за игру!', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Obrigado por jogares!', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Merci d\'avoir joué !', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-2': [
    {title: 'Product Name:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Название:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Product Name:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Product Name:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-3': [
    {title: 'Version:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Версия:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Version:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Version:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-4': [
    {title: 'Build:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Сборка:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Build:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Build:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-5': [
    {title: 'Support', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Поддержка', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Suporte', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Support', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-6': [
    {title: 'You can get support in social\nnetworks or send us an email.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Вы можете получить поддержку в социальных\nсетях или написав нам письмо.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Podes pedir suporte nas redes\nsociais ou enviando-nos um email.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Vous pouvez contacter le support\nvia les réseaux sociaux ou par mail.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-7': [
    {title: 'Support code:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Код поддержки:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Support code:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Support code:', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-8': [
    {title: 'Developed by', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Разработка', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Desenvolvido por', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Développer par', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-9': [
    {title: 'Programmers', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Программисты', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Programadores', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Programmeurs', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-10': [
    {title: 'Igor Mats', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Игорь Мац', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Igor Mats', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Igor Mats', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-11': [
    {title: 'Designers', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Дизайнеры', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Designers', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Designers', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-12': [
    {title: 'Dmitry Shane', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дмитрий Шейн', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Dmitry Shane', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Dmitry Shane', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-13': [
    {title: 'PR', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Маркетинг', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'PR', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'PR', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-14': [
    {title: 'Aleksandr Lysenko', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Александр Лысенко', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Aleksandr Lysenko', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Aleksandr Lysenko', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-15': [
    {title: 'Special Thanks', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Огромное спасибо', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Agradecimentos Especiais', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Remerciement', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-16': [
    {title: 'Tooflya Inc. Director', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-17': [
    {title: 'Yaroslav Markevich', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Ярослав Маркевич', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Yaroslav Markevich', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Yaroslav Markevich', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-18': [
    {title: 'Powered by', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Разработано с помощью', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Powered by', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]},
    {title: 'Powered by', font: 'Impact', size: 52, dimensions: false, color: [255, 255, 255]}
  ],
  'credits-title-19': [
    {title: 'Exodus', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Exodus', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Exodus', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: 'Exodus', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-20': [
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-21': [
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'credits-title-22': [
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [21, 157, 191]}
  ],
  'store-title-0': [
    {title: 'Rockets', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Ракеты', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Foguetes', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Fusées', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]}
  ],
  'store-title-1': [
    {title: 'Creatures', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Существа', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Criaturas', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Créatures', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]}
  ],
  'store-title-2': [
    {title: 'Bonuses', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Бонусы', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Bonus', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Bonus', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]}
  ],
  'store-title-3': [
    {title: 'Points', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Точки', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Pontos', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Points', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]}
  ],
  'store-title-4': [
    {title: 'Coins', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Монеты', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Moedas', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]},
    {title: 'Pièces', font: 'Impact', size: 42, dimensions: false, color: [21, 176, 191]}
  ],
  'store-no-items-title': [
    {title: 'No Items', font: 'Impact', size: 48, dimensions: false, color: [255, 255, 255]},
    {title: 'Нет позиций', font: 'Impact', size: 48, dimensions: false, color: [255, 255, 255]},
    {title: 'Sem items', font: 'Impact', size: 48, dimensions: false, color: [255, 255, 255]},
    {title: 'Pas d\'objets', font: 'Impact', size: 48, dimensions: false, color: [255, 255, 255]}
  ],
  'store-no-items-description': [
    {title: 'There is no items.\nWe are working hard to add\nmore content for you.', font: 'Impact', size: 36, dimensions: false, color: [255, 255, 255]},
    {title: 'В этом разделе нет позиций\nМы много работаем чтобы\nдобавить больше контента для вас.', font: 'Impact', size: 36, dimensions: false, color: [255, 255, 255]},
    {title: 'Não existem items.\nEstamos a trabalhar para adicionar\nmais conteúdo para ti.', font: 'Impact', size: 36, dimensions: false, color: [255, 255, 255]},
    {title: 'Il n\'y a pas d\'objets,\nrevenez bientôt.', font: 'Impact', size: 36, dimensions: false, color: [255, 255, 255]}
  ],
  'store-refresh': [
    {title: 'Refresh to see is content were added.', font: 'Impact', size: 24, dimensions: false, color: [255, 255, 255]},
    {title: 'Обновить. Вдруг мы уже добавили много нового?', font: 'Impact', size: 24, dimensions: false, color: [255, 255, 255]},
    {title: 'Recarrega para ver se há conteúdo novo.', font: 'Impact', size: 24, dimensions: false, color: [255, 255, 255]},
    {title: 'Rafraîchir la page pour voir le contenu ajouté.', font: 'Impact', size: 24, dimensions: false, color: [255, 255, 255]}
  ],
  'store-price': [
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [228, 149, 81]}
  ],
  'store-count': [
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 32, dimensions: false, color: [228, 149, 81]}
  ],
  'store-purchase': [
    {title: '     Purchase', font: 'Impact', size: 28, dimensions: false, color: [228, 149, 81]},
    {title: '  Купить', font: 'Impact', size: 28, dimensions: false, color: [228, 149, 81]},
    {title: '     Comprar', font: 'Impact', size: 28, dimensions: false, color: [228, 149, 81]},
    {title: '     Achat', font: 'Impact', size: 28, dimensions: false, color: [228, 149, 81]}
  ],
  'store-select': [
    {title: 'Select', font: 'Impact', size: 28, dimensions: false, color: [228, 149, 81]},
    {title: 'Выбрать', font: 'Impact', size: 28, dimensions: false, color: [228, 149, 81]},
    {title: 'Selecionar', font: 'Impact', size: 28, dimensions: false, color: [228, 149, 81]},
    {title: 'Selectionné', font: 'Impact', size: 28, dimensions: false, color: [228, 149, 81]}
  ],
  'store-selected': [
    {title: 'You have selected this item', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Вы выбрали эту позицию', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Tu selecionaste este item', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Vous avez selectionné cet objet', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-coins': [
    {title: '$1', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]},
    {title: '$1', font: 'Impact', size: 42, dimensions: false, color: [228, 149, 81]}
  ],
  'store-item-title-1-1': [
    {title: 'Simple Orange Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Оранжевая ракета', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Simple Orange Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Simple Orange Rocket', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-2': [
    {title: 'Rise', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Rise', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Rise', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Rise', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-3': [
    {title: 'Phantom', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Phantom', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Phantom', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Phantom', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-4': [
    {title: 'Missyfier', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Missyfier', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Missyfier', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Missyfier', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-5': [
    {title: 'Tornado', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Tornado', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Tornado', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Tornado', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-6': [
    {title: 'Redsoker', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Redsoker', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Redsoker', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Redsoker', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-7': [
    {title: 'Foggy', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Foggy', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Foggy', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Foggy', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-8': [
    {title: 'Gravitsapa', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Gravitsapa', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Gravitsapa', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Gravitsapa', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-9': [
    {title: 'Spacewalker', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Spacewalker', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Spacewalker', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Spacewalker', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-10': [
    {title: 'Punisher', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Punisher', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Punisher', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Punisher', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-11': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-12': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-13': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-14': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-15': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-16': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-17': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-18': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-19': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-20': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-21': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-22': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-23': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-24': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-25': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-26': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-27': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-28': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-29': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-30': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-31': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-32': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-33': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-34': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-35': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-1-36': [
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-2-1': [
    {title: 'Human', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Человек', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Humano', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Humain', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-2-2': [
    {title: 'Stegosaurus', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Стегозавр', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Stegosaurus', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Stegosaurus', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-2-3': [
    {title: 'Apatosaurus', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Апатозавр', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Apatosaurus', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Apatosaurus', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-2-4': [
    {title: 'Triceratops', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Трицераптор', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Triceratops', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Triceratops', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-3-1': [
    {title: 'Coins Magnet', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Магнит монеток', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Íman de Moedas', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Aimant à pièces', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-3-2': [
    {title: 'Lucky Horseshoe', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Счастливая подкова', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Ferradura da Sorte', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: 'Fer à cheval', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-5-1': [
    {title: '200 coins', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '200 монет', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '200 moedas', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '200 pièces', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-5-2': [
    {title: '500 coins', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '500 монет', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '500 moedas', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '500 pièces', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-title-5-3': [
    {title: '1000 coins', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '1000 монет', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '1000 moedas', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]},
    {title: '1000 pièces', font: 'Impact', size: 64, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-1': [
    {title: 'Simple orange rocket available by default.\n You can change it.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Простая оранжевая ракета доспуна\n по-умолчанию. Вы можете сменить ее.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-2': [
    {title: 'Simple white rocket available by default.\n You can change it.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Простая белая ракета доспуна\n по-умолчанию. Вы можете сменить ее.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-3': [
    {title: 'Simple red rocket available by default.\n You can change it.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Простая красная ракета доспуна\n по-умолчанию. Вы можете сменить ее.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-4': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-5': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-6': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-7': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-8': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-9': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-10': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-11': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-12': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-13': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-14': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-15': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-16': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-17': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-18': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-19': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-20': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-21': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-22': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-23': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-24': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-25': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-26': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-27': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-28': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-29': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-30': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-31': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-32': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-33': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-34': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-35': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-1-36': [
    {title: 'Some Additional Rocket.\n Description and name is coming soon.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Дополнительная ракета.\n Описание будет добавлено позже.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: '', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-2-1': [
    {title: 'Rocket will be more easy to control.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Большая команда всегда хорошо!\n Ракета будет легче в управляемости.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'O rocket será mais fácil de controlar.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'La fusée sera plus facilement dirigeable.', font: 'Impact', size: 26, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-2-2': [
    {title: 'Stegosaurus can save the rocket from crash\n with 25% probability.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Стегозавр может спасти ракету от крушения\n с вероятностью 25%.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Stegosaurus pode salvar o foguete de\n se despenhar com 25% de probabilidade.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Le Stegosaurus a 25% de chance\n de sauver la fusée lors d\'un crash.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-2-3': [
    {title: 'Apatosaurus so huge!!\n It slows down the rocket.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Апатозавр настолько тяжелый, что\n замедляет ракету.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Apatosaurus é tão grande!!\n Ele reduz a velocidade do foguete.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Le Apatosaurus est énorme !!\n Il ralentit la vitesse de la fusée.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-2-4': [
    {title: 'Triceratops absorbs rocket\'s vibrations\n in areas of turbulence', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Трицераптор поглощает колебания ракеты\n в зонах турбулентности.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Triceratops absorve as vibrações\n do foguete em zonas de turbulência.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Le Triceratops absorbe les vibrations\n de la fusée lors des zones de turbulence.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-3-1': [
    {title: 'Coins Magnet collect all coins automatically.\n No need to tap on each coin.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Магнит собирает монетки автоматически.\n Вам не нужно жать на каждую монетку.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'O Íman de moedas coleciona as moedas automaticamente.\n Não precisas de tocar nas moedas.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'L\'aimant à pièces collecte automatiquement\n toutes les pièces. Pas besoin d\'appuyer sur les pièces.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-3-2': [
    {title: 'Increases the probability of a\n coin for 2 times.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Увеличивает вероятность появления\n монетки в 2 раза.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Aumenta a probabilidade de uma moeda\n aparecer em 2 vezes mais.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Augmente la probabilité d\'obtenir 2 pièces au lieu d\'une.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-5-1': [
    {title: 'Get 200 coins only for $1.99\n Any purchase will remove the ads.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Получите 200 монет всего за $1.99\n Любая покупка отключит рекламу.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Compra 200 moedas por apenas $1.99\n Qualquer compra irá remover os ads.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Acheter 200 pièces pour $1.99\nToute achat retirera définitivement les publicités.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-5-2': [
    {title: 'Get 500 coins only for $2.99\n Any purchase will remove the ads.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Получите 500 монет всего за $2.99\n Любая покупка отключит рекламу.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Compra 500 moedas por apenas $2.99\n Qualquer compra irá remover os ads.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Acheter 500 pièces pour $2.99\nToute achat retirera définitivement les publicités.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'store-item-description-5-3': [
    {title: 'Get 1000 coins only for $4.99\n Any purchase will remove the ads.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Получите 1000 монет всего за $4.99\n Любая покупка отключит рекламу.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Compra 1000 moedas por apenas $4.99\n Qualquer compra irá remover os ads.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Acheter 1000 pièces pour $4.99\nToute achat retirera définitivement les publicités.', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'tutorial-text-1': [
    {title: 'HOW TO PLAY', font: 'Impact', size: 112, dimensions: false, color: [255, 255, 255]},
    {title: 'КАК ИГРАТЬ', font: 'Impact', size: 122, dimensions: false, color: [255, 255, 255]},
    {title: 'INSTRUÇÕES', font: 'Impact', size: 122, dimensions: false, color: [255, 255, 255]},
    {title: 'Comment jouer', font: 'Impact', size: 100, dimensions: false, color: [255, 255, 255]}
  ],
  'tutorial-text-2': [
    {title: 'TAP FASTER TO FILL THE ROCKET', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Нажимайте быстрее чтобы заполнить ракету', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'TOCA RÁPIDO PARA ENCHER O FOGUETE', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'APPUYER RAPIDEMENT POUR REMPLIR LA FUSÉE', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'tutorial-text-3': [
    {title: 'TAP WHEN THE ROCKET\nWILL FLY THROUGH THE GREEN POINT', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'Нажимайте когда ракета пролетает\nчерез зеленую точку', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'TOCA QUANDO O FOGUETE PASSAR PELO PONTO VERDE', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]},
    {title: 'APPUYER QUAND LA FUSÉE SURVOLE LE ROND VERT', font: 'Impact', size: 32, dimensions: false, color: [255, 255, 255]}
  ],
  'share-message': [
    {title: 'OMG! I\'ve got $1 points playing Exodus! #Exodus ', font: 'Impact', size: 0, dimensions: false},
    {title: 'Ого! Я достиг $1 очков в игре Exodus! #Exodus ', font: 'Impact', size: 0, dimensions: false},
    {title: 'OMG! Eu ganhei $1 pontos a jogar Exodus! #Exodus ', font: 'Impact', size: 0, dimensions: false},
    {title: 'OMG! J\'ai obtenu $1 points pour avoir joué Exodus! #Exodus ', font: 'Impact', size: 0, dimensions: false}
  ]
};
