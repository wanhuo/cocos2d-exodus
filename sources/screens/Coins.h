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

#ifndef _COINS_H_
#define _COINS_H_

#include "ExtendScreen.h"

#include "Entity.h"
#include "Button.h"
#include "Text.h"
#include "Pool.h"

#include "Coin.h"

/**
 *
 *
 *
 */
class Coins : public ExtendScreen
{
  /**
   *
   *
   *
   */
  private:
  struct Buttons {
    Button* back;
  };

  struct Texts {
    Text* coins = nullptr;
  };

  struct Counter {
    int add = 0;
    int remove = 0;
  };

  /**
   *
   *
   *
   */
  private:
  Pool* coins;

  Texts texts;
  Buttons buttons;

  Counter counter;

  Entity* holder;

  /**
   *
   *
   *
   */
  public:
  Coins(bool environment = false);
  ~Coins();

  void onEnter();
  void onExit();

  void onEnterTransitionDidFinish();
  void onExitTransitionDidStart();

  virtual void createCoins(int count, int coins = 0);
  virtual void clearCoins();

  virtual void addCoins(int count);
  virtual void removeCoins(int count);

  virtual void updateTextData();
};

#endif
