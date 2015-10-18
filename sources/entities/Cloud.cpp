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
Cloud::Cloud(const char* textureFileName)
: Parallax(textureFileName)
{
  this->setScheduleUpdate(true);
}

Cloud::~Cloud()
{
}

/**
 *
 *
 *
 */
void Cloud::onCreate()
{
  Parallax::onCreate();

  /**
   *
   *
   *
   */
  //this->setWidth(random(10.0, 100.0));
  //this->setScale(random(0.5, 1.3));

  this->speed = random(0.0, 5.0);
}

void Cloud::onDestroy(bool action)
{
  Parallax::onDestroy(action);
}

/**
 *
 *
 *
 */
void Cloud::setParallaxPosition()
{
  this->setPositionY(400);//random(0.0, 1000.0));
}

/**
 *
 *
 *
 */
void Cloud::update(float time)
{
  this->setPositionX(this->getPositionX() - this->speed);
}

/**
 *
 *
 *
 */
Cloud* Cloud::deepCopy()
{
  return new Cloud(this->textureFileName);
}
