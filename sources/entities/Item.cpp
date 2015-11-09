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
 * @cocos2d
 *
 */

#include "Item.h"

#include "Game.h"
#include "Store.h"
#include "Missions.h"

/**
 *
 *
 *
 */
Item::Item()
: BackgroundColor(Color4B(132, 209, 223, 255))
{
  this->coin = new Entity("counter-coins.png", this);
  this->lock = new Entity("lock.png", this);

  this->texts.missions = new Text("store-state-missions", this);
  this->texts.coins = new Text("coins", this->coin, true);

  this->texts.coins->setPosition(this->coin->getContentSize().width / 2, this->coin->getContentSize().height / 2);

  this->ignoreAnchorPointForPosition(false);
  this->setAnchorPoint(Vec2(0.5, 0.5));

  this->bind(true, false);
}

Item::~Item()
{
}

/**
 *
 *
 *
 */
void Item::onEnter()
{
  BackgroundColor::onEnter();

  /**
   *
   *
   *
   */
  this->Node::state->create = true;

  this->state = Storage::get(this->id);
  this->updateState();
}

void Item::onExit()
{
  BackgroundColor::onExit();

  /**
   *
   *
   *
   */
  this->Node::state->create = false;

  this->resetState();
}

/**
 *
 *
 *
 */
void Item::onBuy()
{
  Application->counter->values.coins -= this->coins;

  Application->counter->save();
  Application->parameters.creatures = true;
}

/**
 *
 *
 *
 */
void Item::onTouchStart(cocos2d::Touch* touch, Event* e)
{
  Node::onTouchStart(touch, e);

  /**
   *
   *
   *
   */
  auto action = EaseSineInOut::create(
    TintTo::create(0.2, Color3B(100, 204, 223))
  );
  action->setTag(1);

  this->runAction(action);
}

void Item::onTouchFinish(cocos2d::Touch* touch, Event* e)
{
  this->stopActionByTag(1);
  this->setColor(Color3B(132, 209, 223));

  Node::onTouchFinish(touch, e);
}

void Item::onTouchCancelled(cocos2d::Touch* touch, Event* e)
{
  Node::onTouchCancelled(touch, e);

  /**
   *
   *
   *
   */
  this->stopActionByTag(1);
  this->setColor(Color3B(132, 209, 223));
}

/**
 *
 *
 *
 */
void Item::onTouch(cocos2d::Touch* touch, Event* e)
{
  switch(this->state)
  {
    case STATE_LOCKED:
    break;
    case STATE_LOCKED_MISSIONS:
    Missions::getInstance()->show();
    break;
    case STATE_LOCKED_COINS:
    if(Application->counter->values.coins >= this->coins)
    {
      this->onBuy();
    }
    else
    {
      Store::getInstance()->list->scrollToPage(3);
    }
    break;
    case STATE_NORMAL:
    if(this->capacity)
    {
      if(Application->counter->values.coins >= this->coins)
      {
        this->onBuy();
      }
      else
      {
        Store::getInstance()->list->scrollToPage(3);
      }
    }
    break;
  }

  switch(this->state)
  {
    case STATE_LOCKED:
    Sound->play("disable");
    break;
    case STATE_LOCKED_MISSIONS:
    case STATE_LOCKED_COINS:
    Sound->play("touch");
    break;
    case STATE_NORMAL:
    break;
  }
}

/**
 *
 *
 *
 */
void Item::setState(int state)
{
  this->state = state;

  Storage::set(this->id, this->state);
}

/**
 *
 *
 *
 */
void Item::resetState()
{
  this->coin->_destroy();
  this->lock->_destroy();

  this->texts.missions->_destroy();
}

/**
 *
 *
 *
 */
void Item::updateState()
{
  this->resetState();

  switch(this->state)
  {
    case STATE_LOCKED:
    break;
    case STATE_LOCKED_MISSIONS:
    if(MissionsFactory::getInstance()->getCompletedMissionsCount() >= this->missions)
    {
      if(this->coins)
      {
        this->setState(STATE_LOCKED_COINS);
        this->updateState();
      }
      else
      {
        // TODO: How it may be possible?
      }
    }
    else
    {
      this->lock->_create();
      this->lock->setScale(0.75);
      this->lock->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 + 20);

      this->texts.missions->_create();
      this->texts.missions->setPosition(this->getContentSize().width / 2, 35);
      this->texts.missions->data(this->missions);
    }
    break;
    case STATE_LOCKED_COINS:
    this->lock->_create();
    this->lock->setScale(0.75);
    this->lock->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 + 20);

    this->coin->_create();
    this->coin->setScale(0.75);
    this->coin->setPosition(this->getContentSize().width / 2, 35);

    this->texts.coins->data(this->coins);
    break;
    case STATE_NORMAL:
    if(this->picture)
    {
      this->picture->_create()->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2);
    }

    if(this->capacity > 0)
    {
      this->coin->_create();
      this->coin->setScale(0.75);
      this->coin->setPosition(this->getContentSize().width / 2, 35);

      this->texts.coins->data(this->coins);
    }

    if(this->count)
    {
      this->count->_create();

      this->texts.count->data(this->capacity);
    }
    break;
  }
}

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
 * @cocos2d
 *
 */
ItemCharacter::ItemCharacter()
{
  this->setContentSize(Size(300, 200));
}

ItemCharacter::~ItemCharacter()
{
}

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
 * @cocos2d
 *
 */
ItemCreature::ItemCreature()
{
  this->setContentSize(Size(300, 300));

  this->count = new BackgroundColor(this, Color4B(128, 186, 117, 255));
  this->count->ignoreAnchorPointForPosition(false);
  this->count->setAnchorPoint(Vec2(0.0, 1.0));
  this->count->setContentSize(Size(300, 60));
  this->count->setPosition(0, 300);
  this->count->_destroy();

  this->texts.count = new Text("store-items-count", this->count, true);
  this->texts.count->setPosition(this->count->getContentSize().width / 2, this->count->getContentSize().height / 2);
}

ItemCreature::~ItemCreature()
{
}

/**
 *
 *
 *
 */
void ItemCreature::onBuy()
{
  Item::onBuy();

  /**
   *
   *
   *
   */
  switch(this->i)
  {
    case 1:
    Application->counter->missionUpdateProgress.special_progress_1++;
    break;
    case 2:
    Application->counter->missionUpdateProgress.special_progress_2++;
    break;
    case 3:
    Application->counter->missionUpdateProgress.special_progress_3++;
    break;
    case 4:
    Application->counter->missionUpdateProgress.special_progress_4++;
    break;
  }

  Storage::set(string(this->id) + ".count", ++this->capacity);

  this->updateState();
}

/**
 *
 *
 *
 */
void ItemCreature::updateState()
{
  Item::updateState();

  /**
   *
   *
   *
   */
  switch(this->state)
  {
    case STATE_LOCKED_COINS:
    if(this->capacity > 0)
    {
      this->setState(STATE_NORMAL);
      this->updateState();
    }
    break;
    case STATE_NORMAL:
    break;
  }
}

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
 * @cocos2d
 *
 */
ItemEnvironment::ItemEnvironment()
{
  this->setContentSize(Size(620, 200));
}

ItemEnvironment::~ItemEnvironment()
{
}

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
 * @cocos2d
 *
 */
ItemCoins::ItemCoins()
{
  this->setContentSize(Size(620, 200));
}

ItemCoins::~ItemCoins()
{
}
