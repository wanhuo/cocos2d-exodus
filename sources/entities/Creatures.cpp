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

#include "Game.h"

/**
 *
 *
 *
 */
Creatures::Creatures()
{
  this->humans = new Pool(new Human, Application->game);
  this->apatosauruses = new Pool(new Apatosaurus, Application->game);
  this->stegosauruses = new Pool(new Stegosaurus, Application->game);
  this->triceratopses = new Pool(new Triceratops, Application->game);
}

Creatures::~Creatures()
{
}

/**
 *
 *
 *
 */
void Creatures::onCreate()
{
  this->count++;
}

void Creatures::onDestroy()
{
  this->count--;

  if(this->count < 1)
  {
    Application->changeState(Game::STATE_START);
  }

  Application->character->onSave();
}

/**
 *
 *
 *
 */
void Creatures::onAction()
{
  for(int i = 0; i < this->humans->count; i++)
  {
    Creature* element = (Creature*) this->humans->element(i);

    element->onAction();
  }

  for(int i = 0; i < this->apatosauruses->count; i++)
  {
    Creature* element = (Creature*) this->apatosauruses->element(i);

    element->onAction();
  }

  for(int i = 0; i < this->stegosauruses->count; i++)
  {
    Creature* element = (Creature*) this->stegosauruses->element(i);

    element->onAction();
  }

  for(int i = 0; i < this->triceratopses->count; i++)
  {
    Creature* element = (Creature*) this->triceratopses->element(i);

    element->onAction();
  }
}

/**
 *
 *
 *
 */
void Creatures::create()
{
  int humans = this->getHumansCouns();
  int apatosauruses = this->getApatosaurusesCouns();
  int stegosauruses = this->getStegosaurusesCouns();
  int triceratopses = this->getTriceratopsesCouns();

  for(int i = 0; i < humans; i++)
  {
    this->humans->_create();
  }

  for(int i = 0; i < apatosauruses; i++)
  {
    this->apatosauruses->_create();
  }

  for(int i = 0; i < stegosauruses; i++)
  {
    this->stegosauruses->_create();
  }

  for(int i = 0; i < triceratopses; i++)
  {
    this->triceratopses->_create();
  }
}

/**
 *
 *
 *
 */
int Creatures::getHumansCouns()
{
  return Storage::get("items.creatures.human.count");
}

int Creatures::getApatosaurusesCouns()
{
  return Storage::get("items.creatures.apatosaurus.count");
}

int Creatures::getStegosaurusesCouns()
{
  return Storage::get("items.creatures.stegosaurus.count");
}

int Creatures::getTriceratopsesCouns()
{
  return Storage::get("items.creatures.triceratops.count");
}
