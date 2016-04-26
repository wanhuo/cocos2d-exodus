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

#ifndef _CHARACTER_H_
#define _CHARACTER_H_

#include "Spine.h"

#include "CharacterTypes.h"
#include "Explanation.h"
#include "Pointer.h"

/**
 *
 *
 *
 */
class Character : public Spine
{
  /**
   *
   *
   *
   */
  private:
  class Smoke : public Entity
  {
    public:
    Smoke();
   ~Smoke();

    virtual void onCreate();
    virtual void onDestroy(bool action = false);

    Smoke* deepCopy();
  };

  struct Animations
  {
    SpineAnimation menu;
    SpineAnimation animation;
    SpineAnimation save;
    SpineAnimation engine_start;
    SpineAnimation engine_finish;
    SpineAnimation engine_repeat;
    SpineAnimation status_start;
    SpineAnimation status_finish;
  };

  Animations animations;

  /**
   *
   *
   *
   */
  protected:
  Explanation* explanation;

  bool allowSwipe;

  float smokeTime = 0.02;
  float smokeTimeElapsed = 0;

  /**
   *
   *
   *
   */
  public:
  const static int STATE_NONE = 0;
  const static int STATE_MENU = 1;
  const static int STATE_ANIMATION = 2;
  const static int STATE_SEND = 3;
  const static int STATE_PREPARE = 4;
  const static int STATE_START = 5;
  const static int STATE_RESTORE = 6;
  const static int STATE_GAME = 7;
  const static int STATE_TRANSFER = 8;
  const static int STATE_LOSE = 9;
  const static int STATE_LOSE_WATER = 10;
  const static int STATE_LOSE_MISTAKE = 11;

  const static int COLLISION_SIZE_X = 99;
  const static int COLLISION_SIZE_Y = 99;

  Entity* shadow;

  Parameters parameters;
  Generate generate;

  Swipe swipe;

  Pool* smoke;

  Character();
 ~Character();

  int state = 0;
  int index = 0;
  int index_generated = 0;

  virtual void reset();

  virtual void onEnter();
  virtual void onExit();

  virtual void onCreate();
  virtual void onDestroy(bool action = false);

  virtual void onAnimationStart(int index);
  virtual void onAnimationFinish(int index);
  virtual void onAnimationComplete(int index, int count);
  virtual void onAnimationEvent(int index, spEvent* event);

  virtual void onMenu();
  virtual void onAnimation();
  virtual void onSend();
  virtual void onPrepare();
  virtual void onStart();
  virtual void onRestore();
  virtual void onGame();
  virtual void onTransfer();
  virtual void onLose();
  virtual void onLoseWater();
  virtual void onLoseMistake();

  virtual bool onSwipe();

  virtual void onSwipeUp();
  virtual void onSwipeDown();
  virtual void onSwipeLeft();
  virtual void onSwipeRight();

  virtual void onTouch();
  virtual void onSave();

  virtual void onPointerSuccess(Pointer* pointer);
  virtual void onPointerMistake(Pointer* pointer);
  virtual void onPointerCoin(Pointer* pointer);
  virtual void onPointerFail();

  virtual void proceedPointer();

  virtual Pointer* getCollisionPointer();
  virtual int getCollisionIndex();

  virtual void startSound();
  virtual void stopSound();

  virtual void startUpdateTraectory();
  virtual void stopUpdateTraectory();

  virtual void onUpdateTraectoryStart();
  virtual void onUpdateTraectoryFinish();

  virtual void onUpdateTraectory();

  virtual void onUpdateTraectoryBonusCreate();
  virtual void onUpdateTraectoryBonusDestroy();

  virtual bool isOnBonusTraectory(float x = -1);

  virtual void changeState(int state);

  virtual void updateMenu(float time);
  virtual void updateAnimation(float time);
  virtual void updateStart(float time);
  virtual void updatePrepare(float time);
  virtual void updateRestore(float time);
  virtual void updateGame(float time);
  virtual void updateTransfer(float time);
  virtual void updateSend(float time);
  virtual void updateLose(float time);
  virtual void updateLoseWater(float time);
  virtual void updateLoseMistake(float time);

  virtual void updatePosition();
  virtual Vec2 updatePosition(Parameters &parameters, float time);
  virtual Vec2 updatePosition(Parameters &parameters);

  virtual void updateShadow(float time);
  virtual void updateSmoke(float time);
  virtual void updateStatus(bool state);

  virtual void updatePointers();

  virtual void updateSkin();

  virtual void updateStates(float time);
  virtual void update(float time);
};

#endif
