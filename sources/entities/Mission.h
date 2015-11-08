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

#ifndef _MISSION_H_
#define _MISSION_H_

#include "Background.h"
#include "BackgroundColor.h"
#include "Entity.h"
#include "Text.h"

/**
 *
 *
 *
 */
class Mission : public BackgroundColor
{
  /**
   *
   *
   *
   */
  private:
  struct Texts
  {
    Text* mission;
    Text* additional;
    Text* coins;
  };

  /**
   *
   *
   *
   */
  protected:
  int id;

  Texts texts;

  BackgroundColor* progressBackground;
  BackgroundColor* progressBar;

  Entity* lock;
  Entity* coins;

  /**
   *
   *
   *
   */
  public:
  Mission(int id);
 ~Mission();

  MissionStruct* mission;

  virtual void onEnter();
  virtual void onExit();

  virtual void onTouchStart(cocos2d::Touch* touch, Event* e);
  virtual void onTouchFinish(cocos2d::Touch* touch, Event* e);
  virtual void onTouchCancelled(cocos2d::Touch* touch, Event* e);

  virtual void onTouch(cocos2d::Touch* touch, Event* e);
};

#endif
