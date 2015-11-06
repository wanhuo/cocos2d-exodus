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

#include "Finish.h"
#include "Store.h"

/**
 *
 *
 *
 */
const vector<Color3B> Confetti::COLORS{
  Color3B(255, 0, 0),
  Color3B(0, 255, 0),
  Color3B(0, 0, 255)
};

/**
 *
 *
 *
 */
Confetti::Confetti()
: Entity3D("confetti.obj")
{
  this->setTextures();
  this->setScheduleUpdate(true);
}

Confetti::~Confetti()
{
}

/**
 *
 *
 *
 */
void Confetti::onCreate()
{
  Entity3D::onCreate();

  /**
   *
   *
   *
   */
  this->speed = random(0.1, 1.0);

  float z = random(10.0, 100.0);
  float x = random(-z / 3.0, z / 3.0);
  float y = z / 1.5;

  this->setPosition3D(Vec3(x, y, -z));

  this->runAction(
    RepeatForever::create(
      RotateBy::create(random(1.0, 3.0), Vec3(random(0.0, 360.0), random(0.0, 360.0), random(0.0, 360.0)))
    )
  );

  this->setCameraMask(2);
}

void Confetti::onDestroy(bool action)
{
  Entity3D::onDestroy(action);
}

/**
 *
 * We don't need to set textures here.
 * Instread of this we should set some color to the entity.
 *
 */
void Confetti::setTextures()
{
  this->setColor(COLORS.at(random(0, 2)));
}

/**
 *
 *
 *
 */
void Confetti::update(float time)
{
  Entity3D::update(time);

  /**
   *
   *
   *
   */
  this->setPositionY(this->getPositionY() - this->speed);

  if(this->getPositionY() < -40)
  {
    this->_destroy(true);
  }
}

/**
 *
 *
 *
 */
Confetti* Confetti::deepCopy()
{
  return new Confetti;
}
