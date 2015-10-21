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

#ifndef _FINISH_H_
#define _FINISH_H_

#include "Screen.h"

#include "Background.h"
#include "BackgroundColor.h"
#include "Button.h"
#include "Spine.h"

#include "FinishCounter.h"
#include "AnimatedButton.h"
#include "VideoButton.h"
#include "GiftButton.h"
#include "CharacterButton.h"

/**
 *
 *
 *
 */
class Finish : public Screen
{
  /**
   *
   *
   *
   */
  private:
  static Finish* instance;
  
  struct Elapsed {
    int video = 0;
    int gift = random(0, 15);
    int ad = -1;
  };

  struct Parameters {
    int video = 5;
    int gift = 15;
    int ad = 5;
    Elapsed elapsed;
  };

  struct Buttons {
    Button* play;
    Button* like;
    Button* rate;
    Button* share;
    Button* leaderboards;
    Button* achievements;
    Button* sound;
    Button* store;
    Button* noad;

    VideoButton* video;
    GiftButton* gift;
    CharacterButton* character;
  };

  /**
   *
   *
   *
   */
  protected:
  Entity* background;
  Buttons buttons;

  FinishCounter* counter;

  Spine* decoration;

  float backgroundTextureX;
  float backgroundTextureY;

  /**
   *
   *
   *
   */
  public:
  static Finish* getInstance();

  Finish();
 ~Finish();

  Background* holder;

  Parameters parameters;

  virtual void onEnter();
  virtual void onExit();

  virtual void onSound();
  virtual void onBack();

  virtual void onMoveUp();
  virtual void onMoveDown();

  virtual void show();
  virtual void hide();

  virtual void showButtons();

  virtual void updateSoundState();

  virtual void update(float time);
};

#endif