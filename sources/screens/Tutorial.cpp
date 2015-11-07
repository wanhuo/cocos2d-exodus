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

#include "Tutorial.h"
#include "Game.h"

/**
 *
 *
 *
 */
Tutorial* Tutorial::instance;

/**
 *
 *
 *
 */
Tutorial* Tutorial::getInstance()
{
  return instance;
}

/**
 *
 *
 *
 */
Tutorial::Tutorial()
{
  instance = this;

  this->background = new BackgroundColor(this, Color4B(0, 160, 198, 255));

  #if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
  this->buttons.back = new Button("back-button.png", 1, 2, this, std::bind(&Tutorial::hide, this), true);
  #endif

  #if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
  this->buttons.back->setPosition(65, Application->height - 65);
  #endif
}

Tutorial::~Tutorial()
{
}

/**
 *
 *
 *
 */
void Tutorial::onEnter()
{
  Screen::onEnter();

  /**
   *
   *
   *
   */
  this->updateTextData();

  Events::onScreenChanged("Tutorial");
}

void Tutorial::onExit()
{
  Screen::onExit();
}

/**
 *
 *
 *
 */
void Tutorial::onBack()
{
  this->hide();
}

/**
 *
 *
 *
 */
void Tutorial::show()
{
  Director::getInstance()->pushScene(TransitionFade::create(0.2, this, Color3B::WHITE));
}

void Tutorial::hide()
{
  Director::getInstance()->popScene(TransitionFade::create(0.2, Director::getInstance()->getPreviousScene(), Color3B::WHITE));
}

/**
 *
 *
 *
 */
void Tutorial::updateTextData()
{
}
