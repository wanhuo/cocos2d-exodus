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
Creature::Creature(const char* data, const char* texture)
: Spine(data, texture, 1.0)
{
  this->animations.animation = {1, "animation", true};

  this->setLocalZOrder(9);
}

Creature::~Creature()
{
}

/**
 *
 *
 *
 */
void Creature::onCreate()
{
  Spine::onCreate();

  /**
   *
   *
   *
   */
  float x;

  this->index = 1;
  this->speed = random(100.0, 300.0);
  this->position = probably(50);

  this->setScaleX(this->position ? 1 : -1);

  if(this->position)
  {
    x = random(0.0, Application->center.x / 2.0);
  }
  else
  {
    x = random(Application->width * 0.75, Application->width / 1.0);
  }

  this->setPosition(x, Application->camera.center - 110);
  this->setAnimation(this->animations.animation);

  Application->creatures->onCreate();
}

void Creature::onDestroy(bool action)
{
  Spine::onDestroy(action);

  /**
   *
   *
   *
   */
  if(action)
  {
    Application->creatures->onDestroy();
  }
}

/**
 *
 *
 *
 */
void Creature::onAction()
{
  this->index++;
}

/**
 *
 *
 *
 */
void Creature::update(float time)
{
  Spine::update(time);

  /**
   *
   *
   *
   */
  float x = this->getPositionX() + this->speed * this->index * time * (this->position ? 1 : -1);

  this->setPositionX(x);

  if(this->position)
  {
    if(x > Application->center.x)
    {
      this->_destroy(true);
    }
  }
  else
  {
    if(x < Application->center.x)
    {
      this->_destroy(true);
    }
  }
}
