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
Fish::Fish(Pool* decorations)
: Spine("fish.json", "fish.atlas", 1.0)
{
  this->skins = {
    "1",
    "2",
    "3"
  };

  this->decorations = decorations;

  this->setGlobalZOrder(4);
  this->decorations->setGlobalZOrder(3);
}

Fish::~Fish()
{
}

/**
 *
 *
 *
 */
void Fish::onCreate()
{
  this->position = probably(50);

  this->speed.x = random(200, 800);
  this->speed.y = random(200, 800);

  this->vector.x = 1;
  this->vector.y = 1;

  float x = 0;
  float y = 130 + (Application->parameters.ad ? 0 : 100);

  if(this->position)
  {
    x = random(Application->camera.x, Application->camera.x + Application->camera.width / 2);
  }
  else
  {
    x = random(Application->camera.x + Application->camera.width / 2, Application->camera.x + Application->camera.width);
  }

  this->setPosition(x, y);
  this->setScaleX(-1);

  this->setRandomSkin();

  Spine::onCreate();
}

void Fish::onDestroy(bool action)
{
  Spine::onDestroy(action);

  /**
   *
   *
   *
   */
  if(action)
  {
    if(Application->character->getPositionY() - Application->w->getPositionY() < Application->camera.center * 3)
    {
      for(int i = 0; i < 20; i++)
      {
        this->decorations->_create()->setPosition(this->getPosition());
      }

      Sound->play("water-splash-" + patch::to_string(random(1, 7)));
    }
  }
}

/**
 *
 *
 *
 */
void Fish::update(float time)
{
  Spine::update(time);

  /**
   *
   *
   *
   */
  time *= Application->character->parameters.time;

  /**
   *
   *
   *
   */
  float x = this->getPositionX() + (this->vector.x * this->speed.x * time) * (this->position ? 1 : -1);
  float y = this->getPositionY() + (this->vector.y * this->speed.y * time);

  float r = atan2(this->vector.x * (this->position ? 1 : -1), this->vector.y) * 180 / M_PI - 90;

  this->setPosition(x, y);
  this->setRotation(r);

  this->vector.y -= 2 * time;

  if(y < 120 + (Application->parameters.ad ? 0 : 100))
  {
    this->_destroy(true);
  }
}

/**
 *
 *
 *
 */
Fish* Fish::deepCopy()
{
  return new Fish(this->decorations);
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

Fish::Decoration::Decoration()
: Entity("fish-decoration.png")
{
  this->setScheduleUpdate(true);
}

Fish::Decoration::~Decoration()
{
}

/**
 *
 *
 *
 */
void Fish::Decoration::onCreate()
{
  Entity::onCreate();

  /**
   *
   *
   *
   */
  this->setScale(random(0.1, 1.0));
}

void Fish::Decoration::onDestroy(bool action)
{
  Entity::onDestroy(action);

  /**
   *
   *
   *
   */
  this->vector = Vec2(
    random(-1.0, 1.0),
    random(0.0, 1.0)
  );

  this->speed = Vec2(
    random(0.0, 2.0),
    random(5.0, 10.0)
  );
}

/**
 *
 *
 *
 */
void Fish::Decoration::update(float time)
{
  this->vector.y -= 0.025;

  float x = this->getPositionX() + this->vector.x * this->speed.x;
  float y = this->getPositionY() + this->vector.y * this->speed.y;

  this->setPosition(x, y);

  if(y < 30 + (Application->parameters.ad ? 0 : 100))
  {
    this->_destroy(true);
  }
}

/**
 *
 *
 *
 */
Fish::Decoration* Fish::Decoration::deepCopy()
{
  return new Fish::Decoration;
}
