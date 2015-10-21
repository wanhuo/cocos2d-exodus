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
Parallax::Parallax(Parameters parameters)
: ParallaxEntity(parameters.texture)
{
  this->parameters = parameters;

  this->setAnchorPointX(this->parameters.anchor_x);
  this->setAnchorPointY(this->parameters.anchor_y);

  this->setPositionX(this->parameters.x);
  this->setPositionY(this->parameters.y);

  this->setLocalZOrder(this->parameters.z);

  this->parameters.scale_x = this->parameters.scale_x_min != 0 || this->parameters.scale_x_max != 0;
  this->parameters.scale_y = this->parameters.scale_y_min != 0 || this->parameters.scale_y_max != 0;
  this->parameters.position_x = this->parameters.position_x_min != 0 || this->parameters.position_x_max != 0;
  this->parameters.position_y = this->parameters.position_y_min != 0 || this->parameters.position_y_max != 0;
  this->parameters.width = this->parameters.width_min != 0 || this->parameters.width_max != 0;

  if(this->parameters.speed_x_max != 0 || this->parameters.speed_y_max != 0)
  {
    this->setScheduleUpdate(true);
  }
}

Parallax::~Parallax()
{
}

/**
 *
 *
 *
 */
void Parallax::onCreate()
{
  ParallaxEntity::onCreate();

  /**
   *
   *
   *
   */
  if((this->parameters.scale_x && !this->parameters.scale_y) || (!this->parameters.scale_x && this->parameters.scale_y))
  {
    this->setScale(random(this->parameters.scale_x_min, this->parameters.scale_x_max));
  }
  else
  {
    if(this->parameters.scale_x)
    {
      this->setScaleX(random(this->parameters.scale_x_min, this->parameters.scale_x_max));
    }

    if(this->parameters.scale_y)
    {
      this->setScaleY(random(this->parameters.scale_y_min, this->parameters.scale_y_max));
    }
  }

  if(this->parameters.width)
  {
    this->setWidth(random(this->parameters.width_min, this->parameters.width_max));
  }

  this->speed.x = random(this->parameters.speed_x_min, this->parameters.speed_x_max);
  this->speed.y = random(this->parameters.speed_y_min, this->parameters.speed_y_max);
}

void Parallax::onDestroy(bool action)
{
  ParallaxEntity::onDestroy(action);
}

/**
 *
 *
 *
 */
void Parallax::setParallaxPosition()
{
  if(this->parameters.position_x)
  {
    this->setPositionX(random(this->parameters.position_x_min, this->parameters.position_x_max));
  }

  if(this->parameters.position_y)
  {
    this->setPositionY(random(this->parameters.position_y_min, this->parameters.position_y_max));
  }
}

/**
 *
 *
 *
 */
void Parallax::update(float time)
{
  float x = this->getPositionX() + min(-1.0f, Application->character->parameters.x * this->speed.x * time);
  float y = this->getPositionY() + min(-0.0f, Application->character->parameters.y * this->speed.y * time);

  this->setPositionX(x);
}

/**
 *
 *
 *
 */
Parallax* Parallax::deepCopy()
{
  return new Parallax(this->parameters);
}
