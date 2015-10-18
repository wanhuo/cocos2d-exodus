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
Water::Water(int type)
: ParallaxPool(Application->w)
{
  this->type = type;

  switch(this->type)
  {
    case TYPE1:
    this->initType1();
    break;
    case TYPE2:
    this->initType2();
    break;
    case TYPE3:
    this->initType3();
    break;
  }
}

Water::~Water()
{
}

/**
 *
 *
 *
 */
void Water::initType1()
{
  this->setPosition(0, 200 + (!Application->parameters.ad ? 100 : 0));
  this->setSpeed(50, 0);

  this->addElement(new Parallax("water-1.png"));

  this->runAction(
    RepeatForever::create(
      Sequence::create(
        EaseSineInOut::create(
          MoveBy::create(3.0, Vec2(0, 10))
        ),
        EaseSineInOut::create(
          MoveBy::create(3.0, Vec2(0, -10))
        ),
        nullptr
      )
    )
  );
}

void Water::initType2()
{
  this->setPosition(0, 150 + (!Application->parameters.ad ? 100 : 0));
  this->setSpeed(-100, 0);

  this->addElement(new Parallax("water-2.png"));

  this->runAction(
    RepeatForever::create(
      Sequence::create(
        EaseSineInOut::create(
          MoveBy::create(3.0, Vec2(0, 20))
        ),
        EaseSineInOut::create(
          MoveBy::create(3.0, Vec2(0, -20))
        ),
        nullptr
      )
    )
  );
}

void Water::initType3()
{
  this->setPosition(0, -50 + (!Application->parameters.ad ? 100 : 0));
  this->setSpeed(100, 0);

  this->setLocalZOrder(10);

  this->addElement(new Parallax("water-3.png"));

  this->runAction(
    RepeatForever::create(
      Sequence::create(
        EaseSineInOut::create(
          MoveBy::create(3.0, Vec2(0, 30))
        ),
        EaseSineInOut::create(
          MoveBy::create(3.0, Vec2(0, -30))
        ),
        nullptr
      )
    )
  );
}

/**
 *
 *
 *
 */
void Water::reset()
{
}
