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

#ifndef _STORE_H_
#define _STORE_H_

#include "Screen.h"

#include "Text.h"
#include "Entity.h"
#include "Button.h"
#include "Background.h"
#include "BackgroundColor.h"

class StoreView;

/**
 *
 *
 *
 */
class Store : public Screen
{
  /**
   *
   *
   *
   */
  private:
  static Store* instance;

  struct Texts
  {
    Text* coins;
  };

  struct Buttons {
    Button* back;

    vector<Button*> switchers;
  };

  /**
   *
   *
   *
   */
  protected:
  BackgroundColor* background;

  Entity* coins;
  Entity* decoration;
  Entity* baloon;

  Texts texts;
  Buttons buttons;

  vector<StoreView*> views;

  /**
   *
   *
   *
   */
  public:
  static Store* getInstance();

  Store();
 ~Store();

  virtual void onEnter();
  virtual void onExit();

  virtual void onBack();

  virtual void onView1();
  virtual void onView2();
  virtual void onView3();

  virtual void show();
  virtual void hide();

  virtual void updateViews(int index, bool enter = false);

  virtual void updateTextData();
};

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

class StoreView : public Background
{
  /**
   *
   *
   *
   */
  public:
  StoreView();
 ~StoreView();
};

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
class StoreView1 : public StoreView
{
  /**
   *
   *
   *
   */
  public:
  StoreView1();
 ~StoreView1();
};

#endif