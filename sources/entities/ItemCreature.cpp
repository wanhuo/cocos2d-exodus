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

#include "ItemCreature.h"

#include "Game.h"
#include "Store.h"
#include "Missions.h"

/**
 *
 *
 *
 */
ItemCreature::ItemCreature(Json* document)
: Item(document)
{
  this->setContentSize(Size(300, 300));

  this->note = new Entity("notification.png", this->nams);

  this->note->setPosition(this->nams->getWidth() - 10, this->nams->getHeight() - 10);
  this->note->setScale(1.25);

  this->texts.count = new Text("items-count", this->note, true);
  this->texts.count->setPosition(this->note->getContentSize().width / 2, this->note->getContentSize().height / 2);
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
  if(this->capacity > 0)
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
    Sound->play("instant-purchase");
  }
  else
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
  }

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
    this->nams->setPosition(this->getContentSize().width / 2, 86);

    if(this->picture)
    {
      this->picture->_create()->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 + 50);
    }
    break;
  }
}
