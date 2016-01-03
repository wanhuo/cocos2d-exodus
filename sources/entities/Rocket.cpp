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
Rocket::Rocket(RocketDecoations decorations)
: TiledEntity("rocket.png", 4, 2)
{
  this->decorations = decorations;

  this->setScheduleUpdate(true);
}

Rocket::~Rocket()
{
}

/**
 *
 *
 *
 */
void Rocket::onCreate()
{
  TiledEntity::onCreate();

  float x = random(0.0f, Application->width);
  float y = -this->getHeight() / 2;

  this->vector = Vec2(0, 1);
  this->speed = Vec2(
    random(2.0, 5.0),
    random(2.0, 5.0)
  );

  this->position = x < Application->center.x;

  this->setPosition(x, y);

  this->randomFrameIndex();
}

void Rocket::onDestroy(bool action)
{
  TiledEntity::onDestroy(action);

  /**
   *
   *
   *
   */
  if(action)
  {
    this->decorations.large->_create()->setPosition(this->getPosition());
  }
}

/**
 *
 *
 *
 */
void Rocket::update(float time)
{
  this->vector.x += 0.01 * (this->position ? 1 : -1);

  float x = this->getPositionX() + this->vector.x * this->speed.x;
  float y = this->getPositionY() + this->vector.y * this->speed.y;

  float r = atan2(this->vector.x * this->speed.x, this->vector.y * this->speed.y) * 180 / M_PI;

  this->setPosition(x, y);
  this->setRotation(r);

  if(x < -this->getWidth() / 2 || x > Application->width + this->getWidth() / 2 || y < -this->getHeight() / 2 || y > Application->height)
  {
    this->_destroy(true);
  }

  if(probably(1))
  {
    this->position = !this->position;
  }

  this->decorations.times.elapsed += time;
  if(this->decorations.times.elapsed >= this->decorations.times.time / this->speed.y) {
    this->decorations.times.elapsed = 0;

    this->decorations.small->_create()->setPosition(this->getPosition());
  }
}

/**
 *
 *
 *
 */
Rocket* Rocket::deepCopy()
{
  return new Rocket(this->decorations);
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

Rocket::DecorationSmall::DecorationSmall()
: Entity("rocket-decoration-small.png")
{

}

Rocket::DecorationSmall::~DecorationSmall()
{
}

/**
 *
 *
 *
 */
void Rocket::DecorationSmall::onCreate()
{
  Entity::onCreate();

  /**
   *
   *
   *
   */
  this->setPosition(this->getPosition());
  this->setOpacity(255);
  this->runAction(
    Sequence::create(
      DelayTime::create(1.0),
      FadeOut::create(1.0),
      CallFunc::create([=] () {
        this->_destroy(true);
      }),
      nullptr
    )
  );
}

void Rocket::DecorationSmall::onDestroy(bool action)
{
  Entity::onDestroy(action);
}

/**
 *
 *
 *
 */
Rocket::DecorationSmall* Rocket::DecorationSmall::deepCopy()
{
  return new Rocket::DecorationSmall;
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

Rocket::DecorationLarge::DecorationLarge()
: Entity("rocket-decoration-large.png")
{

}

Rocket::DecorationLarge::~DecorationLarge()
{
}

/**
 *
 *
 *
 */
void Rocket::DecorationLarge::onCreate()
{
  Entity::onCreate();

  /**
   *
   *
   *
   */
  this->setScale(0);
  this->setOpacity(255);
  this->runAction(
    Spawn::create(
      Sequence::create(
        EaseSineInOut::create(
          ScaleTo::create(0.2, 5.0)
        ),
        CallFunc::create([=] () {
          this->_destroy(true);
        }),
        nullptr
      ),
      Sequence::create(
        DelayTime::create(0.1),
        FadeOut::create(0.1),
        nullptr
      ),
      nullptr
    )
  );
}

void Rocket::DecorationLarge::onDestroy(bool action)
{
  Entity::onDestroy(action);
}

/**
 *
 *
 *
 */
Rocket::DecorationLarge* Rocket::DecorationLarge::deepCopy()
{
  return new Rocket::DecorationLarge;
}
