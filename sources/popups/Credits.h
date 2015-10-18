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

#ifndef _CREDITS_H_
#define _CREDITS_H_

#include "Entity.h"
#include "Button.h"
#include "Text.h"
#include "Background.h"
#include "BackgroundColor.h"

#include "TutorialAnimation.h"
#include "TutorialRepeat.h"

#include "ui/CocosGUI.h"

/**
 *
 *
 *
 */
class Credits : public BackgroundColor
{
  /**
   *
   *
   *
   */
  private:
  static Credits* instance;

  struct Parameters
  {
    float time = 0.5;
    float height = 800;
    float opacity = 100;
    float padding = 150;
  };

  struct Texts
  {
    Text* titles[4];
    Text* numbers[3];

    Text* tutorial[23];
  };

  /**
   *
   *
   *
   */
  protected:
  cocos2d::ui::ScrollView* scroll;

  Background* holder;
  Background* decorations;
  BackgroundColor* background;

  Entity* decoration1;
  Entity* decoration2;
  Entity* decoration3;

  Entity* powered1;
  Entity* powered2;

  Button* twitter;
  Button* facebook;
  Button* mail;
  Button* restore;

  TutorialAnimation* tutorialAnimation1;
  TutorialAnimation* tutorialAnimation2;
  TutorialAnimation* tutorialAnimation3;

  TutorialRepeat* tutorialRepeat;

  /**
   *
   *
   *
   */
  public:
  static Credits* getInstance();

  Credits();
 ~Credits();

  Parameters parameters;
  Texts texts;

  float size;

  virtual void onEnter();
  virtual void onExit();

  virtual void onShow();
  virtual void onHide();

  virtual void onToogle();

  virtual void show();
  virtual void hide();

  virtual void toogle();

  virtual bool containsTouchLocation(cocos2d::Touch* touch);

  virtual void update(float time);
};

#endif
