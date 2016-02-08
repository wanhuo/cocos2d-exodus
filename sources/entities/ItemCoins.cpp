/**
 * Tooflya Inc. Development
 *
 * @author Igor Mats from Tooflya Inc.
 * @copyright (c) 2015 by Igor Mats
 * @copyright (c) 2016 by Igor Mats
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
 * @cocos2d
 *
 */

#include "ItemCoins.h"

#include "Game.h"
#include "Store.h"
#include "Missions.h"

/**
 *
 *
 *
 */
ItemCoins::ItemCoins()
{
  this->setContentSize(Size(620, 200));
}

ItemCoins::~ItemCoins()
{
}

/**
 *
 *
 *
 */
void ItemCoins::onTouchStart(cocos2d::Touch* touch, Event* e)
{
  Node::onTouchStart(touch, e);

  /**
   *
   *
   *
   */
  auto action = EaseSineInOut::create(
    ScaleTo::create(0.2, 0.95)
  );
  action->setTag(1);

  this->runAction(action);
}

void ItemCoins::onTouchFinish(cocos2d::Touch* touch, Event* e)
{
  this->stopActionByTag(1);
  this->setScale(1);

  Node::onTouchFinish(touch, e);
}

void ItemCoins::onTouchCancelled(cocos2d::Touch* touch, Event* e)
{
  Node::onTouchCancelled(touch, e);

  this->stopActionByTag(1);
  this->setScale(1.0);
}

/**
 *
 *
 *
 */
void ItemCoins::onTouch(cocos2d::Touch* touch, Event* e)
{
  Purchase::purchaseItem(this->id, [=] (bool status) {
    if(status)
    {
      int particles = 0;
      int coins = 0;

      switch(this->i)
      {
        case 1:
        particles = 20;
        coins = 200;
        break;
        case 2:
        particles = 50;
        coins = 500;
        break;
        case 3:
        particles = 100;
        coins = 1000;
        break;
      }

      Game::getInstance()->onNoadAction();
      Store::getInstance()->createCoins(particles, coins);
    }
  });
}
