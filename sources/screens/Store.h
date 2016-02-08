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

#ifndef _STORE_H_
#define _STORE_H_

#include "Coins.h"

#include "Entity.h"
#include "Text.h"
#include "Button.h"
#include "Background.h"
#include "BackgroundColor.h"
#include "BackgroundScroll.h"
#include "BackgroundPages.h"

#include "Item.h"

/**
 *
 *
 *
 */
class Store : public Coins
{
  /**
   *
   *
   *
   */
  private:
  static Store* instance;

  struct Items
  {
    vector<Item*> characters;
    vector<Item*> creatures;
    vector<Item*> environments;
  };

  struct Buttons {
    Button* back;

    vector<Button*> root;
  };

  /**
   *
   *
   *
   */
  protected:
  float size;

  BackgroundColor* background;
  BackgroundColor* holder;

  Buttons buttons;

  /**
   *
   *
   *
   */
  public:
  static Store* getInstance();

  Items items;

  BackgroundPages* list;

  Store();
 ~Store();

  virtual void onEnter();
  virtual void onExit();

  virtual void onPageChanged();

  virtual void changePage(int index);
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
class StoreLayout : public cocos2d::ui::Layout
{
  /**
   *
   *
   *
   */
  private:
  struct Texts
  {
    Text* title1;
    Text* title2;
    Text* description;
  };

  /**
   *
   *
   *
   */
  protected:
  Entity* holder = nullptr;

  Texts texts;

  BackgroundScroll* scroll;

  /**
   *
   *
   *
   */
  public:
  StoreLayout();
 ~StoreLayout();

  vector<Item*> items;

  virtual void onEnter();
  virtual void onExit();

  virtual void onPageEnter();

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
class StoreLayoutCharacters : public StoreLayout
{
  /**
   *
   *
   *
   */
  private:
  void updateItems();
  void updateListHeight();

  /**
   *
   *
   *
   */
  public:
  StoreLayoutCharacters();
 ~StoreLayoutCharacters();

  virtual void onEnter();
  virtual void onExit();
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
class StoreLayoutCreatures : public StoreLayout
{
  /**
   *
   *
   *
   */
  private:
  void updateItems();
  void updateListHeight();

  /**
   *
   *
   *
   */
  public:
  StoreLayoutCreatures();
 ~StoreLayoutCreatures();

  virtual void onEnter();
  virtual void onExit();
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
class StoreLayoutEnvironments : public StoreLayout
{
  /**
   *
   *
   *
   */
  private:
  void updateItems();
  void updateListHeight();

  /**
   *
   *
   *
   */
  public:
  StoreLayoutEnvironments();
 ~StoreLayoutEnvironments();

  virtual void onEnter();
  virtual void onExit();
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
class StoreLayoutCoins : public StoreLayout
{
  /**
   *
   *
   *
   */
  private:
  void updateItems();
  void updateListHeight();

  /**
   *
   *
   *
   */
  public:
  StoreLayoutCoins();
 ~StoreLayoutCoins();

  virtual void updateTextData();
};

#endif
