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

#ifndef _WATER_H_
#define _WATER_H_

#include "ParallaxPool.h"

/**
 *
 *
 *
 */
class Water : public ParallaxPool
{
  /**
   *
   *
   *
   */
  protected:
  int type;

  virtual void initType1();
  virtual void initType2();
  virtual void initType3();

  /**
   *
   *
   *
   */
  public:
  static const int TYPE1 = 1;
  static const int TYPE2 = 2;
  static const int TYPE3 = 3;

  Water(int type, Node* parent);
 ~Water();

  virtual void reset();
};

#endif
