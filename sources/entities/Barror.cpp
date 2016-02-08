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

/**
 *
 *
 *
 */
Barror::Barror()
: TiledEntity("pointers.png", 1, 3)
{
  this->motion = new Motion("barror-motion.png", Application->c, this->getWidth());
  this->motion->setTarget(this);
  this->motion->setLocalZOrder(-1);
}

Barror::~Barror()
{
}

/**
 *
 *
 *
 */
void Barror::onCreate()
{
  TiledEntity::onCreate();

  /**
   *
   *
   *
   */
  this->motion->_create();
}

void Barror::onDestroy(bool action)
{
  TiledEntity::onDestroy(action);

  /**
   *
   *
   *
   */
  this->motion->_destroy(action);

  if(action)
  {
    switch(this->getCurrentFrameIndex())
    {
      case Pointer::SUCCESS:
      Application->counter->onScore(true);
      break;
      case Pointer::COIN:
      Application->counter->onCoin(true);
      break;
    }
  }
}

/**
 *
 *
 *
 */
void Barror::animate(int index)
{
  this->setCurrentFrameIndex(index);

  this->setScale(2 * Application->d->getScale());

  this->setPositionX(this->getPositionX() + this->getWidthScaled() / 2);
  this->setPositionY(this->getPositionY() + this->getHeightScaled() / 2);

  switch(index)
  {
    case Pointer::SUCCESS:
    {
      float x = Application->counter->getPositionX();
      float y = Application->counter->getPositionY() + Application->counter->getParent()->getPositionY();

      this->runAction(
        Sequence::create(
          EaseSineOut::create(
            BezierTo::create(1.0, {
              Vec2(x, y),
              this->getPosition(),
              Vec2(random(0.0f, Application->getWidth()), Application->getCenter().y)
            })
          ),
          CallFunc::create(CC_CALLBACK_0(Counter::onScore, Application->counter, true)),
          CallFunc::create([=] () {
            this->_destroy();
          }),
          nullptr
        )
      );
    }
    break;
    case Pointer::COIN:
    {
      float x = Application->counter->getPositionX() + Application->getCenter().x - 150;
      float y = Application->getHeight() - 40;

      this->runAction(
        Sequence::create(
          EaseSineOut::create(
            BezierTo::create(1.0, {
              Vec2(x, y),
              this->getPosition(),
              Vec2(random(0.0f, Application->getWidth()), Application->getCenter().y)
            })
          ),
          CallFunc::create(CC_CALLBACK_0(Counter::onCoin, Application->counter, true)),
          CallFunc::create([=] () {
            this->_destroy();
          }),
          nullptr
        )
      );
    }
    break;
  }
}

/**
 *
 *
 *
 */
Barror* Barror::deepCopy()
{
  return new Barror;
}
