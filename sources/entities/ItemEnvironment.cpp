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

#include "ItemEnvironment.h"

#include "Game.h"
#include "Store.h"
#include "Missions.h"

/**
 *
 *
 *
 */
ItemEnvironment::ItemEnvironment(Json* document)
: Item(document)
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
      DelayTime::create(1.0),
      CallFunc::create([=] ()
      {
        Modal::hide();
      }),
      nullptr
    )
  );

  Sound->play("gift");

  Analytics::sendEvent("Store", "store.events.onPurchase", "Environment purchased", this->i);
}

void ItemEnvironment::onSelect()
{
  Item::onSelect();

  for(auto item : Store::getInstance()->items.environments)
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

  Storage::set("items.environment.current", this->i - 1);

  Analytics::sendEvent("Store", "store.events.onPurchase", "Environment selected", this->i);
}

/**
 *
 *
 *
 */
void ItemEnvironment::updateState()
{
  Item::updateState();

  /**
   *
   *
   *
   */
  switch(this->state)
  {
    case STATE_NORMAL:
    case STATE_SELECTED:
    this->nams->setPosition(this->getContentSize().width / 2, 35);
    break;
  }
}
