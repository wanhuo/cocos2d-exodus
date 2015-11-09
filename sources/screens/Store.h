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
class Store : public Screen
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
    vector<ItemCharacter*> characters;
    vector<ItemCreature*> creatures;
    vector<ItemEnvironment*> environments;
  };


  struct Texts {
    Text* coins;
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

  Texts texts;
  Buttons buttons;

  Pool* coins;

  Entity* coin;

  /**
   *
   *
   *
   */
  public:
  static Store* getInstance();

  Store();
 ~Store();

  Items items;

  BackgroundPages* list;

  virtual void onEnter();
  virtual void onExit();

  virtual void onPageChanged();

  virtual void onBack();

  virtual void show();
  virtual void hide();

  virtual void showPage(int index);

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

  virtual void onEnter();
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
  protected:
  vector<ItemCharacter*> items;

  /**
   *
   *
   *
   */
  public:
  StoreLayoutCharacters();
 ~StoreLayoutCharacters();

  virtual void onEnter();
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
  protected:
  vector<ItemCreature*> items;

  /**
   *
   *
   *
   */
  public:
  StoreLayoutCreatures();
 ~StoreLayoutCreatures();

  virtual void onEnter();
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
  protected:
  vector<ItemEnvironment*> items;

  /**
   *
   *
   *
   */
  public:
  StoreLayoutEnvironments();
 ~StoreLayoutEnvironments();

  virtual void onEnter();
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
  protected:
  vector<ItemCoins*> items;

  /**
   *
   *
   *
   */
  public:
  StoreLayoutCoins();
 ~StoreLayoutCoins();
};

#endif
