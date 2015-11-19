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

#include "Missions.h"

#include "Game.h"
#include "Finish.h"

/**
 *
 *
 *
 */
Missions* Missions::instance;

/**
 *
 *
 *
 */
Missions* Missions::getInstance()
{
  return instance;
}

/**
 *
 *
 *
 */
Missions::Missions()
: Coins(true)
{
  instance = this;

  this->background = new BackgroundColor(this, Color4B(235, 255, 255, 255));
  this->holder1 = new BackgroundColor(this, Color4B(132, 209, 223, 255));
  this->holder2 = new Entity("holder-background-1.png", this, true);

  this->scroll = new BackgroundScroll(this->background);
  this->scroll->setDirection(cocos2d::ui::ScrollView::Direction::VERTICAL);
  this->scroll->setBounceEnabled(true);
  this->scroll->setContentSize(Size(Application->width, Application->height - 400));
  this->scroll->setPositionY(0);

  this->holder1->setContentSize(Size(Application->width, 400));

  this->holder1->ignoreAnchorPointForPosition(false);

  this->holder1->setAnchorPoint(Vec2(0.5, 1.0));

  this->holder1->setPosition(Application->center.x, Application->height);
  this->holder2->setPosition(Application->center.x, Application->height - 400);

  this->texts.title1 = new Text("missions-title-1", this->holder1, true);
  this->texts.title2 = new Text("missions-title-2", this->holder2, true);

  this->texts.title1->setPosition(this->holder1->getContentSize().width / 2, this->holder1->getContentSize().height / 2);
  this->texts.title2->setPosition(this->holder2->getContentSize().width / 2, this->holder2->getContentSize().height / 2);

  int counter = 0;

  for(auto m : MissionsFactory::getInstance()->getMissions())
  {
    this->missions.push_back(new Mission(counter));

    counter++;
  }

  this->updateListHeight();
}

Missions::~Missions()
{
}

/**
 *
 *
 *
 */
void Missions::onEnter()
{
  Coins::onEnter();

  /**
   *
   *
   *
   */
  this->updateTextData();

  this->holder2->setScale(1.0);
  this->holder2->runAction(
    RepeatForever::create(
      Sequence::create(
        EaseSineInOut::create(
          ScaleTo::create(3.0, 1.2)
        ),
        EaseSineInOut::create(
          ScaleTo::create(3.0, 1.0)
        ),
        nullptr
      )
    )
  );

  this->updateListHeight();

  int i = 1;

  for(auto mission : this->missions)
  {
    mission->setPositionY(200 + (this->missions.size() - i) * 220);

    i++;
  }

  Events::onScreenChanged("Missions");
}

void Missions::onExit()
{
  Coins::onExit();
}

/**
 *
 *
 *
 */
void Missions::updateListHeight()
{
  int counter = 0;

  for(auto m : this->missions)
  {
    switch(m->mission->state)
    {
      case MissionStruct::STATE_CURRENT:
      this->scroll->setInnerContainerPosition(Vec2(0, max(-this->size + (Application->height - 400), -m->getPositionY() + (Application->height - 400) / 2)));
      break;
      case MissionStruct::STATE_FINISHED:
      if(m->state->create)
      {
        m->removeFromParent();

        this->missions.erase(this->missions.begin() + counter);

        for(auto element : this->scroll->getChildren())
        {
          element->setPositionY(element->getPositionY() - 220);
        }

        int c = 0;
        for(auto m : this->missions)
        {
          if(c >= counter)
          {
            m->setPositionY(m->getPositionY() + 220);
          }

          c++;
        }
      }
      else
      {
        this->missions.erase(this->missions.begin() + counter);

        m->release();

        for(auto element : this->scroll->getChildren())
        {
          element->setPositionY(element->getPositionY() - 220);
        }
      }
      break;
    }

    counter++;
  }

  int size = this->missions.size() - 1;

  this->size = 200 * 2 + size * 220;

  this->scroll->setInnerContainerSize(
    Size(
      Application->width,
      this->size
    )
  );
}

/**
 *
 *
 *
 */
void Missions::updateTextData()
{
  Coins::updateTextData();

  /**
   *
   *
   *
   */
  this->texts.title2->data(MissionsFactory::getInstance()->getCompletedMissionsCount(), MissionsFactory::getInstance()->getMissionsCount());
}
