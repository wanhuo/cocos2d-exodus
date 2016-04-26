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
Character::Character()
: Spine("character.json", "character.atlas", 1.0, Application->game)
{
  this->animations.menu = {0, "menu", false};
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
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29"
  };

  this->explanation = new Explanation(this);

  this->shadow = new Entity("character-shadow.png", Application->game);
  this->shadow->setLocalZOrder(5);

  this->smoke = new Pool(new Smoke, Application->game);

  this->holder = new BackgroundColor(this, Color4B(0, 0, 0, 0));
  this->holder->setContentSize(Size(10, 10));

  this->text = new Pool(new Text("character"), this->holder);

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
  this->updateSkin();

  this->_create();

  this->swipe.update= false;
  this->swipe.x = 0;
  this->swipe.y = 0;

  this->swipe.increase = Vec2(0, 1);
  this->swipe.decrease = Vec2(0, 0.3);
  this->swipe.max = Vec2(0, 7);
  this->swipe.min = Vec2(0, 0);

  this->parameters.state = true;
  this->parameters.active = true;
  this->parameters.x = this->parameters.setup.x;
  this->parameters.y = this->parameters.setup.y;
  this->parameters.max.x = this->parameters.max.setup.x;
  this->parameters.max.y = this->parameters.max.setup.y;
  this->parameters.increase.x = 0;

  this->parameters.predictions.clear();

  this->index = 0;
  this->accelerationIndex = 0;

  this->parameters.time = 1.0;

  this->generate.start = -1;
  this->generate.count = 0;
  this->generate.red = 0;
  this->generate.rest = 10;
  this->generate.create = 5;

  this->setRotation(0);
  this->setPosition(Application->getCenter().x, Application->camera.center);

  this->smoke->clear();

  this->shadow->setPosition(Application->getCenter().x, Application->camera.center - 110);

  this->setGlobalZOrder(0);

  switch(this->state)
  {
    default:
    this->setAnimation(this->animations.engine_finish);
    break;
    case STATE_MENU:
    this->setAnimation(this->animations.menu);
    this->onMenu();
    break;
  }

  Application->bonus->setPositionX(-1000);
}

/**
 *
 *
 *
 */
void Character::onEnter()
{
  this->reset();

  /**
   *
   *
   *
   */
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
  this->reset();

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
    case STATE_BOOST:
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
  this->setAnimation({0, "menu", false});

  float x = Application->getCenter().x;
  float y = Application->getCenter().y - 190;

  this->setPosition(x, y);
}

void Character::onAnimation()
{
  this->setAnimation(this->animations.animation);

  this->runAction(
    Spawn::create(
      ScaleTo::create(0.5, 1.0),
      MoveTo::create(0.5, Vec2(Application->getCenter().x, Application->camera.center)),
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
    DelayTime::create(0.5),
    CallFunc::create([=] () {
      this->generate.x = this->getPositionX();
      this->generate.y = this->getPositionY();

      this->startUpdateTraectory();
    }),
    nullptr
  );
  action->setTag(1);

  this->runAction(action);
}

void Character::onBoost()
{
  this->generate.create = 3;

  Application->h->runAction(
    Sequence::create(
      CallFunc::create([=] () {
      }),
      ScaleTo::create(0.3, 0.6),
      DelayTime::create(1.0),
      ScaleTo::create(0.3, 1.0),
      CallFunc::create([=] () {
        this->state = STATE_GAME;
      }),
      nullptr
    )
  );

  Sound->play("boost");
}

void Character::onTransfer()
{
  Application->counter->values.score_b = 0;

  this->parameters.predictions.clear();

  this->parameters.x /= 2;
  this->parameters.y /= 2;
  this->parameters.max.x = this->parameters.max.setup.x;
  this->parameters.max.y = this->parameters.max.setup.y;
  this->parameters.increase.x = 0;

  Application->transfer->runAction(
    Spawn::create(
      Sequence::create(
        CallFunc::create([=] () {
          this->parameters.state = this->parameters.active = true;

          if(this->parameters.x < this->parameters.maximum.x)
          {
            this->parameters.max.x += this->parameters.max.increase.x;
            this->parameters.max.y += this->parameters.max.increase.y;
          }
        }),
        FadeIn::create(0.2),
        DelayTime::create(2.6),
        CallFunc::create([=] () {
        Application->w->setVisible(true);
        }),
        FadeOut::create(0.2),
        CallFunc::create([=] () {
          this->generate.x = this->getPositionX();
          this->generate.y = this->getPositionY();

          this->parameters.state = this->parameters.active = true;

          if(this->parameters.x < this->parameters.maximum.x)
          {
            this->parameters.max.x += this->parameters.max.increase.x;
            this->parameters.max.y += this->parameters.max.increase.y;
          }
        }),
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
bool Character::onSwipe()
{
  return false;
}

void Character::onSwipeUp()
{
}

void Character::onSwipeDown()
{
}

void Character::onSwipeLeft()
{
}

void Character::onSwipeRight()
{
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
void Character::onCreateText(bool value)
{
  if(this->text->count > 0 && value == this->value.v)
  {
    this->value.value++;

    auto text = static_cast<Text*>(this->text->last());

    text->data(this->value.value);

    text->stopAllActions();
    text->runAction(
      Spawn::create(
        Sequence::create(
          DelayTime::create(0.4),
          FadeOut::create(0.2),
          CallFunc::create(CC_CALLBACK_0(Text::_destroy, text, true)),
          nullptr
        ),
        Sequence::create(
          EaseSineOut::create(
            MoveTo::create(0.4, Vec2(0, 150))
          ),
          nullptr
        ),
        FadeIn::create(0.1),
        nullptr
      )
    );
  }
  else
  {
    if(this->text->count > 0)
    {
      this->text->last()->runAction(
        Sequence::create(
          FadeOut::create(0.1),
          nullptr
        )
      );
    }

    this->value.value = 1;

    auto text = static_cast<Text*>(this->text->_create());

    text->data(this->value.value);

    text->setPosition(0, 100);
    text->setOpacity(255);

    text->runAction(
      Spawn::create(
        Sequence::create(
          DelayTime::create(0.2),
          FadeOut::create(0.2),
          CallFunc::create(CC_CALLBACK_0(Text::_destroy, text, true)),
          nullptr
        ),
        EaseSineOut::create(
          MoveTo::create(0.4, Vec2(0, 150))
        ),
        nullptr
      )
    );
  }

  this->value.v = value;
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

  this->onCreateText(true);

  float FF = Application->camera.x + Application->camera.width * (this->state == STATE_BOOST ? 2 : 1);

  if(pointer)
  {
  ///////
  

    vector<Node*> remove;

    for(int i = 0; i < Application->pointers2->count; i++)
    {
      auto pointer = static_cast<Pointer*>(Application->pointers2->element(i));

      if((pointer->getPositionX() >= this->getPositionX()))
      {
          remove.push_back(pointer);
      }
    }

    remove.erase(
      std::remove_if(
          remove.begin(),
          remove.end(),
          [](Node* pointer) -> bool {
            pointer->_destroy();

            return true;
          }
      ),
      remove.end()
    );
    remove.clear();
  ///////


    if(this->state == STATE_BOOST)
    {
      pointer->_destroy(true);
    }
    else
    {
      pointer->runAction(
        Sequence::create(
          ScaleTo::create(0.1, 0.0),
          CallFunc::create(CC_CALLBACK_0(Node::_destroy, pointer, true)),
          nullptr
        )
      );
    }

    bool f = true;

    for(int i = 0; i < Application->pointers->count; i++)
    {
      TiledEntity* pointer = static_cast<TiledEntity*>(Application->pointers->element(i));

      if(pointer->numberOfRunningActions() < 1)
      {
        if(pointer->getPositionX() < this->getPositionX())
        {
          if(pointer->getCurrentFrameIndex() == Pointer::SUCCESS || pointer->getCurrentFrameIndex() == Pointer::ACCELERATION)
          {
            f = false;
          }
        }
      }
    }

    if(f)
    {
      this->accelerationIndex += this->index > 6 ? 0 : 1;
      this->index += this->index > 6 ? 0 : 1;
      Sound->play(("success-" + patch::to_string(this->index)).c_str());
    }
    else
    {
      this->index = 1;
      this->accelerationIndex = 1;

      Sound->play("success-1");
    }

    bool ftx = false;
    float tx = 1000000000000;
    for(int i = 0; i < Application->pointers->count; i++)
    {
      auto pointer = static_cast<Pointer*>(Application->pointers->element(i));

      if(pointer->getPositionX() >= FF)
      {
          ftx = true;
          tx = min(tx, pointer->getPositionX());
      }
    }


    for(int i = 0; i < Application->pointers->count; i++)
    {
      auto pointer = static_cast<Pointer*>(Application->pointers->element(i));

      if(pointer->numberOfRunningActions() < 1)
      {
        if((pointer->getPositionX() >= FF || pointer->getPositionX() < this->getPositionX()))
        {
            remove.push_back(pointer);
        }
      }
    }

    remove.erase(
      std::remove_if(
          remove.begin(),
          remove.end(),
          [](Node* pointer) -> bool {
            pointer->_destroy();

            return true;
          }
      ),
      remove.end()
    );

    this->generate.red = random(1, 3);

    for(int i = 0; i < Application->pointers->count; i++)
    {
      auto pointer = static_cast<TiledEntity*>(Application->pointers->element(i));

      if(pointer->getCurrentFrameIndex() == 1)
      {
          this->generate.red--;
      }
    }

    if(ftx)
    {
    for(int i = 0; i < Application->pointers->count; i++)
    {
      auto pointer = static_cast<Pointer*>(Application->pointers->element(i));


        tx = max(tx, pointer->getPositionX());

    }

      Prediction prediction;
      prediction.action = true;
      prediction.x = tx;

      this->parameters.predictions.push_back(prediction);
    }

    this->generate.x = pointer->getPositionX();
    this->generate.y = pointer->getPositionY();

    this->startUpdateTraectory();

    this->generate.rest = Application->pointers->count - (this->state == STATE_BOOST ? 0 : 1);

    this->runAction(
      MoveBy::create(0.5, Vec2(pointer->getPositionX() - this->getPositionX(), pointer->getPositionY() - this->getPositionY()))
    );
  }
  else
  {
      this->accelerationIndex += this->index > 6 ? 0 : 1;
      this->index += this->index > 6 ? 0 : 1;
      Sound->play(("success-" + patch::to_string(this->index)).c_str());
  }

  if(!Application->parameters.tutorial)
  {
    auto action = Sequence::create(
      CallFunc::create([=] () {
        if(!this->isOnBonusTraectory())
        {
          this->parameters.time = 1.0;
        }
      }),
      DelayTime::create(0.2),
      nullptr
    );
    action->setTag(100);

    this->runAction(action);

    if(Application->counter->values.score >= 15)
    {
      Application->parameters.tutorial = true;

      Application->counter->missionUpdateOnce.special_once_2++;

      Storage::set("state.tutorial.disabled", 1);
    }
  }
}

void Character::onPointerMistake(Pointer* pointer)
{
  this->index = 0;

  Application->counter->onMistake();
}

void Character::onPointerCoin(Pointer* pointer)
{
  Application->counter->onCoin();

  this->onCreateText(false);

  pointer->runAction(
    Sequence::create(
      ScaleTo::create(0.1, 0.0),
      CallFunc::create(CC_CALLBACK_0(Node::_destroy, pointer, true)),
      nullptr
    )
  );
}

void Character::onPointerFail()
{
  Application->counter->onFail();

  this->changeState(STATE_LOSE_MISTAKE);
}

void Character::onPointerAcceleration(Pointer* pointer)
{
  pointer->runAction(
    Sequence::create(
      ScaleTo::create(0.1, 0.0),
      CallFunc::create(CC_CALLBACK_0(Node::_destroy, pointer, true)),
      nullptr
    )
  );

  this->changeState(STATE_BOOST);

  this->index = 1;
  this->accelerationIndex = 1;
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
          case Pointer::ACCELERATION:
          this->onPointerAcceleration(pointer);
          return;
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

      if(Application->parameters.tutorial)
      {
        this->onPointerFail();
      }
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
  float angle = -this->getRotation() * M_PI / 180.0;

  float dx = this->getPositionX();
  float dy = this->getPositionY();

  float x = (cos(angle) * (dx - this->getPositionX()) - sin(angle) * (dy - this->getPositionY()) + this->getPositionX());
  float y = (sin(angle) * (dx - this->getPositionX()) + cos(angle) * (dy - this->getPositionY()) + this->getPositionY());

  for(int i = 0; i < Application->pointers->count; i++)
  {
    auto pointer = static_cast<Pointer*>(Application->pointers->element(i));

    if(pointer->numberOfRunningActions() < 1)
    {
      if(!Application->parameters.tutorial)
      {
        if(abs(x - pointer->getPositionX()) <= 40 && abs(y - pointer->getPositionY()) <= 40)
        {
          return (Pointer*) pointer;
        }
      }
      else
      {
        if(abs(x - pointer->getPositionX()) <= COLLISION_SIZE_X && abs(y - pointer->getPositionY()) <= COLLISION_SIZE_Y)
        {
          return (Pointer*) pointer;
        }
      }
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
    if(this->state != STATE_BOOST)
    {
      this->changeState(STATE_TRANSFER);
    }
  }
  else
  {
    if(this->state != STATE_BOOST)
    {
      this->state = STATE_GAME;
    }

    auto action = RepeatForever::create(
      Sequence::create(
        CallFunc::create([=] () {
          int counter = 1;
          while(this->generate.rest > 0 || this->generate.create > 0 || counter >= 1)
          {
            counter--;

            this->onUpdateTraectory();
          }
        }),
        DelayTime::create(0.2),
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

  this->generate.parameters = this->parameters;

  this->generate.start = 30;

  this->generate.count++;
  this->generate.coins = this->generate.count % 5 == 0 && Application->counter->values.score_b >= 5 ? 5 : 0;
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
  bool bonus = true;
  int counter = 0;

  /////
  

    vector<Node*> remove;

    for(int i = 0; i < Application->pointers2->count; i++)
    {
      auto pointer = static_cast<Pointer*>(Application->pointers2->element(i));

      if((pointer->getPositionX() < Application->camera.x))
      {
          remove.push_back(pointer);
      }
    }

    remove.erase(
      std::remove_if(
          remove.begin(),
          remove.end(),
          [](Node* pointer) -> bool {
            pointer->_destroy();

            return true;
          }
      ),
      remove.end()
    );
  /////

  while((this->generate.bonus && bonus) || counter == 0)
  {
    counter++;

    bool a = false;

    float x = this->generate.x;
    float y = this->generate.y;

    for(int i = 0; i < 15 + this->generate.start; i++)
    {
      Vec2 position = this->updatePosition(this->generate.parameters, 1.0);

      this->generate.x += position.x;
      this->generate.y += position.y;

      if(!a && i >= this->generate.start)
      {
        a = true;

        x = this->generate.x;
        y = this->generate.y;
      }

      for(auto &prediction : this->generate.parameters.predictions)
      {
        if(this->generate.x >= prediction.x && !prediction.done)
        {
          prediction.done = true;

          if(prediction.action)
          {
            this->generate.parameters.state = this->generate.parameters.active = true;

            if(this->generate.parameters.x < this->generate.parameters.maximum.x)
            {
              this->generate.parameters.max.x += this->generate.parameters.max.increase.x;
              this->generate.parameters.max.y += this->generate.parameters.max.increase.y;
            }
          }
          else
          {
            //this->generate.parameters.state = this->generate.parameters.active = false;
          }
        }
      }

      if(true)
      {
        Pointer* element = (Pointer*) Application->pointers2->_create();

        element->setPosition(this->generate.x, this->generate.y);
        element->setCurrentFrameIndex(Pointer::MARK);
        element->setScale(0.2);
      }

        if(this->generate.rest < 0 && this->generate.red <= 0)
        {
          if(this->generate.bonus)
          {
            this->generate.bonus_points.push_back(Vec2(this->generate.x - 25, this->generate.y));

            if(this->generate.bonus_points.size() >= 11.7*8)
            {
              this->onUpdateTraectoryBonusCreate();

              this->generate.red = random(1, 3);
            }
          }
        }
        else
        {
          bonus = false;
        }
    }

    this->generate.start = 0;

    this->generate.rest--;
    this->generate.create--;

    if(this->generate.rest > 0)
    {
      return;
    }

    if(Application->w->getPositionY() < y)
    {
      Pointer* element = (Pointer*) Application->pointers->_create();

      element->setPosition(x, y);

      this->generate.red--;

      if(this->isOnBonusTraectory(x))
      {
        element->setCurrentFrameIndex(Pointer::SUCCESS);
      }
      else if(this->accelerationIndex >= 6)
      {
        this->accelerationIndex = 1;

        element->setCurrentFrameIndex(Pointer::ACCELERATION);
         Vec2 p = this->updatePosition(this->generate.parameters, 1.0);

          float r = atan2(x - p.x, y - p.y) * 180 / M_PI;
          element->setRotation(r - 90);
      }
      else if(this->generate.red >= 0)
      {
        element->setCurrentFrameIndex(Pointer::MISTAKE);
      }
      else if(this->generate.coins-- > 0)
      {
        element->setCurrentFrameIndex(Pointer::COIN);
      }
      else
      {
        this->generate.red = random(1, 3);

        element->setCurrentFrameIndex(Pointer::SUCCESS);
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
  this->generate.bonus = probably(5) && this->parameters.active;

    this->generate.bonus_points.clear();
    Application->bonus->_destroy();

  if(!Application->parameters.tutorial)
  {
    if(Application->counter->values.score_b >= 3)
    {
      this->generate.bonus = true;
    }
    else
    {
      this->generate.bonus = false;
    }
  }
  else
  {
    if(Application->counter->values.score_b < 5)
    {
      this->generate.bonus = false;
    }
  }

  if(this->generate.bonus)
  {
    this->generate.red = random(5, 8);
  }
}
 
/**
 *
 *
 *
 */
bool Character::isOnBonusTraectory(float x)
{
  float f = 100.0;

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
      case STATE_BOOST:
      this->onBoost();
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
  this->updateShadow(time);
}

void Character::updateStart(float time)
{
  this->updateShadow(time);
}

void Character::updateSend(float time)
{
}

void Character::updateRestore(float time)
{
}

void Character::updateGame(float time)
{
  this->updateShadow(time);
  this->updateSmoke(time);

  this->updatePosition();
  this->updatePointers();
}

void Character::updateTransfer(float time)
{
  this->updateSmoke(time);

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

  float r = atan2(x - (this->getPositionX() - this->swipe.x), y - (this->getPositionY() - this->swipe.y)) * 180 / M_PI;

  if(this->parameters.time)
  {
    this->setPosition(x, y);
    this->setRotation(r);

    this->holder->setRotation(-r);
  }

  for(auto &prediction : this->parameters.predictions)
  {
    if(x >= prediction.x && !prediction.done)
    {
      prediction.done = true;

      if(prediction.action)
      {
        this->parameters.state = this->parameters.active = true;

        if(this->parameters.x < this->parameters.maximum.x)
        {
          this->parameters.max.x += this->parameters.max.increase.x;
          this->parameters.max.y += this->parameters.max.increase.y;
        }
      }
      else
      {
        //this->parameters.state = this->parameters.active = false;
      }
    }
  }

  if(this->state == STATE_GAME || this->state == STATE_BOOST)
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
  if(this->state == STATE_GAME || this->state == STATE_BOOST)
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
   *
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

  if(Application->parameters.tutorial)
  {
    x /= parameters.exponesial.x;
    y /= parameters.exponesial.x;
  }
  */

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
void Character::updateShadow(float time)
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

void Character::updateSmoke(float time)
{
  this->smokeTimeElapsed += time * this->parameters.time;

  if(this->smokeTimeElapsed >= this->smokeTime)
  {
    this->smokeTimeElapsed = 0;

    auto smoke = this->smoke->_create();

    switch(this->state)
    {
      default:
      smoke->setColor(Color3B(255, 255, 255));
      break;
      case STATE_BOOST:
      smoke->setColor(Color3B(255, 150, 0));
      break;
    }
  }
}

void Character::updateStatus(bool state)
{
  if(state)
  {
    this->setAnimation(this->animations.status_start);

    /**
     *
     * @Optional
     * @Testing
     *
     * Can be enabled for testing.
     *
     *
    if(this->state == STATE_GAME)
    {
      this->proceedPointer();
    }*/

    /**
     *
     *
     *
     */
    if(!Application->parameters.tutorial)
    {
      if(this->parameters.time > 0.5 && !this->getActionByTag(100))
      {
        auto action = Sequence::create(
          CallFunc::create([=] () {
            if(this->isOnBonusTraectory())
            {
              this->parameters.time = 0.6;

              if(!Application->hand->state->create)
              {
                Application->hand->_create();
                Application->hand->animate(0.1);
              }
            }
            else
            {
              this->smoke->pauseSchedulerAndActions();

              this->parameters.time = 0.0;

              if(!Application->hand->state->create)
              {
                Application->hand->_create();
                Application->hand->animate(0.2);
              }
            }
          }),
          nullptr
        );
        action->setTag(100);

        this->runAction(action);
      }
    }
  }
  else
  {
    this->setAnimation(this->animations.status_finish);

    this->parameters.time = 1.0;

    Application->hand->_destroy();
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
        case Pointer::ACCELERATION:
        this->updateStatus(true);
        break;
        case Pointer::SUCCESS:
        this->updateStatus(true);

        if(this->state == STATE_BOOST)
        {
          this->onPointerSuccess(pointer);
        }
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
        this->onPointerCoin(pointer);
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
void Character::updateSkin()
{
  this->setSkin(this->skins.at(Storage::get("items.character.current")));
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
    case STATE_BOOST:
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
      CallFunc::create([=] () {
        this->_destroy(true);
      }),
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
