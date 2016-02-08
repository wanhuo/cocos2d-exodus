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

#include "Game.h"

#include "Finish.h"
#include "Store.h"

/**
 *
 *
 *
 */
float Coin::TIME;

/**
 *
 *
 *
 */
Coin::Coin()
: Entity3D("coin.obj")
{
  this->setTexture("coin.png");
  this->setScheduleUpdate(true);
}

Coin::~Coin()
{
}

/**
 *
 *
 *
 */
void Coin::onCreate()
{
  Entity3D::onCreate();

  /**
   *
   *
   *
   */
  float x = random(-4.0, 4.0);
  float y = -5;
  float z = -10;

  float vx = 0;
  float vy = 1.0;
  float vz = random(0.0, 0.5);

  this->speed = 0.5;
  this->power = random(0.5, 1.5);

  this->setPosition3D(Vec3(x, y, z));
  this->vector = Vec3(vx, vy, vz);

  this->runAction(
    RepeatForever::create(
      RotateBy::create(random(1.0, 3.0), Vec3(random(0.0, 360.0), random(0.0, 360.0), random(0.0, 360.0)))
    )
  );

  this->setCameraMask(2);
}

void Coin::onDestroy(bool action)
{
  Entity3D::onDestroy(action);
}

/**
 *
 *
 *
 */
void Coin::update(float time)
{
  Entity3D::update(time);

  /**
   *
   *
   *
   */
  float x = this->getPositionX() + this->vector.x * this->speed * TIME;
  float y = this->getPositionY() + this->vector.y * this->speed * this->power * TIME;
  float z = this->getPositionZ() + this->vector.z * this->speed * TIME;

  this->power -= this->weight * TIME;

  this->setPosition3D(Vec3(x, y, z));

  if(this->getPositionZ() >= 0)
  {
    this->_destroy(true);
  }
}

/**
 *
 *
 *
 */
Coin* Coin::deepCopy()
{
  return new Coin;
}
