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

#ifndef _ENVIRONMENT_H_
#define _ENVIRONMENT_H_

#include "Events.h"

#include "Entity.h"
#include "TiledEntity.h"
#include "AnimatedEntity.h"
#include "BatchEntity.h"

#include "ParallaxPool.h"
#include "Parallax.h"

#include "Creatures.h"
#include "Human.h"
#include "Fish.h"
#include "Pointer.h"
#include "Barror.h"

/**
 *
 *
 *
 */
class Environment : public Ref
{
  /**
   *
   *
   *
   */
  private:
  struct Parallaxes
  {
    BatchEntity* fixed;
    ParallaxPool* dynamic;
  };

  virtual void addStaticParallax(Json* elementJsonData);
  virtual void addDynamicParallax(Json* elementJsonData);
  
  /**
   *
   *
   *
   */
  protected:
  Parallaxes parallaxes;

  void setup(const char* texture, const char* data);

  /**
   *
   *
   *
   */
  public:
  Environment();
 ~Environment();

  virtual void onCreate();
  virtual void onDestroy();

  virtual void onMenu();
  virtual void onAnimation();
  virtual void onPrepare();
  virtual void onStart();
  virtual void onGame();
  virtual void onLose();

  virtual void update(float time);
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

class Environment1 : public Environment
{
  /**
   *
   *
   *
   */
  public:
  Environment1();
 ~Environment1();

  Pool* fishes;
  Pool* baloons;
  Pool* rockets;

  virtual void onCreate();
  virtual void onDestroy();

  virtual void onMenu();
  virtual void onAnimation();
  virtual void onPrepare();
  virtual void onStart();
  virtual void onGame();
  virtual void onLose();

  virtual void updateBaloons(float time);
  virtual void updateFishes(float time);
  virtual void updateWater(float time);

  virtual void update(float time);
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

class Environment2 : public Environment
{
  /**
   *
   *
   *
   */
  public:
  Environment2();
 ~Environment2();

  Pool* missiles;

  virtual void onCreate();
  virtual void onDestroy();

  virtual void updateMissiles(float time);

  virtual void update(float time);
};

#endif
