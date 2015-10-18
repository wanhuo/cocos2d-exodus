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
Character::Character()
: Spine("character.json", "character.atlas", 1.0, Application->game)
{
  this->animations.animation = {1, "animation", false};
  this->animations.save = {2, "save", false};
  this->animations.engine_start = {3, "engine-start", false};
  this->animations.engine_finish = {4, "engine-finish", false};
  this->animations.engine_repeat = {5, "engine-repeat", false};
  this->animations.status_start = {6, "status-start", false};
  this->animations.status_finish = {7, "status-finish", false};

  this->skins = {
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "14",
    "16",
    "17",
    "18",
    "19",
    "20",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36"
  };

  this->shadow = new Entity("character-shadow.png", Application->game);
  this->shadow->setLocalZOrder(5);

  this->smoke = new Pool(new Smoke, Application->game);

  /**
   *
   *
   *
   */
  this->setScheduleTextures(true);
  this->setLocalZOrder(10);
}

Character::~Character()
{
}

/**
 *
 *
 *
 */
void Character::reset()
{
  this->_create();

  this->parameters.state = true;
  this->parameters.x = this->parameters.setup.x;
  this->parameters.y = this->parameters.setup.y;
  this->parameters.max.x = this->parameters.max.setup.x;
  this->parameters.max.y = this->parameters.max.setup.y;
  this->parameters.increase.x = 0;

  this->setRotation(0);
  this->setPosition(Application->center.x, Application->camera.center);
  this->setAnimation(this->animations.engine_finish);

  this->smoke->clear();

  this->shadow->setPosition(Application->center.x, Application->camera.center - 110);
}

/**
 *
 *
 *
 */
void Character::onEnter()
{
  Spine::onEnter();
}

void Character::onExit()
{
  Spine::onExit();
}

/**
 *
 *
 *
 */
void Character::onCreate()
{
  this->shadow->_create();
  this->setSkin("1");

  Spine::onCreate();
}

void Character::onDestroy(bool action)
{
  Spine::onDestroy(action);

  /**
   *
   *
   *
   */
  this->stopSound();
}

/**
 *
 *
 *
 */
void Character::onAnimationStart(int index)
{
}

void Character::onAnimationFinish(int index)
{
}

void Character::onAnimationComplete(int index, int count)
{
  switch(this->state)
  {
    case STATE_START:
    case STATE_SEND:
    case STATE_GAME:
    if(index == this->animations.engine_repeat.index)
    {
      this->setAnimation(this->animations.engine_repeat);
    }
    break;
  }

  if(index == this->animations.engine_start.index)
  {
    this->changeState(STATE_GAME);
  }
}

void Character::onAnimationEvent(int index, spEvent* event)
{
}

/**
 *
 *
 *
 */
void Character::onMenu()
{
  this->_create();
  this->setScale(0.25);
  
  auto position = Application->positions->menu->at(this->skinIndex);

  float x = Application->center.x + position->x;
  float y = position->y;

  this->setPosition(x, y);
}

void Character::onAnimation()
{
  this->setAnimation(this->animations.animation);

  this->runAction(
    Spawn::create(
      ScaleTo::create(0.5, 1.0),
      MoveTo::create(0.5, Vec2(Application->center.x, Application->camera.center)),
      nullptr
    )
  );
}

void Character::onSend()
{
  this->setAnimation(this->animations.engine_start);
  this->setAnimation(this->animations.engine_repeat);

  this->startSound();
}

void Character::onPrepare()
{
  this->reset();
}

void Character::onStart()
{
}

void Character::onGame()
{
  this->startUpdateTraectory();
}

void Character::onRestore()
{
}

void Character::onLoseWater()
{
  Sound->play("water");

  Application->runAction(
    Sequence::create(
      Shake::create(0.5, 10.0),
      CallFunc::create([=] () {
        Application->changeState(Game::STATE_LOSE);
      }),
      nullptr
    )
  );

  this->_destroy();
}

void Character::onLoseMistake()
{
}

/**
 *
 *
 *
 */
void Character::onTouch()
{
  switch(this->state)
  {
    case STATE_START:
    this->changeState(STATE_SEND);
    break;
    case STATE_GAME:
    break;
  }
}

void Character::onSave()
{
  this->setAnimation(this->animations.save);

  Sound->play("save");
}

/**
 *
 *
 *
 */
void Character::startSound()
{
  this->runAction(
    Sequence::create(
      CallFunc::create([=] ()
      {
        this->parameters.sound = Sound->play("engine-start");
      }),
      DelayTime::create(5.3),
      CallFunc::create([=] ()
      {
        this->runAction(
          RepeatForever::create(
            Sequence::create(
              CallFunc::create([=] ()
              {
                this->parameters.sound = Sound->play("engine-repeat");
              }),
              DelayTime::create(5.3),
              nullptr
            )
          )
        );
      }),
      nullptr
    )
  );
}

void Character::stopSound()
{
  Sound->stop(this->parameters.sound);
}

/**
 *
 *
 *
 */
void Character::startUpdateTraectory()
{
  auto action = Sequence::create(
    DelayTime::create(2.5),
    CallFunc::create(CC_CALLBACK_0(Character::onUpdateTraectoryStart, this)),
    CallFunc::create([=] ()
    {
      auto action = RepeatForever::create(
        Sequence::create(
          CallFunc::create(CC_CALLBACK_0(Character::onUpdateTraectory, this)),
          DelayTime::create(0.1),
          nullptr
        )
      );
      action->setTag(1);

      this->runAction(action);
    }),
    nullptr
  );
  action->setTag(1);

  this->runAction(action);
}

void Character::stopUpdateTraectory()
{
  this->stopActionByTag(1);
}

/**
 *
 *
 *
 */
void Character::onUpdateTraectoryStart()
{
  this->parameters2 = this->parameters;
}

void Character::onUpdateTraectoryFinish()
{
}

/**
 *
 *
 *
 */
void Character::onUpdateTraectory()
{
}

/**
 *
 *
 *
 */
void Character::changeState(int state)
{
  if(this->state != state)
  {
    this->state = state;

    switch(this->state)
    {
      case STATE_MENU:
      this->onMenu();
      break;
      case STATE_ANIMATION:
      this->onAnimation();
      break;
      case STATE_SEND:
      this->onSend();
      break;
      case STATE_PREPARE:
      this->onPrepare();
      break;
      case STATE_START:
      this->onStart();
      break;
      case STATE_RESTORE:
      this->onRestore();
      break;
      case STATE_GAME:
      this->onGame();
      break;
      case STATE_LOSE_WATER:
      this->onLoseWater();
      break;
      case STATE_LOSE_MISTAKE:
      this->onLoseMistake();
      break;
    }
  }
}

/**
 *
 *
 *
 */
void Character::updateMenu(float time)
{
}

void Character::updateAnimation(float time)
{
}

void Character::updateSend(float time)
{
}

void Character::updatePrepare(float time)
{
}

void Character::updateRestore(float time)
{
}

void Character::updateGame(float time)
{
  this->updateShadow();
  this->updateSmoke();
  this->updatePosition();
}

void Character::updateLoseWater(float time)
{
}

void Character::updateLoseMistake(float time)
{
}

/**
 *
 *
 *
 */
void Character::updatePosition()
{
  Vec2 position = this->updatePosition(this->parameters);

  float x = this->getPositionX() + position.x;
  float y = this->getPositionY() + position.y;

  float r = atan2(this->parameters.x, this->parameters.y) * 180 / M_PI;

  this->setPosition(x, y);
  this->setRotation(r);

  if(y < Application->w->getPositionY())
  {
    this->changeState(STATE_LOSE_WATER);
  }
}

Vec2 Character::updatePosition(Parameters &parameters)
{
  return this->updatePosition(parameters, this->parameters.time);
}

Vec2 Character::updatePosition(Parameters &parameters, float time)
{
  if(this->state == STATE_GAME)
  {
    if(parameters.x < parameters.max.x)
    {
      parameters.x += parameters.increase.x * time;

      parameters.increase.x += parameters.increase.increase.x * time;
      parameters.increase.y += parameters.increase.increase.y * time;
    }
  }

  if(parameters.state)
  {
    if(parameters.y < parameters.max.y)
    {
      parameters.y += parameters.increase.y * time;
    }
    else
    {
      parameters.state = false;
    }
  }
  else
  {
    if(parameters.x > parameters.min.x)
    {
      parameters.x -= parameters.decrease.x * time;
    }
    else
    {
      parameters.state = false;
    }

    if(parameters.y > parameters.min.y)
    {
      parameters.y -= parameters.decrease.y * time;
    }
    else
    {
      parameters.state = false;
    }
  }

  /**
   *
   *
   *
   */
  float x = parameters.x * (1.0 / 60.0) * time;
  float y = parameters.y * (1.0 / 60.0) * time;

  /**
   *
   *
   *
   */
  return Vec2(x, y);
}

/**
 *
 *
 *
 */
void Character::updateShadow()
{
  auto camera = Application->camera;

  float x = this->getPositionX();
  float y = this->getPositionY();

  if(y >= camera.center)
  {
    this->shadow->setVisible(true);
    this->shadow->setPositionX(x);

    if(y <= (200 + camera.center) && y >= camera.center)
    {
      this->shadow->setScaleX(1.0 - 1.0 / (200 / (y - camera.center)));
    }
    else
    {
      this->shadow->setScaleX(0);
    }
  }
  else
  {
    this->shadow->setVisible(false);
  }
}

void Character::updateSmoke()
{
  this->smoke->_create();
}

void Character::updateStatus()
{
}

void Character::updateSound()
{
}

/**
 *
 *
 *
 */
void Character::updateStates(float time)
{
  switch(this->state)
  {
    case STATE_MENU:
    this->updateMenu(time);
    break;
    case STATE_ANIMATION:
    this->updateAnimation(time);
    break;
    case STATE_SEND:
    this->updateSend(time);
    break;
    case STATE_PREPARE:
    this->updatePrepare(time);
    break;
    case STATE_RESTORE:
    this->updateRestore(time);
    break;
    case STATE_GAME:
    this->updateGame(time);
    break;
    case STATE_LOSE_WATER:
    this->updateLoseWater(time);
    break;
    case STATE_LOSE_MISTAKE:
    this->updateLoseMistake(time);
    break;
  }
}

/**
 *
 *
 *
 */
void Character::update(float time)
{
  Spine::update(time);

  /**
   *
   *
   *
   */
  this->updateStates(time);
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
Character::Smoke::Smoke()
: TiledEntity("character-smoke.png", 2, 1)
{
  this->setLocalZOrder(6);
}

Character::Smoke::~Smoke()
{
}

void Character::Smoke::onCreate()
{
  TiledEntity::onCreate();

  float angle = -Application->character->getRotation() * M_PI / 180.0;

  float dx = Application->character->getPositionX();
  float dy = Application->character->getPositionY() - 100;

  float x = (cos(angle) * (dx - Application->character->getPositionX()) - sin(angle) * (dy - Application->character->getPositionY()) + Application->character->getPositionX()) + random(-10.0, 10.0);
  float y = (sin(angle) * (dx - Application->character->getPositionX()) + cos(angle) * (dy - Application->character->getPositionY()) + Application->character->getPositionY()) + random(-10.0, 10.0);

  float r = random(0.0, 720.0);

  this->setPosition(x, y);
  this->setRotation(r);
  this->setOpacity(255);

  this->runAction(
    Sequence::create(
      EaseSineInOut::create(
        FadeOut::create(1.0 / Application->character->parameters.time)
      ),
      CallFunc::create(CC_CALLBACK_0(Character::Smoke::_destroy, this, true)),
      nullptr
    )
  );
}

void Character::Smoke::onDestroy(bool action)
{
  TiledEntity::onDestroy(action);
}

Character::Smoke* Character::Smoke::deepCopy()
{
  return new Character::Smoke;
}
