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

#include "Crown.h"

/**
 *
 *
 *
 */
Crown::Crown(Node* parent)
: Spine("crown.json", "crown.atlas", 1.0, parent)
{
  this->skins = {
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  };

  this->animations.animation = {1, "animation", true};

  this->setPositionX(parent->getContentSize().width / 2);
  this->setPositionY(parent->getContentSize().height / 2);

  this->setContentSize(Size(0, 150));

  this->setAnchorPoint(Vec2(0.5, -1.0));
}

Crown::~Crown()
{
}

/**
 *
 *
 *
 */
void Crown::onCreate()
{
  this->setRotation(0);
  this->setOpacity(0);

  this->runAction(
    Spawn::create(
      Sequence::create(
        EaseBounceOut::create(
          RotateTo::create(1.5, 35)
        ),
        nullptr
      ),
      Sequence::create(
        FadeIn::create(1.0),
        nullptr
      ),
      nullptr
    )
  );

  this->setRandomSkin();

  /**
   *
   *
   *
   */
  Spine::onCreate();

  this->setAnimation(this->animations.animation);
}

void Crown::onDestroy(bool action)
{
  Spine::onDestroy(action);
}
