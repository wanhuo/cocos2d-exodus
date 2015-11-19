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
Item::Item(Json* document)
: Item()
{
  this->id = Json_getString(document, "id", "");
  this->name = Json_getString(document, "name", "");
  this->missions = Json_getInt(document, "missions", 0);
  this->coins = Json_getInt(document, "coins", 0);
  this->i = Json_getInt(document, "i", 0);
  this->capacity = max(Json_getInt(document, "capacity", 0), Storage::get(string(this->id) + ".count"));

  if(strlen(Json_getString(document, "picture", "")) > 0)
  {
    this->picture = new Entity(Json_getString(document, "picture", ""), this);
  }
  if(strlen(this->name) > 0)
  {
    this->texts.name = new Text(this->name, this->nams, true);
    this->texts.name->setPosition(this->nams->getWidth() / 2, this->nams->getHeight() / 2);
  }

  this->state = Storage::get(this->id);

  if(!this->state)
  {
    if(this->missions)
    {
      this->setState(Item::STATE_LOCKED_MISSIONS);
    }
    else if(this->coins)
    {
      this->setState(Item::STATE_LOCKED_COINS);
    }
  }

  this->saveState();
}

Item::Item()
: BackgroundColor(Color4B(132, 209, 223, 255))
{
  this->coin = new Entity("counter-coins.png", this);
  this->nams = new Entity("store-name.png", this);
  this->lock = new Entity("lock.png", this);

  this->texts.missions = new Text("store-state-missions", this);
  this->texts.coins = new Text("coins", this->coin, true);

  this->texts.coins->setPosition(this->coin->getContentSize().width / 2, this->coin->getContentSize().height / 2);

  this->ignoreAnchorPointForPosition(false);
  this->setAnchorPoint(Vec2(0.5, 0.5));
  
  this->coin->setScale(0.75);
  this->nams->setScale(0.75);
  this->lock->setScale(0.75);

  this->coin->setLocalZOrder(1);
  this->nams->setLocalZOrder(2);

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
  Application->parameters.creatures = true;

  Store::getInstance()->removeCoins(this->coins);
}

void Item::onSelect()
{
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

      Sound->play("disable");

      return;
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

        Sound->play("disable");

        return;
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
void Item::setPicture(Entity* picture)
{
  this->picture = picture;
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

  this->saveState();
}

/**
 *
 *
 *
 */
void Item::saveState()
{
  Storage::set(this->id, this->state);
  Storage::set(string(this->id) + ".count", this->capacity);
}

void Item::resetState()
{
  this->coin->_destroy();
  this->nams->_destroy();
  this->lock->_destroy();

  this->texts.missions->_destroy();

  if(this->note)
  {
    this->note->_destroy();
  }
}

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
      this->lock->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 + 20);

      this->texts.missions->_create();
      this->texts.missions->setPosition(this->getContentSize().width / 2, 35);
      this->texts.missions->data(this->missions);
    }
    break;
    case STATE_LOCKED_COINS:
    this->lock->_create();
    this->lock->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 + 20);

    this->coin->_create();
    this->coin->setPosition(this->getContentSize().width / 2, 35);

    this->texts.coins->data(this->coins);
    break;
    case STATE_NORMAL:
    case STATE_SELECTED:
    if(this->picture)
    {
      this->picture->_create()->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2);
      this->picture->setLocalZOrder(1);
    }

    if(this->capacity > 0)
    {
      this->coin->_create();
      this->coin->setPosition(this->getContentSize().width / 2, 35);

      this->note->_create();

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
      this->nams->_create();
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
