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

#include "Game.h"

/**
 *
 *
 *
 */
AnimatedButton::AnimatedButton(const char* data, const char* texture, Node* parent)
: Spine(data, texture, 1.0, parent)
{
  this->animations.animation = {1, "animation", true};
  this->animations.click = {2, "click", false};

  this->setContentSize(Size(200, 200));
}

AnimatedButton::~AnimatedButton()
{
}

/**
 *
 *
 *
 */
void AnimatedButton::onEnter()
{
  Spine::onEnter();
}

void AnimatedButton::onExit()
{
  Spine::onExit();
}

/**
 *
 *
 *
 */
void AnimatedButton::onCreate()
{
  Spine::onCreate();

  /**
   *
   *
   *
   */
  this->setPosition(Application->center.x, 150 + (Application->parameters.ad ? 0 : 100));
  this->setScale(0);
  this->runAction(
    EaseSineInOut::create(
      ScaleTo::create(0.2, 1.0)
    )
  );

  this->setAnimation(this->animations.animation);

  this->bind(true);
}

void AnimatedButton::onDestroy(bool action)
{
  Spine::onDestroy(action);

  /**
   *
   *
   *
   */
  this->bind(false);
}

/**
 *
 *
 *
 */
void AnimatedButton::onTouchStart(cocos2d::Touch* touch, Event* e)
{
  Node::onTouchStart(touch, e);

  /**
   *
   *
   *
   */
  this->runAction(
    EaseSineInOut::create(
      ScaleTo::create(0.2, 0.9)
    )
  );
}

void AnimatedButton::onTouchFinish(cocos2d::Touch* touch, Event* e)
{
  this->stopAllActions();
  this->setScale(0);

  Node::onTouchFinish(touch, e);
}

void AnimatedButton::onTouchCancelled(cocos2d::Touch* touch, Event* e)
{
  Node::onTouchCancelled(touch, e);

  /**
   *
   *
   *
   */
  this->stopAllActions();
  this->setScale(1.0);
}

/**
 *
 *
 *
 */
void AnimatedButton::onTouch(cocos2d::Touch* touch, Event* e)
{
  this->bind(false);

  /**
   *
   *
   *
   */
  Sound->play("touch");
}
