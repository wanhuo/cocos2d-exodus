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

#ifndef _ITEM_H_
#define _ITEM_H_

#include "Background.h"
#include "BackgroundColor.h"
#include "Entity.h"
#include "Text.h"

/**
 *
 *
 *
 */
class Item : public BackgroundColor
{
  /**
   *
   *
   *
   */
  private:
  struct Texts
  {
    Text* coins;
    Text* missions;
    Text* count;
    Text* name;
  };

  /**
   *
   *
   *
   */
  protected:
  Texts texts;

  Entity* coin;
  Entity* nams;
  Entity* lock;
  Entity* note = nullptr;
  Entity* picture = nullptr;

  Item(Json* document);
  Item();
 ~Item();

  /**
   *
   *
   *
   */
  public:
  static const int STATE_LOCKED = 0;
  static const int STATE_LOCKED_MISSIONS = 1;
  static const int STATE_LOCKED_COINS = 2;
  static const int STATE_NORMAL = 3;
  static const int STATE_SELECTED = 4;

  int state;
  int missions = 0;
  int coins = 0;
  int capacity = 0;
  int i = 0;

  const char* id;
  const char* name = "";

  virtual void onEnter();
  virtual void onExit();

  virtual void onPurchase();
  virtual void onSelect();

  virtual void onTouchStart(cocos2d::Touch* touch, Event* e);
  virtual void onTouchFinish(cocos2d::Touch* touch, Event* e);
  virtual void onTouchCancelled(cocos2d::Touch* touch, Event* e);

  virtual void onTouch(cocos2d::Touch* touch, Event* e);

  virtual void setPicture(Entity* picture);

  virtual void setState(int state);

  virtual void saveState();
  virtual void resetState();
  virtual void updateState();
};

#endif
