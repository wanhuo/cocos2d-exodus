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
: Coins(false)
{
  instance = this;

  this->background = new BackgroundColor(this, Color4B(255, 255, 255, 255));
  this->picture = new Entity("tutorial.png", this->background, true);
  this->picture->setPosition(Application->getWidth() / 2, Application->getHeight() - this->picture->getHeight() / 2 + 100);

  this->counter = new Text("tutorial-counter", this);
  this->counter->setPosition(Application->getWidth() / 2, 200);

  this->next = new Button("finish-play-button.png", 1, 2, this, std::bind(&Tutorial::hide, this), true);
  this->next->setPosition(Application->getWidth() / 2, 200);
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
  Coins::onEnter();

  /**
   *
   *
   *
   */
  if(!Application->parameters.tutorial)
  {
    this->value = 0;

    this->counter->_create()->runAction(
      Repeat::create(
        Sequence::create(
          DelayTime::create(0.1),
          CallFunc::create([=] () {
          this->counter->data(this->value++);
          }),
          nullptr
        ), 100
      )
    );

    this->next->setScale(0);
    this->next->runAction(
      Sequence::create(
        DelayTime::create(10.0),
        CallFunc::create([=] () {
        this->counter->_destroy();
        }),
        ScaleTo::create(0.2, 0.5),
        nullptr
      )
    );
  }
  else
  {
    this->next->setScale(0.5);
  }

  this->picture->runAction(
    RepeatForever::create(
      Sequence::create(
        ScaleTo::create(10.0, 1.05),
        ScaleTo::create(10.0, 1.0),
        nullptr
      )
    )
  );

  Events::onScreenChanged("Tutorial");
}

void Tutorial::onExit()
{
  Coins::onExit();
}
