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

#include "Store.h"
#include "Game.h"

/**
 *
 *
 *
 */
Store* Store::instance;

/**
 *
 *
 *
 */
Store* Store::getInstance()
{
  return instance;
}

/**
 *
 *
 *
 */
Store::Store()
{
  instance = this;

  this->background = new BackgroundColor(this, Color4B(132, 209, 223, 255));

  #if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
  this->buttons.back = new Button("back-button.png", 1, 2, this, std::bind(&Store::hide, this), true);
  #endif
  this->buttons.switchers.push_back(new Button("store-switcher-1-button.png", 1, 3, this, std::bind(&Store::onView1, this), true));
  this->buttons.switchers.push_back(new Button("store-switcher-2-button.png", 1, 3, this, std::bind(&Store::onView2, this), true));
  this->buttons.switchers.push_back(new Button("store-switcher-3-button.png", 1, 3, this, std::bind(&Store::onView3, this), true));

  this->views.push_back(new StoreView1);
  this->views.push_back(new StoreView1);
  this->views.push_back(new StoreView1);

  this->coins = new Entity("counter-coins.png", this, true);
  this->decoration = new Entity("store-decoration.png", this, true);
  this->baloon = new Entity("store-baloon.png", this, true);

  this->texts.coins = new Text("coins", this->coins, true);

  #if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
  this->buttons.back->setPosition(65, Application->height - 65);
  #endif
  this->buttons.switchers.at(0)->setPosition(Application->center.x - 150, Application->height - 250);
  this->buttons.switchers.at(1)->setPosition(Application->center.x, Application->height - 250);
  this->buttons.switchers.at(2)->setPosition(Application->center.x + 150, Application->height - 250);

  this->coins->setPosition(Application->width - this->coins->getWidth() / 2 - 15, Application->height - 50);
  this->decoration->setPosition(Application->center.x, Application->height - 250);
  this->baloon->setAnchorPoint(Vec2(0.9, 0.0));

  this->texts.coins->setPosition(this->coins->getWidth() / 2, this->coins->getHeight() / 2);
}

Store::~Store()
{
}

/**
 *
 *
 *
 */
void Store::onEnter()
{
  Screen::onEnter();

  /**
   *
   *
   *
   */
  this->updateTextData();
  this->updateViews(0, true);

  Events::onScreenChanged("Store");
}

void Store::onExit()
{
  Screen::onExit();
}

/**
 *
 *
 *
 */
void Store::onBack()
{
  this->hide();
}

/**
 *
 *
 *
 */
void Store::onView1()
{
  this->updateViews(0);
}

void Store::onView2()
{
  this->updateViews(1);
}

void Store::onView3()
{
  this->updateViews(2);
}

/**
 *
 *
 *
 */
void Store::show()
{
  Director::getInstance()->pushScene(TransitionFade::create(0.2, this, Color3B::WHITE));
}

void Store::hide()
{
  Director::getInstance()->popScene(TransitionFade::create(0.2, Director::getInstance()->getPreviousScene(), Color3B::WHITE));
}

/**
 *
 *
 *
 */
void Store::updateViews(int index, bool enter)
{
  for(auto view : this->views)
  {
    view->removeFromParent();
  }

  for(auto switcher : this->buttons.switchers)
  {
    switcher->setCurrentFrameIndex(0);
  }

  this->addChild(this->views.at(index));
  
  auto switcher = this->buttons.switchers.at(index);
  switcher->setCurrentFrameIndex(2);

  if(enter)
  {
    this->baloon->setScale(0);
    this->baloon->setFlippedX(index < 2);
    this->baloon->runAction(
      EaseSineInOut::create(
        ScaleTo::create(0.2, 1.0, 1.0)
      )
    );

    float x = switcher->getPositionX() + (this->baloon->isFlippedX() ? this->baloon->getWidth() * 0.8 : 0);
    float y = switcher->getPositionY() + 60;

    this->baloon->setPosition(x, y);
  }
  else
  {
    this->baloon->runAction(
      Sequence::create(
        EaseSineInOut::create(
          ScaleTo::create(0.2, 1.0, 0.0)
        ),
        CallFunc::create([=] ()
        {
          this->baloon->setFlippedX(index < 2);

          float x = switcher->getPositionX() + (this->baloon->isFlippedX() ? this->baloon->getWidth() * 0.8 : 0);
          float y = switcher->getPositionY() + 60;

          this->baloon->setPosition(x, y);
        }),
        EaseSineInOut::create(
          ScaleTo::create(0.2, 1.0, 1.0)
        ),
        nullptr
      )
    );
  }
}

/**
 *
 *
 *
 */
void Store::updateTextData()
{
  this->texts.coins->data(Application->counter->values.coins);
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

StoreView::StoreView()
{
  this->retain();
}

StoreView::~StoreView()
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

StoreView1::StoreView1()
{
}

StoreView1::~StoreView1()
{
}
