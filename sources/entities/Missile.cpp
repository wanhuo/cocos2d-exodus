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
Missile::Missile()
: Spine("missile.json", "missile.atlas", 1.0)
{
  this->animations.animation = {1, "animation", false};
  this->animations.game = {2, "game", false};

  this->skins = {
    "1"
  };

  this->setRandomSkin();
}

Missile::~Missile()
{
}

/**
 *
 *
 *
 */
void Missile::onCreate()
{
  Spine::onCreate();

  /**
   *
   *
   *
   */
  this->changeState(STATE_NONE);
  this->changeState(STATE_ANIMATION);
}

void Missile::onDestroy(bool action)
{
  Spine::onDestroy(action);
}

/**
 *
 *
 *
 */
void Missile::onAnimationStart(int index)
{
}

void Missile::onAnimationFinish(int index)
{
}

void Missile::onAnimationComplete(int index, int count)
{
  if(index == this->animations.animation.index)
  {
    this->runAction(
      Sequence::create(
        DelayTime::create(random(0.0, 2.0)),
        CallFunc::create([=] () {  
        this->changeState(STATE_GAME);
        }),
        nullptr
      )
    );
  }
}

void Missile::onAnimationEvent(int index, spEvent* event)
{
}

/**
 *
 *
 *
 */
void Missile::onAnimation()
{
  float x = 100;
  float y = Application->character->getPositionY() + random(0, 2000);

  this->setPosition(-x, y);
  this->setAnimation(this->animations.animation);

  Sound->play("warning");
}

void Missile::onGame()
{
  this->setAnimation(this->animations.game);

  float x = this->getPositionX() + 200;
  float y = this->getPositionY();

  this->setPosition(x, y);
}

/**
 *
 *
 *
 */
void Missile::changeState(int state)
{
  if(this->state != state)
  {
    this->state = state;

    switch(this->state)
    {
      case STATE_ANIMATION:
      this->onAnimation();
      break;
      case STATE_GAME:
      this->onGame();
      break;
    }
  }
}

/**
 *
 *
 *
 */
void Missile::updateAnimation(float time)
{
}

void Missile::updateGame(float time)
{
  float x = this->getPositionX() - 50;
  float y = this->getPositionY();

  this->setPosition(x, y);

  if(this->convertToWorldSpace(Vec2::ZERO).x < -200)
  {
    this->_destroy(true);
  }
}

/**
 *
 *
 *
 */
void Missile::updateStates(float time)
{
  switch(this->state)
  {
    case STATE_ANIMATION:
    this->updateAnimation(time);
    break;
    case STATE_GAME:
    this->updateGame(time);
    break;
  }
}

/**
 *
 *
 *
 */
void Missile::update(float time)
{
  Spine::update(time);

  /**
   *
   *
   *
   */
  this->updateStates(time);
}

/**
 *
 *
 *
 */
Missile* Missile::deepCopy()
{
  return new Missile;
}
