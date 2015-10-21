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

#ifndef _PARALLAX_H_
#define _PARALLAX_H_

#include "ParallaxEntity.h"

/**
 *
 *
 *
 */
class Parallax : public ParallaxEntity
{
  /**
   *
   *
   *
   */
  public:
  struct Parameters
  {
    const char* texture;

    int z;

    float x;
    float y;

    float anchor_x;
    float anchor_y;

    float scale_x_min;
    float scale_x_max;
    float scale_y_min;
    float scale_y_max;

    float speed_x_min;
    float speed_x_max;
    float speed_y_min;
    float speed_y_max;

    float position_x_min;
    float position_x_max;
    float position_y_min;
    float position_y_max;

    float width_min;
    float width_max;

    bool scale_x;
    bool scale_y;
    bool position_x;
    bool position_y;
    bool width;
  };

  Parameters parameters;

  /**
   *
   *
   *
   */
  public:
  static const int TYPE_STATIC = 0;
  static const int TYPE_DYNAMIC = 1;

  Parallax(Parameters parameters);
 ~Parallax();

  virtual void onCreate();
  virtual void onDestroy(bool action = false);

  virtual void setParallaxPosition();

  virtual void update(float time);

  Parallax* deepCopy();
};

#endif
