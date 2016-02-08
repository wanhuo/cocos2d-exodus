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

#ifndef _ROCKET_H_
#define _ROCKET_H_

#include "TiledEntity.h"
#include "Pool.h"

/**
 *
 *
 *
 */
class Rocket : public TiledEntity
{
  private:
  struct SmallDecorations
  {
    float time = 1;
    float elapsed = 0;
  };

  /**
   *
   *
   *
   */
  public:
  struct RocketDecoations
  {
    Pool* small;
    Pool* large;

    SmallDecorations times;
  };

  /**
   *
   *
   *
   */
  protected:
  RocketDecoations decorations;

  Vec2 speed;
  Vec2 vector;

  bool position = false;

  /**
   *
   *
   *
   */
  public:
  Rocket(RocketDecoations decorations);
 ~Rocket();

  virtual void onCreate();
  virtual void onDestroy(bool action = false);

  virtual void update(float time);

  virtual Rocket* deepCopy();

  class DecorationSmall : public Entity
  {
    /**
     *
     *
     *
     */
    public:
    DecorationSmall();
   ~DecorationSmall();

    virtual void onCreate();
    virtual void onDestroy(bool action = false);

    DecorationSmall* deepCopy();
  };

  class DecorationLarge : public Entity
  {
    /**
     *
     *
     *
     */
    public:
    DecorationLarge();
   ~DecorationLarge();

    virtual void onCreate();
    virtual void onDestroy(bool action = false);

    DecorationLarge* deepCopy();
  };
};

#endif
