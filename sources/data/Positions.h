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

#ifndef _POSITIONS_H_
#define _POSITIONS_H_

#include "Macros.h"

/**
 *
 *
 *
 */
class Vec2Ref : public Ref
{
  public:
  float x;
  float y;

  Vec2Ref(float x, float y)
  {
    this->x = x;
    this->y = y;
  }
};

/**
 *
 *
 *
 */
class Positions : public Ref
{
  /**
   *
   *
   *
   */
  private:
  void parse(const char* space, shared_ptr<Vector<Vec2Ref*>>);

  void parseMenu();
  void parseFinish();
  void parseAnchor();

  /**
   *
   *
   *
   */
  public:
  Positions();
 ~Positions();

  shared_ptr<Vector<Vec2Ref*>> menu = make_shared<Vector<Vec2Ref*>>();
  shared_ptr<Vector<Vec2Ref*>> finish = make_shared<Vector<Vec2Ref*>>();
  shared_ptr<Vector<Vec2Ref*>> anchor = make_shared<Vector<Vec2Ref*>>();
};

#endif
