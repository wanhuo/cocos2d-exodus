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

  this->coin->setLocalZOrder(1);

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
void Item::onParametersCreated()
{
  if(strlen(this->name) > 0)
  {
    this->texts.name = new Text(this->name, this);
  }
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

  //this->state = Storage::get(this->id);
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
void Item::onPurchase()
{
  Store::getInstance()->removeCoins(this->coins);

  Application->parameters.creatures = true;
}

void Item::onSelect()
{
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
  Color3B color;

  switch(this->state)
  {
    default:
    color = Color3B(100, 204, 223);
    break;
    case STATE_SELECTED:
    color = Color3B(237, 101, 100);
    break;
  }

  auto action = EaseSineInOut::create(
    TintTo::create(0.2, color)
  );
  action->setTag(1);

  this->runAction(action);
}

void Item::onTouchFinish(cocos2d::Touch* touch, Event* e)
{
  this->stopActionByTag(1);

  switch(this->state)
  {
    default:
    this->setColor(Color3B(132, 209, 223));
    break;
    case STATE_SELECTED:
    this->setColor(Color3B(237, 115, 113));
    break;
  }

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

  switch(this->state)
  {
    default:
    this->setColor(Color3B(132, 209, 223));
    break;
    case STATE_SELECTED:
    this->setColor(Color3B(237, 115, 113));
    break;
  }
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
      this->onPurchase();
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
        this->onPurchase();
      }
      else
      {
        Store::getInstance()->list->scrollToPage(3);
      }
    }
    else
    {
      this->setState(STATE_SELECTED);
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

  this->updateState();

  switch(this->state)
  {
    case STATE_SELECTED:
    this->onSelect();
    break;
  }

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

  if(strlen(this->name) > 0)
  {
    this->texts.name->_destroy();
  }

  if(this->capacity > 0)
  {
    this->texts.count->_destroy();
  }
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

      this->texts.count->_create();

      this->texts.coins->data(this->coins);
      this->texts.count->data(this->capacity);
    }
    break;
  }

  switch(this->state)
  {
    case STATE_NORMAL:
    case STATE_SELECTED:
    if(strlen(this->name) > 0)
    {
      this->texts.name->_create();
    }
    break;
  }

  switch(this->state)
  {
    default:
    this->setColor(Color3B(132, 209, 223));
    break;
    case STATE_SELECTED:
    this->setColor(Color3B(237, 115, 113));
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
 *
 *
 *
 */
void ItemCharacter::onPurchase()
{
  this->runAction(
    Sequence::create(
      CallFunc::create([=] ()
      {
        Modal::block();
      }),
      Repeat::create(
        Sequence::create(
          ScaleTo::create(0.05, 0.9),
          ScaleTo::create(0.05, 1.1),
          nullptr
        ),
        12
      ),
      ScaleTo::create(0.05, 1.0),
      CallFunc::create([=] ()
      {
        Item::onPurchase();

        /**
         *
         *
         *
         */
        this->setState(STATE_SELECTED);
      }),
      CallFunc::create([=] ()
      {
        static_cast<StoreLayoutCharacters*>(Store::getInstance()->list->getPage(0))->updateTextData();
      }),
      DelayTime::create(1.0),
      CallFunc::create([=] ()
      {
        Modal::hide();
      }),
      nullptr
    )
  );

  int count = 1;

  for(auto item : Store::getInstance()->items.characters)
  {
    switch(item->state)
    {
      case Item::STATE_SELECTED:
      case Item::STATE_NORMAL:
      count++;
      break;
    }
  }

  /**
   *
   * @Services
   * Update achievements.
   *
   */
  if(count >= 5)
  {
    Services::achievements->update(SERVICES_ACHIEVEMENTS_UNLOCK_CHARACTERS_5);
  }
  if(count >= 10)
  {
    Services::achievements->update(SERVICES_ACHIEVEMENTS_UNLOCK_CHARACTERS_10);
  }
  if(count >= 15)
  {
    Services::achievements->update(SERVICES_ACHIEVEMENTS_UNLOCK_CHARACTERS_15);
  }
  if(count >= 20)
  {
    Services::achievements->update(SERVICES_ACHIEVEMENTS_UNLOCK_CHARACTERS_20);
  }
  if(count >= 25)
  {
    Services::achievements->update(SERVICES_ACHIEVEMENTS_UNLOCK_CHARACTERS_25);
  }

  Sound->play("gift");

  Analytics::sendEvent("Store", "store.events.onPurchase", "Character purchased", this->i);
}

void ItemCharacter::onSelect()
{
  for(auto item : Store::getInstance()->items.characters)
  {
    if(item->state == STATE_SELECTED)
    {
      if(this->i != item->i)
      {
        item->setState(STATE_NORMAL);
      }
    }
  }

  this->runAction(
    Sequence::create(
      EaseSineInOut::create(
        ScaleTo::create(0.2, 0.9)
      ),
      EaseSineInOut::create(
        ScaleTo::create(0.2, 1.1)
      ),
      EaseSineInOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      nullptr
    )
  );

  Sound->play("touch");

  Storage::set("items.character.current", this->i - 1);

  Application->character->updateSkin();

  Analytics::sendEvent("Store", "store.events.onSelect", "Character selected", this->i);
}

/**
 *
 *
 *
 */
void ItemCharacter::updateState()
{
  Item::updateState();

  switch(this->state)
  {
    case STATE_NORMAL:
    case STATE_SELECTED:
    if(strlen(this->name) > 0)
    {
      this->texts.name->setPosition(this->getContentSize().width / 2, 32);
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
ItemCreature::ItemCreature()
{
  this->setContentSize(Size(300, 300));

  this->texts.count = new Text("store-items-count", this);
  this->texts.count->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2);
}

ItemCreature::~ItemCreature()
{
}

/**
 *
 *
 *
 */
void ItemCreature::onPurchase()
{
  this->runAction(
    Sequence::create(
      CallFunc::create([=] ()
      {
        Modal::block();
      }),
      Repeat::create(
        Sequence::create(
          ScaleTo::create(0.05, 0.9),
          ScaleTo::create(0.05, 1.1),
          nullptr
        ),
        12
      ),
      ScaleTo::create(0.05, 1.0),
      CallFunc::create([=] ()
      {
        Item::onPurchase();

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
      }),
      DelayTime::create(1.0),
      CallFunc::create([=] ()
      {
        Modal::hide();
      }),
      nullptr
    )
  );

  Sound->play("gift");

  Analytics::sendEvent("Store", "store.events.onPurchase", "Creature purchased", this->i);
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
    }
    break;
    case STATE_NORMAL:
    break;
  }

  switch(this->state)
  {
    case STATE_NORMAL:
    case STATE_SELECTED:
    if(strlen(this->name) > 0)
    {
      this->texts.name->setPosition(this->getContentSize().width / 2, 86);
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
ItemEnvironment::ItemEnvironment()
{
  this->setContentSize(Size(620, 200));
}

ItemEnvironment::~ItemEnvironment()
{
}

/**
 *
 *
 *
 */
void ItemEnvironment::onPurchase()
{
  Item::onPurchase();

  Analytics::sendEvent("Store", "store.events.onPurchase", "Environment purchased", this->i);
}

void ItemEnvironment::onSelect()
{
  Item::onSelect();

  Analytics::sendEvent("Store", "store.events.onPurchase", "Environment selected", this->i);
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
