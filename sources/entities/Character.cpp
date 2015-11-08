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

  this->explanation = new Explanation(this);

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
  this->setGlobalZOrder(0);
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
  this->parameters.active = true;
  this->parameters.x = this->parameters.setup.x;
  this->parameters.y = this->parameters.setup.y;
  this->parameters.max.x = this->parameters.max.setup.x;
  this->parameters.max.y = this->parameters.max.setup.y;
  this->parameters.increase.x = 0;

  this->generate.start = -1;
  this->generate.count = 0;

  this->setRotation(0);
  this->setPosition(Application->center.x, Application->camera.center);
  this->setAnimation(this->animations.engine_finish);

  this->smoke->clear();

  this->shadow->setPosition(Application->center.x, Application->camera.center - 110);

  this->setGlobalZOrder(0);
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
    case STATE_TRANSFER:
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
  this->setGlobalZOrder(11);

  auto action = Sequence::create(
    DelayTime::create(2.5),
    CallFunc::create(CC_CALLBACK_0(Character::startUpdateTraectory, this)),
    nullptr
  );
  action->setTag(1);

  this->runAction(action);
}

void Character::onTransfer()
{
  Application->transfer->runAction(
    Spawn::create(
      Sequence::create(
        FadeIn::create(0.2),
        DelayTime::create(2.6),
        CallFunc::create([=] () {
        Application->w->setVisible(true);
        }),
        FadeOut::create(0.2),
        CallFunc::create(CC_CALLBACK_0(Character::startUpdateTraectory, this)),
        nullptr
      ),
      Sequence::create(
        DelayTime::create(0.2),
        CallFunc::create([=] () {
        Application->w->setPositionY(0);
        Application->w->setVisible(false);
        Application->w->runAction(
          Sequence::create(
            DelayTime::create(2.8),
            DelayTime::create(3.0),
            nullptr
          )
        );

        Application->nextEnvironment();

        this->setPosition(0, 0);
        }),
        nullptr
      ),
      nullptr
    )
  );

  this->updateStatus(false);

  Sound->play("transfer");
}

void Character::onRestore()
{
}

void Character::onLose()
{
  Application->counter->onDeath();

  this->explanation->_destroy(true);
  this->smoke->resumeSchedulerAndActions();

  this->stopSound();
  this->stopAllActions();

  Application->changeState(Game::STATE_LOSE);
}

void Character::onLoseWater()
{
  this->stopUpdateTraectory();
  this->stopSound();
  this->stopAllActions();

  this->updateStatus(false);

  Application->runAction(
    Sequence::create(
      Shake::create(0.5, 10.0),
      CallFunc::create([=] () {
        this->changeState(STATE_LOSE);
      }),
      nullptr
    )
  );

  Sound->play("water");
}

void Character::onLoseMistake()
{
  this->stopUpdateTraectory();
  this->stopSound();
  this->stopAllActions();

  this->updateStatus(false);

  this->explanation->_create();
  this->smoke->pauseSchedulerAndActions();

  Application->barrors->clear(true);
  Application->h->runAction(
    Sequence::create(
      EaseSineInOut::create(
        ScaleTo::create(0.5, 1.0 / Application->d->getScale())
      ),
      DelayTime::create(1.0),
      CallFunc::create([=] () {
        this->changeState(STATE_LOSE);
      }),
      nullptr
    )
  );

  this->parameters.x = 0;
  this->parameters.y = 0;

  Sound->play("mistake");
}

/**
 *
 *
 *
 */
void Character::onTouch()
{
  Application->counter->onTap();

  switch(this->state)
  {
    case STATE_START:
    this->changeState(STATE_SEND);
    break;
    case STATE_GAME:
    this->proceedPointer();
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
void Character::onPointerSuccess(Pointer* pointer)
{
  Application->counter->onScore();
  Application->counter->onSuccess();

  if(pointer)
  {
    this->parameters.state = this->parameters.active = true;

    if(this->parameters.x < this->parameters.maximum.x)
    {
      this->parameters.max.x += this->parameters.max.increase.x;
      this->parameters.max.y += this->parameters.max.increase.y;
    }

    pointer->_destroy(true);

    this->startUpdateTraectory();
  }
  else
  {
    Barror* barror = (Barror*) Application->barrors->_create();

    auto position = this->convertToWorldSpace(Vec2::ZERO);

    position.x -= 30; // TODO: ?
    position.y -= 30;

    barror->setPosition(position);
    barror->animate(0);
  }
}

void Character::onPointerMistake(Pointer* pointer)
{
  Application->counter->onMistake();

  this->parameters.state = this->parameters.active = false;

  pointer->_destroy(true);

  this->startUpdateTraectory();
}

void Character::onPointerCoin(Pointer* pointer)
{
  Application->counter->onCoin();

  pointer->_destroy(true);
}

void Character::onPointerFail()
{
  Application->counter->onFail();

  this->changeState(STATE_LOSE_MISTAKE);
}

/**
 *
 *
 *
 */
void Character::proceedPointer()
{
  if(this->generate.start >= 0)
  {
    if(this->isOnBonusTraectory())
    {
      this->onPointerSuccess(nullptr);
    }
    else
    {
      auto pointer = this->getCollisionPointer();

      if(pointer)
      {
        auto index = pointer->getCurrentFrameIndex();

        switch(index)
        {
          case Pointer::SUCCESS:
          this->onPointerSuccess(pointer);
          return;
          case Pointer::MISTAKE:
          this->onPointerMistake(pointer);
          return;
          /**
           *
           * @Optional
           * Replaced by automatic coins collect.
           *
           */
          case Pointer::COIN:
          this->onPointerCoin(pointer);
          return;
        }
      }

      this->onPointerFail();
    }
  }
}

/**
 *
 *
 *
 */
Pointer* Character::getCollisionPointer()
{
  float x = this->getPositionX();
  float y = this->getPositionY();

  for(int i = 0; i < Application->pointers->count; i++)
  {
    auto pointer = Application->pointers->element(i);

    if(abs(x - pointer->getPositionX()) <= COLLISION_SIZE_X && abs(y - pointer->getPositionY()) <= COLLISION_SIZE_Y)
    {
      return (Pointer*) pointer;
    }
  }

  return nullptr;
}

int Character::getCollisionIndex()
{
  Pointer* pointer = this->getCollisionPointer();

  if(pointer)
  {
    return pointer->getCurrentFrameIndex();
  }

  return -1;
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
  this->onUpdateTraectoryStart();

  if(this->getPositionY() >= 14000 && Application->isNextEnvironment())
  {
    this->changeState(STATE_TRANSFER);
  }
  else
  {
    this->state = STATE_GAME;

    auto action = RepeatForever::create(
      Sequence::create(
        CallFunc::create(CC_CALLBACK_0(Character::onUpdateTraectory, this)),
        DelayTime::create(0.1),
        nullptr
      )
    );
    action->setTag(1);

    this->runAction(action);
  }
}

void Character::stopUpdateTraectory()
{
  this->stopActionByTag(1);

  this->onUpdateTraectoryFinish();
  this->onUpdateTraectoryBonusDestroy();
}

/**
 *
 *
 *
 */
void Character::onUpdateTraectoryStart()
{
  this->stopUpdateTraectory();

  Application->pointers->clear();

  this->generate.parameters = this->parameters;

  this->generate.start = 30;

  this->generate.x = this->getPositionX();
  this->generate.y = this->getPositionY();

  this->generate.count++;
  this->generate.coins = this->generate.count % 5 == 0 ? 5 : 0;
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
  int counter = 0;

  while(this->generate.bonus || counter == 0)
  {
    counter++;

    for(int i = 0; i < 15 + this->generate.start; i++)
    {
      Vec2 position = this->updatePosition(this->generate.parameters);

      this->generate.x += position.x;
      this->generate.y += position.y;

      if(counter >= (this->generate.start - 5))
      {
        if(this->generate.bonus)
        {
          this->generate.bonus_points.push_back(Vec2(this->generate.x, this->generate.y));

          if(this->generate.bonus_points.size() >= 91)
          {
            this->onUpdateTraectoryBonusCreate();
          }
        }
      }
    }

    this->generate.start = 0;
  
    float x = this->generate.x;
    float y = this->generate.y;

    if(Application->w->getPositionY() + 130 > 0)
    {
      Pointer* element = (Pointer*) Application->pointers->_create();

      element->setPosition(x, y);

      if(this->generate.bonus)
      {
        element->setCurrentFrameIndex(Pointer::SUCCESS);
      }
      else if(this->generate.coins-- > 0)
      {
        element->setCurrentFrameIndex(Pointer::COIN);
      }
    }
    else
    {
      this->stopUpdateTraectory();
    }
  }
}

/**
 *
 *
 *
 */
void Character::onUpdateTraectoryBonusCreate()
{
  this->generate.bonus = false;

  Vector<FiniteTimeAction*> actions;

  for(int i = 0; i < this->generate.bonus_points.size() - 1; i++)
  {
    actions.pushBack(MoveTo::create(0.004, this->generate.bonus_points.at(i)));
  }

  for(int i = this->generate.bonus_points.size() - 2; i > 0; i--)
  {
    actions.pushBack(MoveTo::create(0.004, this->generate.bonus_points.at(i)));
  }

  Application->bonus->_destroy();
  Application->bonus->setPosition(this->generate.bonus_points.at(0));
  Application->bonus->_create();
  Application->bonus->runAction(
    RepeatForever::create(
      Sequence::create(actions)
    )
  );

  if(MissionsFactory::getInstance()->isListenen())
  {
    Application->counter->missionUpdateOnce.special_once_1++;
    
    Events::updateMissions();
  }

}

void Character::onUpdateTraectoryBonusDestroy()
{
  this->generate.bonus = probably(10);
  this->generate.bonus_points.clear();
}
 
/**
 *
 *
 *
 */
bool Character::isOnBonusTraectory(float x)
{
  float f = 5.0;

  if(x < 0)
  {
    x = this->getPositionX();
  }

  if(this->generate.bonus_points.size() > 0)
  {
    return x >= this->generate.bonus_points.at(0).x - f && x <= this->generate.bonus_points.at(this->generate.bonus_points.size() - 1).x + f;
  }

  return false;
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
      case STATE_TRANSFER:
      this->onTransfer();
      break;
      case STATE_LOSE:
      this->onLose();
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

void Character::updatePrepare(float time)
{
}

void Character::updateStart(float time)
{
  this->updateShadow();
}

void Character::updateSend(float time)
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
  this->updatePointers();
}

void Character::updateTransfer(float time)
{
  this->updateSmoke();
  this->updatePosition();
}

void Character::updateLose(float time)
{
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

  if(this->state == STATE_GAME)
  {
    if(y < Application->w->getPositionY() + 30 + (Application->parameters.ad ? 0 : 100))
    {
      this->changeState(STATE_LOSE_WATER);
    }
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
      if(parameters.active)
      {
        parameters.y -= parameters.decrease.y * time;
      }
      else
      {
        parameters.y -= parameters.decrease.max.y * time;
      }
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
   * @Optional
   * This feature is currently an experimental feature.
   *
   */
  if(parameters.exponesial.state)
  {
    parameters.exponesial.x += parameters.exponesial.increase;

    if(parameters.exponesial.x >= parameters.exponesial.max)
    {
      parameters.exponesial.state = !parameters.exponesial.state;
    }
  }
  else
  {
    parameters.exponesial.x -= parameters.exponesial.decrease;

    if(parameters.exponesial.x <= parameters.exponesial.min)
    {
      parameters.exponesial.state = !parameters.exponesial.state;
    }
  }

  x /= parameters.exponesial.x;
  y /= parameters.exponesial.x;

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

void Character::updateStatus(bool state)
{
  if(state)
  {
    this->setAnimation(this->animations.status_start);
  }
  else
  {
    this->setAnimation(this->animations.status_finish);
  }
}

/**
 *
 *
 *
 */
void Character::updatePointers()
{
  if(this->isOnBonusTraectory())
  {
    this->updateStatus(true);
  }
  else
  {
    auto pointer = this->getCollisionPointer();

    if(pointer)
    {
      switch(pointer->getCurrentFrameIndex())
      {
        default:
        this->updateStatus(false);
        break;
        case Pointer::SUCCESS:
        this->updateStatus(true);
        break;
        case Pointer::MISTAKE:
        this->updateStatus(false);
        break;
        case Pointer::COIN:
        this->updateStatus(false);

        /**
         *
         * @Optional
         * Comment this to allow manual coins collect.
         *
         */
        //this->onPointerCoin(pointer);
        break;
      }
    }
    else
    {
      this->updateStatus(false);
    }
  }
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
    case STATE_START:
    this->updateStart(time);
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
    case STATE_TRANSFER:
    this->updateTransfer(time);
    break;
    case STATE_LOSE:
    this->updateLose(time);
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
: Entity("character-smoke.png")
{
  this->setLocalZOrder(6);
  this->setGlobalZOrder(10);
}

Character::Smoke::~Smoke()
{
}

void Character::Smoke::onCreate()
{
  Entity::onCreate();

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
  Entity::onDestroy(action);
}

Character::Smoke* Character::Smoke::deepCopy()
{
  return new Character::Smoke;
}
