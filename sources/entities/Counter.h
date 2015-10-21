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

#ifndef _COUNTER_H_
#define _COUNTER_H_

#include "Entity.h"
#include "Text.h"

#include "Storage.h"

/**
 *
 *
 *
 */
class Counter : public Entity
{
  /**
   *
   *
   *
   */
  private:
  struct Texts
  {
    Text* value;
    Text* best;
    Text* taps;
    Text* deaths;
    Text* start;
    Text* status;
    Text* coins;
    Text* decoration;
  };

  struct Values
  {
    int score = 0;
    int best = Storage::get("values-best");
    int coins = Storage::get("values-coins");
    int taps = Storage::get("values-taps");
    int deaths = Storage::get("values-deaths");
  };

  /**
   *
   *
   *
   */
  protected:
  Pool* circles;

  Entity* coins;

  /**
   *
   *
   *
   */
  public:
  Counter();
 ~Counter();

  Texts texts;
  Values values;

  virtual void onEnter();
  virtual void onExit();

  virtual void onCreate();
  virtual void onDestroy(bool action = false);

  virtual void onScore(bool update = false);
  virtual void onCoin(bool update = false);
  virtual void onTap();
  virtual void onDeath();

  virtual void onSuccess();
  virtual void onMistake();
  virtual void onFail();

  virtual void onMenu();
  virtual void onAnimation();
  virtual void onPrepare();
  virtual void onStart();
  virtual void onGame();
  virtual void onLose();

  virtual void save();
  virtual void reset();

  virtual void updateTextData();

  virtual void update(float time);
};

#endif
