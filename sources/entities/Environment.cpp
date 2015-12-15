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
}

Environment::~Environment()
{
}

/**
 *
 *
 *
 */
void Environment::setup(const char* texture, const char* data)
{
  this->parallaxes.fixed = new BatchEntity(texture, true);
  this->parallaxes.dynamic = new ParallaxPool;

  this->parallaxes.fixed->retain();
  this->parallaxes.dynamic->retain();

  this->parallaxes.fixed->setLocalZOrder(-1);
  this->parallaxes.dynamic->setLocalZOrder(-2);

  auto rootJsonData = Json_create(FileUtils::getInstance()->getStringFromFile(data).c_str());
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
void Environment::onCreate()
{
  Application->g->addChild(this->parallaxes.fixed);
  Application->game->addChild(this->parallaxes.dynamic);

  if(!Application->parameters.ad)
  {
    this->parallaxes.dynamic->setPosition(0, 100);
  }
  else
  {
    this->parallaxes.dynamic->setPosition(0, 0);
  }
}

void Environment::onDestroy()
{
  this->parallaxes.fixed->removeFromParent();
  this->parallaxes.dynamic->removeFromParent();

  Director::getInstance()->getTextureCache()->removeUnusedTextures();
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
  auto z = Json_getFloat(elementJsonData, "z", 0.0f);

  auto element = new Entity(texture, this->parallaxes.fixed, true);

  element->setAnchorPoint(Vec2(anchorX, anchorY));
  element->setScale(scaleX, scaleY);
  element->setPosition(x, y);
  element->setLocalZOrder(z);

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
}

void Environment::onAnimation()
{
  this->parallaxes.dynamic->runAction(
    MoveTo::create(0.5, Vec2(0, Application->parameters.ad ? 0 : 100))
  );
}

void Environment::onPrepare()
{
}

void Environment::onStart()
{
}

void Environment::onGame()
{
}

void Environment::onLose()
{
}

/**
 *
 *
 *
 */
void Environment::updateWater(float time)
{
  /**
   *
   * @Optional
   * It can be disabled due to better world view.
   * Disable it only if you are using more than 1 parallax world.
   *
   */
  if(Application->w->getNumberOfRunningActions() < 1)
  {
    float x = Application->w->getPositionX();
    float y = Application->w->getPositionY() + 100 * time * Application->character->parameters.time;

    Application->w->setPosition(x, y);
  }
}

/**
 *
 *
 *
 */
void Environment::update(float time)
{
  if(Application->state == Game::STATE_GAME)
  {
    if(Application->character->state == Character::STATE_GAME)
    {
      this->updateWater(time);
    }
  }
}

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

Environment1::Environment1()
{
  this->setup("parallaxes.png", "environment-1.json");

  this->fishes = new Pool(
    new Fish(
      new Pool(new Fish::Decoration, Application->w, true)
    ), 2, Application->w
  );
}

Environment1::~Environment1()
{
}

/**
 *
 *
 *
 */
void Environment1::onCreate()
{
  Environment::onCreate();
}

void Environment1::onDestroy()
{
  Environment::onDestroy();

  /**
   *
   *
   *
   */
  this->fishes->clear();
}

/**
 *
 *
 *
 */
void Environment1::onMenu()
{
}

void Environment1::onAnimation()
{
  Environment::onAnimation();
}

void Environment1::onPrepare()
{
}

void Environment1::onStart()
{
}

void Environment1::onGame()
{
}

void Environment1::onLose()
{
}

/**
 *
 *
 *
 */
void Environment1::updateBaloons(float time)
{
}

void Environment1::updateFishes(float time)
{
  if(this->fishes->count < this->fishes->capacity)
  {
    if(probably(10))
    {
      this->fishes->_create();
    }
  }
}

/**
 *
 *
 *
 */
void Environment1::update(float time)
{
  Environment::update(time);

  /**
   *
   *
   *
   */
  this->updateBaloons(time);
  this->updateFishes(time);
}

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

Environment2::Environment2()
{
  this->setup("environment-2.png", "environment-2.json");

  this->missiles = new Pool(new Missile, Application->v);
}

Environment2::~Environment2()
{
}

/**
 *
 *
 *
 */
void Environment2::onCreate()
{
  Environment::onCreate();
}

void Environment2::onDestroy()
{
  Environment::onDestroy();

  /**
   *
   *
   *
   */
  this->missiles->clear();
}

/**
 *
 *
 *
 */
void Environment2::updateMissiles(float time)
{
  /**
   *
   * @Optional
   * Somebody think that game with missiles is too hard.
   * So we can disable it here.
   *
   */
  if(this->missiles->count < 3)
  {
    if(Application->d->getScale() <= Game::SCALE_MIN)
    {
      if(probably(1))
      {
        this->missiles->_create();
      }
    }
  }
}

/**
 *
 *
 *
 */
void Environment2::update(float time)
{
  Environment::update(time);

  /**
   *
   *
   *
   */
  //this->updateMissiles(time);
}
