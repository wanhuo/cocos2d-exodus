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

#include "spine/Json.h"

/**
 *
 *
 *
 */
Positions::Positions()
{
  this->parseMenu();
  this->parseFinish();
  this->parseAnchor();
}

Positions::~Positions()
{
}

/**
 *
 *
 *
 */
void Positions::parse(const char* space, shared_ptr<Vector<Vec2Ref*>> vector)
{
  int i;

  Json* root;
  Json* elements;
  Json* element;

  root = Json_create(FileUtils::getInstance()->getStringFromFile("positions.json").c_str());
  elements = Json_getItem(root, space);

  for(element = elements->child, i = 0; element; element = element->next, ++i)
  {
    float x = Json_getFloat(element, "x", 0);
    float y = Json_getFloat(element, "y", 0);

    vector->pushBack(new Vec2Ref(x, y));
  }
}

/**
 *
 *
 *
 */
void Positions::parseMenu()
{
  this->parse("menu", this->menu);
}

void Positions::parseFinish()
{
  this->parse("finish", this->finish);
}

void Positions::parseAnchor()
{
  this->parse("anchor", this->anchor);
}
