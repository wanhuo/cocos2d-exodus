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

#ifndef _CHARACTERTYPES_H_
#define _CHARACTERTYPES_H_

#include "Macros.h"

/**
 *
 *
 *
 */
struct WHATMax
{
  float x;
  float y;

  Vec2 increase = Vec2(100, 0);
  Vec2 setup = Vec2(1200, 500);
};

struct WHATincrease
{
  float x = 0.0;
  float y = 5.0;

  Vec2 increase = Vec2(0.1, 0.0);
};

struct WHATdecrease
{
  float x = 0.0;
  float y = 3.0;

  Vec2 max = Vec2(0.0, 10.0);
};

struct WHATexponesial
{
  bool state = false;

  float x = 1.0;

  float increase = 0.01;
  float decrease = 0.01;

  float max = 1.2;
  float min = 0.8;
};

struct Prediction
{
  float x;
  bool action;
  bool active = true;
  bool done = false;
};

struct Parameters
{
  bool state;
  bool active;

  float x;
  float y;
  float time = 1;

  vector<Prediction> predictions;

  Vec2 setup = Vec2(0, 0);

  WHATMax max;
  Vec2 min = Vec2(0, -2000);

  Vec2 maximum = Vec2(2000, 0);

  WHATincrease increase;
  WHATdecrease decrease;

  WHATexponesial exponesial;

  int sound;
};

struct Generate
{
  int start;
  int rest;
  int create;

  float x;
  float y;

  float coins;
  int red;

  int count = 0;

  Parameters parameters;

  bool bonus;
  vector<Vec2> bonus_points;
};

struct Swipe
{
  bool update;
  bool direction;
  bool reverse;

  float x;
  float y;

  Vec2 increase;
  Vec2 decrease;

  Vec2 max;
  Vec2 min;
};

#endif
