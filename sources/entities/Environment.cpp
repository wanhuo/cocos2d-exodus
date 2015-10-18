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

  this->background1 = new Entity("background-1.png", Application->g);
  this->background2 = new Entity("background-2.png", Application->g);
  this->background3 = new Entity("background-3.png", Application->g);
  this->background4 = new Entity("background-4.png", Application->g);

  this->background1->_create()->setPosition(Application->center.x, Application->center.y + Application->height * 0);
  this->background2->_create()->setPosition(Application->center.x, Application->center.y + Application->height * 1);
  this->background3->_create()->setPosition(Application->center.x, Application->center.y + Application->height * 2);
  this->background4->_create()->setPosition(Application->center.x, Application->center.y + Application->height * 3);

  this->background1->setScaleX((Application->width + 100) / this->background1->getContentSize().width);
  this->background2->setScaleX((Application->width + 100) / this->background2->getContentSize().width);
  this->background3->setScaleX((Application->width + 100) / this->background3->getContentSize().width);
  this->background4->setScaleX((Application->width + 100) / this->background4->getContentSize().width);

  this->background1->disableBlending();
  this->background2->disableBlending();
  this->background3->disableBlending();
  this->background4->disableBlending();

  this->background1->setLocalZOrder(0);
  this->background2->setLocalZOrder(1);
  this->background3->setLocalZOrder(2);
  this->background4->setLocalZOrder(3);

  this->water1 = new Water(Water::TYPE1);
  this->water2 = new Water(Water::TYPE2);
  this->water3 = new Water(Water::TYPE3);

  this->parallaxes = new ParallaxPool(Application->game);
  //this->parallaxes->addElement(new Cloud("cloud-1.png"));
  //this->parallaxes->addElement(new Cloud("cloud-2.png"));
  this->parallaxes->addElement(new Mountain);
  this->parallaxes->addElement(new Mountain);
  this->parallaxes->addElement(new Tree("tree-1.png"));
  this->parallaxes->addElement(new Tree("tree-2.png"));
  this->parallaxes->addElement(new Tree("tree-3.png"));
  this->parallaxes->addElement(new Ground);

  this->hand = new AnimatedEntity("tutorial-hand.png", 2, 1, Application->e);
  this->hand->animate(0.2);
  this->hand->setPosition(Application->center.x / 0.75, Application->center.y / 2 + (Application->parameters.ad ? 100 : 0));

  this->fishes = new Pool(
    new Fish(
      new Pool(new Fish::Decoration, Application->w, true)
    ), 2, Application->w
  );

  if(!Application->parameters.ad)
  {
    this->parallaxes->setPosition(0, 100);
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
void Environment::onMenu()
{
  Music->play("music-1", true);
}

void Environment::onAnimation()
{
}

void Environment::onPrepare()
{
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
    if(probably(1))
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
