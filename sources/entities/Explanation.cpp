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

#include "Game.h"

/**
 *
 *
 *
 */
Explanation::Explanation(Node* parent)
: BatchEntity("ui.png", parent)
{
  this->root = new Entity("explanation-root.png", this, true);
  this->elements = new Pool(new Entity("explanation.png"), this);

  float x = 0;
  float y = Application->center.y;

  while(y > -Application->center.y)
  {
    Entity* element = (Entity*) this->elements->_create();

    element->setPosition(x, y);

    x -= 0;
    y -= element->getHeight() * 1.5;
  }

  x = Application->center.y;
  y = 0;

  while(x > -Application->center.y)
  {
    Entity* element = (Entity*) this->elements->_create();

    element->setPosition(x, y);
    element->setRotation(90);

    x -= element->getHeight() * 1.5;
    y -= 0;
  }
}

Explanation::~Explanation()
{
}

/**
 *
 *
 *
 */
void Explanation::onCreate()
{
  BatchEntity::onCreate();

  /**
   *
   *
   *
   */
  auto position = Application->positions->anchor->at(Application->character->skinIndex);

  this->setPosition(position->x, position->y);
  this->runAction(
    RepeatForever::create(
      RotateBy::create(10.0, 360.0)
    )
  );
}

void Explanation::onDestroy(bool action)
{
  BatchEntity::onDestroy(action);
}
