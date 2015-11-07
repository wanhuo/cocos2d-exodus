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

  this->background = new BackgroundColor(this, Color4B(235, 255, 255, 255));
  this->holder1 = new BackgroundColor(this, Color4B(132, 209, 223, 255));
  this->holder2 = new BackgroundColor(this, Color4B(228, 149, 81, 255));

  this->scroll = cocos2d::ui::ScrollView::create();
  this->scroll->setDirection(cocos2d::ui::ScrollView::Direction::VERTICAL);
  this->scroll->setBounceEnabled(true);
  this->scroll->setContentSize(Size(Application->width, Application->height - 400));
  this->scroll->setPositionY(0);

  this->background->addChild(this->scroll);

  this->holder1->setContentSize(Size(Application->width, 400));
  this->holder2->setContentSize(Size(Application->width - 200, 100));

  this->holder1->ignoreAnchorPointForPosition(false);
  this->holder2->ignoreAnchorPointForPosition(false);

  this->holder1->setAnchorPoint(Vec2(0.5, 1.0));
  this->holder2->setAnchorPoint(Vec2(0.5, 0.5));

  this->holder1->setPosition(Application->center.x, Application->height);
  this->holder2->setPosition(Application->center.x, Application->height - 400);

  this->coins = new Entity("counter-coins.png", this, true);

  #if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
  this->buttons.back = new Button("back-button.png", 1, 2, this, std::bind(&Missions::hide, this), true);
  #endif

  this->texts.title = new Text("missions-title", this->holder1, true);
  this->texts.coins = new Text("coins", this->coins, true);

  #if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
  this->buttons.back->setPosition(65, Application->height - 65);
  #endif

  this->coins->setPosition(Application->width - this->coins->getWidth() / 2 - 15, Application->height - 50);

  this->texts.title->setPosition(this->holder1->getContentSize().width / 2, this->holder1->getContentSize().height / 2);
  this->texts.coins->setPosition(this->coins->getContentSize().width / 2, this->coins->getContentSize().height / 2);

  int size = MissionsFactory::getInstance()->getMissions().size() - 1;
  int counter = 0;

  for(auto m : MissionsFactory::getInstance()->getMissions())
  {
    this->missions.push_back(new Mission(counter));

    counter++;
  }

  this->size = this->parameters.padding * 2 + size * 220;

  this->scroll->setInnerContainerSize(
    Size(
      Application->width,
      this->size
    )
  );
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
void Missions::updateTextData()
{
  this->texts.coins->data(Application->counter->values.coins);
}
