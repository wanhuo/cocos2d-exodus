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

#include "Environment.h"
#include "Game.h"

/**
 *
 *
 *
 */
Environment::Environment()
{
  this->creatures = new Creatures;

  this->water1 = new Water(Water::TYPE1);
  this->water2 = new Water(Water::TYPE2);
  this->water3 = new Water(Water::TYPE3);

  this->parallaxes.fixed = new BatchEntity("parallaxes.png", Application->g, true);
  this->parallaxes.dynamic = new ParallaxPool(Application->game);

  this->parallaxes.fixed->disableBlending();

  this->test();

  this->hand = new AnimatedEntity("tutorial-hand.png", 2, 1, Application->e);
  this->hand->animate(0.2);
  this->hand->setPosition(Application->center.x / 0.75, Application->center.y / 2 + (Application->parameters.ad ? 100 : 0));

  this->pointers = new Pool(new Pointer, Application->game, true);
  this->barrors = new Pool(new Barror, Application->c, true);

  this->fishes = new Pool(
    new Fish(
      new Pool(new Fish::Decoration, Application->w, true)
    ), 2, Application->w
  );

  if(!Application->parameters.ad)
  {
    this->parallaxes.dynamic->setPosition(0, 100);
  }
}

Environment::~Environment()
{
}

/**
 *
 *
 *
 */
void Environment::test()
{
  auto rootJsonData = Json_create(FileUtils::getInstance()->getStringFromFile("environment-1.json").c_str());
  auto elementsJsonData = Json_getItem(rootJsonData, "elements");

  for(auto elementJsonData = elementsJsonData->child; elementJsonData; elementJsonData = elementJsonData->next)
  {
    int type = Json_getInt(elementJsonData, "type", 0);

    switch(type)
    {
      case Parallax::TYPE_STATIC:
      this->addStaticParallax(elementJsonData);
      break;
      case Parallax::TYPE_DYNAMIC:
      this->addDynamicParallax(elementJsonData);
      break;
    }
  }
}

/**
 *
 *
 *
 */
void Environment::addStaticParallax(Json* elementJsonData)
{
  auto texture = Json_getString(elementJsonData, "texture", "");

  auto anchorJsonData = Json_getItem(elementJsonData, "anchor");
  auto scaleJsonData = Json_getItem(elementJsonData, "scale");

  auto anchorX = Json_getFloat(anchorJsonData, "x", 0.0f);
  auto anchorY = Json_getFloat(anchorJsonData, "y", 0.0f);

  auto scaleX = Json_getFloat(scaleJsonData, "x", 0.0f);
  auto scaleY = Json_getFloat(scaleJsonData, "y", 0.0f);
  auto scaleA = Json_getInt(scaleJsonData, "a", 0);

  auto x = Json_getFloat(elementJsonData, "x", 0.0f);
  auto y = Json_getFloat(elementJsonData, "y", 0.0f);

  auto element = new Entity(texture, this->parallaxes.fixed, true);

  element->setAnchorPoint(Vec2(anchorX, anchorY));
  element->setScale(scaleX, scaleY);
  element->setPosition(x, y);

  if(scaleA)
  {
    element->setScaleX(Application->width / element->getWidth());
  }
}

void Environment::addDynamicParallax(Json* elementJsonData)
{
  auto anchorJsonData = Json_getItem(elementJsonData, "anchor");
  auto widthJsonData = Json_getItem(elementJsonData, "width");

  auto scaleJsonData = Json_getItem(elementJsonData, "scale");
  auto scaleXJsonData = Json_getItem(scaleJsonData, "x");
  auto scaleYJsonData = Json_getItem(scaleJsonData, "y");

  auto speedJsonData = Json_getItem(elementJsonData, "speed");
  auto speedXJsonData = Json_getItem(speedJsonData, "x");
  auto speedYJsonData = Json_getItem(speedJsonData, "y");

  auto positionJsonData = Json_getItem(elementJsonData, "position");
  auto positionXJsonData = Json_getItem(positionJsonData, "x");
  auto positionYJsonData = Json_getItem(positionJsonData, "y");

  auto element = new Parallax({
    Json_getString(elementJsonData, "texture", ""),
    
    Json_getInt(elementJsonData, "z", 0),
    Json_getFloat(elementJsonData, "x", 0.0f),
    Json_getFloat(elementJsonData, "y", 0.0f),

    Json_getFloat(anchorJsonData, "x", 0.0f),
    Json_getFloat(anchorJsonData, "y", 0.0f),

    Json_getFloat(scaleXJsonData, "min", 0.0f),
    Json_getFloat(scaleXJsonData, "max", 0.0f),

    Json_getFloat(scaleYJsonData, "min", 0.0f),
    Json_getFloat(scaleYJsonData, "max", 0.0f),

    Json_getFloat(speedXJsonData, "min", 0.0f),
    Json_getFloat(speedXJsonData, "max", 0.0f),

    Json_getFloat(speedYJsonData, "min", 0.0f),
    Json_getFloat(speedYJsonData, "max", 0.0f),

    Json_getFloat(positionXJsonData, "min", 0.0f),
    Json_getFloat(positionXJsonData, "max", 0.0f),

    Json_getFloat(positionYJsonData, "min", 0.0f),
    Json_getFloat(positionYJsonData, "max", 0.0f),

    Json_getFloat(widthJsonData, "min", 0.0f),
    Json_getFloat(widthJsonData, "max", 0.0f)
  });

  this->parallaxes.dynamic->addElement(element);
}

/**
 *
 *
 *
 */
void Environment::onMenu()
{
  Music->play("music-1", true);
}

void Environment::onAnimation()
{
}

void Environment::onPrepare()
{
  this->pointers->clear();
  this->barrors->clear();
}

void Environment::onStart()
{
  this->hand->_create();
}

void Environment::onGame()
{
  this->hand->_destroy();
}

void Environment::onLose()
{
}

/**
 *
 *
 *
 */
void Environment::updateBaloons(float time)
{
}

void Environment::updateFishes(float time)
{
  if(this->fishes->count < this->fishes->capacity)
  {
    if(probably(10))
    {
      this->fishes->_create();
    }
  }
}

void Environment::updateMissiles(float time)
{
}

void Environment::updateRockets(float time)
{
}

void Environment::updateWater(float time)
{
  float x = Application->w->getPositionX();
  float y = Application->w->getPositionY() + 100 * time;

  Application->w->setPosition(x, y);
}

/**
 *
 *
 *
 */
void Environment::update(float time)
{
  this->updateMissiles(time);
  this->updateBaloons(time);
  this->updateFishes(time);
  this->updateMissiles(time);
  this->updateRockets(time);

  if(Application->state == Game::STATE_GAME)
  {
    if(Application->character->state == Character::STATE_GAME)
    {
      this->updateWater(time);
    }
  }
}
