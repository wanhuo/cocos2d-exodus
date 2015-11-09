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
{
  instance = this;

  this->camera = Camera::createPerspective(60, this->width / this->height, 1.0f, 10000.0f);
  this->camera->setCameraFlag(CameraFlag::USER1);
  this->addChild(this->camera);

  this->coins = new Pool(new Coin, 30, this);

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

  this->coinsBackground = new Entity("counter-coins.png", this, true);

  #if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
  this->buttons.back = new Button("back-button.png", 1, 2, this, std::bind(&Missions::hide, this), true);
  #endif

  this->texts.title1 = new Text("missions-title-1", this->holder1, true);
  this->texts.title2 = new Text("missions-title-2", this->holder2, true);
  this->texts.coins = new Text("coins", this->coinsBackground, true);

  #if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
  this->buttons.back->setPosition(65, Application->height - 65);
  #endif

  this->coinsBackground->setPosition(Application->width - this->coinsBackground->getWidth() / 2 - 15, Application->height - 50);

  this->texts.title1->setPosition(this->holder1->getContentSize().width / 2, this->holder1->getContentSize().height / 2);
  this->texts.title2->setPosition(this->holder2->getContentSize().width / 2, this->holder2->getContentSize().height / 2);
  this->texts.coins->setPosition(this->coinsBackground->getContentSize().width / 2, this->coinsBackground->getContentSize().height / 2);

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
  Screen::onEnter();

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
    mission->setPositionY(this->parameters.padding + (this->missions.size() - i) * 220);

    i++;
  }

  Events::onScreenChanged("Missions");
}

void Missions::onExit()
{
  Screen::onExit();
}

/**
 *
 *
 *
 */
void Missions::onBack()
{
  this->hide();
}

/**
 *
 *
 *
 */
void Missions::show()
{
  Director::getInstance()->pushScene(TransitionFade::create(0.2, this, Color3B::WHITE));
}

void Missions::hide()
{
  Director::getInstance()->popScene(TransitionFade::create(0.2, Director::getInstance()->getPreviousScene(), Color3B::WHITE));
}

/**
 *
 *
 *
 */
void Missions::throwCoins(int count)
{
  //this->elapsedCoins = count;

  Finish::getInstance()->time = 1.0;

  this->runAction(
    Sequence::create(
      DelayTime::create(0.5),
      CallFunc::create([=] () {

        /**
         *
         *
         *
         */
        Finish::getInstance()->time = 0.2;
      }),
      DelayTime::create(0.5),
      CallFunc::create([=] () {
        Finish::getInstance()->time = 1.0;

        this->runAction(
          Repeat::create(
            Sequence::create(
              CallFunc::create([=] () {

                /**
                 *
                 *
                 *
                 */
                //this->elapsedCoins--;
                Application->counter->values.coins++;
                this->updateTextData();
              }),
              DelayTime::create(0.1),
              nullptr
            ),
            count
          )
        );

        Sound->play("coins-reward");
      }),
      nullptr
    )
  );

  for(int i = 0; i < count; i++)
  {
    this->coins->_create();
  }
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

  this->size = this->parameters.padding * 2 + size * 220;

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
  this->texts.coins->data(Application->counter->values.coins);
  this->texts.title2->data(MissionsFactory::getInstance()->getCompletedMissionsCount(), MissionsFactory::getInstance()->getMissionsCount());
}
