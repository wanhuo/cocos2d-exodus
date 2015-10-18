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

#include "Finish.h"

/**
 *
 *
 *
 */
VideoButton::VideoButton(Node* parent)
: AnimatedButton("video.json", "video.atlas", parent)
{
}

VideoButton::~VideoButton()
{
}

/**
 *
 *
 *
 */
void VideoButton::onCreate()
{
  AnimatedButton::onCreate();

  /**
   *
   *
   *
   */
  Finish::getInstance()->parameters.elapsed.video = 0;
}

void VideoButton::onDestroy(bool action)
{
  AnimatedButton::onDestroy(action);
}

/**
 *
 *
 *
 */
void VideoButton::onTouch(cocos2d::Touch* touch, Event* e)
{
  AnimatedButton::onTouch(touch, e);

  /**
   *
   *
   *
   */
  this->runAction(
    Sequence::create(
      EaseSineInOut::create(
        ScaleTo::create(0.2, 0)
      ),
      CallFunc::create([=] () {
        Finish::getInstance()->parameters.elapsed.ad = 0;
        Finish::getInstance()->onMoveDown();

        Heyzap::show(Config::AD_TYPE_VIDEO, [=] (bool state) {
          if(state)
          {
            log("GIVE ME MONEY!!");
          }
        });

        this->_destroy(true);
      }),
      nullptr
    )
  );
}
