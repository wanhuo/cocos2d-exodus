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

#include "Finish.h"

/**
 *
 *
 *
 */
CharacterButton::CharacterButton(Node* parent)
: AnimatedButton("unlock.json", "unlock.atlas", parent)
{
}

CharacterButton::~CharacterButton()
{
}

/**
 *
 *
 *
 */
void CharacterButton::onCreate()
{
  AnimatedButton::onCreate();
}

void CharacterButton::onDestroy(bool action)
{
  AnimatedButton::onDestroy(action);
}

/**
 *
 *
 *
 */
void CharacterButton::onTouch(cocos2d::Touch* touch, Event* e)
{
  AnimatedButton::onTouch(touch, e);

  /**
   *
   *
   *
   */
  this->runAction(
    Sequence::create(
      CallFunc::create([=] ()
      {
        Modal::block();
      }),
      Repeat::create(
        Sequence::create(
          ScaleTo::create(0.05, 0.9),
          ScaleTo::create(0.05, 1.1),
          nullptr
        ),
        12
      ),
      ScaleTo::create(0.05, 1.0),
      CallFunc::create([=] ()
      {
        Modal::hide();

        Finish::getInstance()->onUnlock();

        this->_destroy(true);

        Sound->play("unlock");
      }),
      nullptr
    )
  );

  Sound->play("gift");

  Analytics::sendEvent("Application", "application.events.onCharacterButtonPressed", "Application onCharacterButtonPressed event");
}

