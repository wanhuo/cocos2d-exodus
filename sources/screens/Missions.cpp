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
  this->scroll->setContentSize(Size(Application->getWidth(), Application->getHeight() - 400));
  this->scroll->setPositionY(0);

  this->holder1->setContentSize(Size(Application->getWidth(), 400));

  this->holder1->ignoreAnchorPointForPosition(false);

  this->holder1->setAnchorPoint(Vec2(0.5, 1.0));

  this->holder1->setPosition(Application->getCenter().x, Application->getHeight());
  this->holder2->setPosition(Application->getCenter().x, Application->getHeight() - 400);

  this->texts.title1 = new Text("missions-title-1", this->holder1, true);
  this->texts.title2 = new Text("missions-title-2", this->holder2, true);
  this->texts.soon = new Text("missions-soon", this->scroll, true);

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
  this->missions.erase(
    std::remove_if(
        this->missions.begin(),
        this->missions.end(),
        [](Mission* m) -> bool {
            if(m->mission->state == MissionStruct::STATE_FINISHED)
            {
              m->removeFromParent();

              return true;
            }

            return false;
        }
    ),
    this->missions.end()
  );

  int size = this->missions.size() - 1;

  this->size = max<float>(200 * 2  + size * 220, this->scroll->getContentSize().height);

  this->scroll->setInnerContainerSize(
    Size(
      Application->getWidth(),
      this->size
    )
  );

  int i = 1;

  for(auto mission : this->missions)
  {
    mission->setPositionY(this->size - 220 * i);

    i++;
  }

  if(this->missions.size())
  {
    this->texts.soon->setVisible(false);
  }
  else
  {
    this->texts.soon->setVisible(true);
    this->texts.soon->setPosition(Application->getWidth() / 2, this->size / 2);
  }
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
