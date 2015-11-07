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

#include "Mission.h"

#include "Game.h"
#include "Missions.h"

/**
 *
 *
 *
 */
Mission::Mission(int id)
: BackgroundColor(Missions::getInstance()->scroll, Color4B(132, 209, 223, 255))
{
  this->id = id;
  this->mission = MissionsFactory::getInstance()->getMission(this->id);

  int size = MissionsFactory::getInstance()->getMissions().size() - 1;

  float x = Application->center.x;
  float y = Missions::getInstance()->parameters.padding + (size - this->id) * 220;

  this->ignoreAnchorPointForPosition(false);
  this->setAnchorPoint(Vec2(0.5, 0.5));
  this->setContentSize(Size(Application->width - 100, 200));
  this->setPosition(x, y);

  this->progressBackground = new BackgroundColor(this, Color4B(255, 255, 255, 255));
  this->progressBar = new BackgroundColor(this, Color4B(237, 113, 115, 255));

  this->coins = new Entity("counter-coins.png", this);
  this->lock = new Entity("lock.png", this);

  this->texts.mission = new Text(this->mission->text, this);
  this->texts.additional = new Text("mission-additional-reward", this);
  this->texts.coins = new Text("coins", this->coins, true);

  this->lock->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2);
  this->coins->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 - 70);

  this->texts.coins->setPosition(this->coins->getContentSize().width / 2, this->coins->getContentSize().height / 2);

  this->coins->setScale(0.75);

  this->progressBackground->ignoreAnchorPointForPosition(false);
  this->progressBar->ignoreAnchorPointForPosition(false);

  this->progressBackground->setAnchorPoint(Vec2(0.5, 0.5));
  this->progressBar->setAnchorPoint(Vec2(0.0, 0.5));

  this->progressBackground->setContentSize(Size(Application->width - 300, 30));
  this->progressBar->setContentSize(Size(Application->width - 300 - 10, 20));

  this->progressBackground->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 - 70);
  this->progressBar->setPosition(this->getContentSize().width / 2 - (Application->width - 300) / 2 + 5, this->getContentSize().height / 2 - 70);

  this->progressBackground->_destroy();
  this->progressBar->_destroy();
}

Mission::~Mission()
{
}

/**
 *
 *
 *
 */
void Mission::onEnter()
{
  BackgroundColor::onEnter();

  /**
   *
   *
   *
   */
  switch(this->mission->state)
  {
    case MissionStruct::STATE_LOCKED:
    this->lock->_create();
    break;
    case MissionStruct::STATE_CURRENT:
    this->texts.mission->_create();

    switch(this->mission->type)
    {
      case MissionStruct::TYPE_ONCE:
      if(this->mission->coins)
      {
        this->coins->_create();
        this->texts.additional->_create();
        this->texts.additional->setText("mission-additional-reward");

        this->texts.mission->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 + 50);
        this->texts.additional->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 - 20);

        this->texts.coins->data(this->mission->coins);
      }
      else
      {
        this->texts.mission->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2);
      }
      break;
      case MissionStruct::TYPE_PROGRESS:
      this->texts.additional->_create();
      this->texts.additional->setText("mission-progress");

      this->texts.mission->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 + 50);
      this->texts.additional->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 - 20);

      this->progressBackground->_create();
      this->progressBar->_create();

      this->progressBar->setContentSize(Size((Application->width - 300 - 10) * this->mission->progress / 100.0, 20));
      break;
    }
    break;
    case MissionStruct::STATE_CLAIM:
    this->bind(true);

    this->setScale(1.0);
    this->runAction(
      RepeatForever::create(
        Sequence::create(
          EaseSineInOut::create(
            ScaleTo::create(2.0, 1.05)
          ),
          EaseSineInOut::create(
            ScaleTo::create(2.0, 1.0)
          ),
          nullptr
        )
      )
    );
    break;
    case MissionStruct::STATE_FINISHED:
    // WTF? O_o
    break;
  }
}

void Mission::onExit()
{
  BackgroundColor::onExit();

  /**
   *
   *
   *
   */
  this->lock->_destroy();

  this->texts.mission->_destroy();
  this->texts.additional->_destroy();

  this->progressBackground->_destroy();
  this->progressBar->_destroy();

  this->bind(false);
}
