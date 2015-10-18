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

#include "Finish.h"
#include "Store.h"

#include "Credits.h"

float Game::SCALE_MAX = 1.0;
float Game::SCALE_MIN = 0.35;

/**
 *
 *
 *
 */
Game* Game::instance;

/**
 *
 *
 *
 */
Game* Game::getInstance()
{
  return instance;
}

/**
 *
 *
 *
 */
Game::Game()
{
  instance = this;

  Modal::show();

  SpriteFrameCache::getInstance()->addSpriteFramesWithFile("ui.plist");
  SpriteFrameCache::getInstance()->addSpriteFramesWithFile("parallaxes.plist");

  this->camera.center += (this->parameters.ad ? 0 : 100);

  this->h = new Background(this);

  this->d = new Background(this->h);
  this->s = new Background(this);
  this->b = new Background(this);

  this->game = new Background(this->d);
  this->menu = new Background(this->b);

  this->w = new Background(this->d);
  this->g = new Background(this->s);
  this->e = new Background(this->b);
  this->c = new Background(this->game);

  this->environment = new Environment;

  this->counter = new Counter;
  this->name = new Name;

  this->buttons.play = new Button("play-button.png", 1, 2, this->menu, std::bind(&Game::onPlay, this));
  this->buttons.rate = new Button("rate-button.png", 1, 2, this->b, std::bind(&Game::onRate, this));
  this->buttons.leaderboards = new Button("leaderboards-button.png", 1, 2, this->b, std::bind(&Game::onScores, this));
  this->buttons.achievements = new Button("achievements-button.png", 1, 2, this->b, std::bind(&Game::onAchievements, this));
  this->buttons.sound = new Button("sound-button.png", 2, 2, this->b, std::bind(&Game::onSound, this));
  this->buttons.store = new Button("store-button.png", 1, 2, this->b, std::bind(&Game::onStore, this));
  this->buttons.credits = new Button("credits-button.png", 2, 2, this->b, std::bind(&Game::onCredits, this));
  this->buttons.noad = new Button("noad-button.png", 2, 1, this->b, std::bind(&Game::onNoad, this));

  this->buttons.play->_create()->setPosition(
    this->center.x,
    this->center.y + 110
  );

  this->buttons.credits->_create()->setPosition(
    this->center.x + (this->parameters.ad ? 0 : 42),
    70 + (this->parameters.ad ? 0 : 100)
  );
  this->buttons.credits->setGlobalZOrder(100);

  this->buttons.rate->_create()->setPosition(
    this->center.x - 210,
    this->center.y - 135
  );

  this->buttons.sound->_create()->setPosition(
    this->center.x - 105,
    this->center.y - 145
  );

  this->buttons.leaderboards->_create()->setPosition(
    this->center.x,
    this->center.y - 150
  );

  this->buttons.achievements->_create()->setPosition(
    this->center.x + 105,
    this->center.y - 145
  );

  this->buttons.store->_create()->setPosition(
    this->center.x + 210,
    this->center.y - 135
  );

  if(!this->parameters.ad)
  {
    this->buttons.noad->_create()->setPosition(
      this->center.x - 42,
      170
    );
  }

  this->character = new Character;

  this->menu->setLocalZOrder(500);
  this->game->setLocalZOrder(200);

  this->h->setLocalZOrder(200);
  this->s->setLocalZOrder(100);
  this->d->setLocalZOrder(200);
  this->b->setLocalZOrder(300);
  this->w->setLocalZOrder(400);
  this->c->setLocalZOrder(5);

  this->c->setAnchorPoint(Vec2(0, 0));

  this->b->retain();
  this->w->retain();

  this->b->setCascadeOpacityEnabled(true);

  this->game->setScale(4.0);
  this->game->setPositionY(690);

  this->changeState(STATE_MENU);
}

Game::~Game()
{
}

/**
 *
 *
 *
 */
void Game::onTouchStart(cocos2d::Touch* touch, Event* event)
{
  switch(this->state)
  {
    case STATE_START:
    this->changeState(STATE_GAME);
    break;
  }

  this->character->onTouch();
}

/**
 *
 *
 *
 */
void Game::onEnter()
{
  Screen::onEnter();

  /**
   *
   *
   *
   */
  this->updateSoundState();

  /**
   *
   *
   *
   */
  Events::onScreenChanged("Game");
}

void Game::onExit()
{
  Screen::onExit();
}

/**
 *
 *
 *
 */
void Game::onPlay()
{
  this->buttons.play->bind(false);
  this->buttons.rate->bind(false);
  this->buttons.sound->bind(false);
  this->buttons.leaderboards->bind(false);
  this->buttons.achievements->bind(false);
  this->buttons.store->bind(false);

  this->buttons.rate->runAction(
    Sequence::create(
      EaseSineInOut::create(
        ScaleTo::create(0.2, 0.0)
      ),
      CallFunc::create([=] () { this->buttons.rate->setPositionY(Application->height - 60); }),
      EaseSineInOut::create(
        ScaleTo::create(0.5, 1.0)
      ),
      nullptr
    )
  );

  this->buttons.sound->runAction(
    Sequence::create(
      EaseSineInOut::create(
        ScaleTo::create(0.2, 0.0)
      ),
      CallFunc::create([=] () { this->buttons.sound->setPositionY(Application->height - 60); }),
      EaseSineInOut::create(
        ScaleTo::create(0.5, 1.0)
      ),
      nullptr
    )
  );

  this->buttons.leaderboards->runAction(
    Sequence::create(
      EaseSineInOut::create(
        ScaleTo::create(0.2, 0.0)
      ),
      CallFunc::create([=] () { this->buttons.leaderboards->setPositionY(Application->height - 60); }),
      EaseSineInOut::create(
        ScaleTo::create(0.5, 1.0)
      ),
      nullptr
    )
  );

  this->buttons.achievements->runAction(
    Sequence::create(
      EaseSineInOut::create(
        ScaleTo::create(0.2, 0.0)
      ),
      CallFunc::create([=] () { this->buttons.achievements->setPositionY(Application->height - 60); }),
      EaseSineInOut::create(
        ScaleTo::create(0.5, 1.0)
      ),
      nullptr
    )
  );

  this->buttons.store->runAction(
    Sequence::create(
      EaseSineInOut::create(
        ScaleTo::create(0.2, 0.0)
      ),
      CallFunc::create([=] () { this->buttons.store->setPositionY(Application->height - 60); }),
      EaseSineInOut::create(
        ScaleTo::create(0.5, 1.0)
      ),
      nullptr
    )
  );

  this->changeState(STATE_ANIMATION);
}

void Game::onRate()
{
  Events::onRate();
}

void Game::onLike()
{
  Events::onLike();
}

void Game::onShare()
{
  Events::onShare();
}

void Game::onScores()
{
  Events::onScores();
}

void Game::onAchievements()
{
  Events::onAchievements();
}

void Game::onSound()
{
  Events::onSound();

  /**
   *
   *
   *
   */
  this->updateSoundState();
}

void Game::onStore()
{
  Store::getInstance()->show();
}

void Game::onCredits()
{
  Credits::getInstance()->toogle();
}

void Game::onNoad()
{
  Purchase::purchaseItem("com.ketchapp.exodus.remove.ads", [=] (bool status) {
    if(status)
    {
      log("SEX!!!");
    }
  });
}

void Game::onTwitter()
{
  Events::onTwitter();
}

void Game::onFacebook()
{
  Events::onFacebook();
}

void Game::onMail()
{
  Events::onMail();
}

void Game::onRestorePurchases()
{
  Events::onRestorePurchases();
}

/**
 *
 *
 *
 */
void Game::onMenu()
{
  Internal::onStart();

  this->runAction(
    Sequence::create(
      DelayTime::create(1.0),
      CallFunc::create([&] () { Modal::hide(); }),
      nullptr
    )
  );

  this->environment->onMenu();
  this->counter->onMenu();

  this->character->changeState(Character::STATE_MENU);
}

void Game::onAnimation()
{
  this->environment->onAnimation();
  this->counter->onAnimation();

  this->menu->removeFromParent();

  this->character->changeState(Character::STATE_ANIMATION);

  this->game->runAction(
    Spawn::create(
      ScaleTo::create(0.5, 1.0),
      Sequence::create(
        MoveTo::create(0.5, Vec2(0, 0)),
        CallFunc::create([=] () { this->changeState(STATE_PREPARE); }),
        nullptr
      ),
      nullptr
    )
  );
}

void Game::onPrepare()
{
  this->environment->onPrepare();
  this->counter->onPrepare();

  //this.parameters.tutorial.enable = !Data.get(false, properties.tutorial);
  //this.parameters.tutorial.running = false;

  this->character->changeState(Character::STATE_PREPARE);

  this->buttons.rate->bind(true);
  this->buttons.sound->bind(true);
  this->buttons.leaderboards->bind(true);
  this->buttons.achievements->bind(true);
  this->buttons.store->bind(true);

  this->game->setPosition(0, 0);

  // TODO: It's should runs only once!
  this->w->removeFromParent();
  this->game->addChild(this->w);

  this->w->stopAllActions();
  this->w->setPositionY(0);

  this->b->stopAllActions();
  this->b->setPositionY(0);

  this->d->setAnchorPoint(Vec2(0.5, 0));

  //this.elements.coins.clear();
  //this.elements.points.clear();
  //this.elements.fishes.clear();
  //this.elements.baloons.clear();
  //this.elements.missiles.clear();

  this->updateCamera();

  this->runAction(
    Sequence::create(
      CallFunc::create([=] () {

        this->buttons.credits->runAction(
          Sequence::create(
            EaseSineInOut::create(
              FadeIn::create(0.5)
            ),
            CallFunc::create([=] () { this->buttons.credits->bind(true); }),
            nullptr
          )
        );
        this->buttons.noad->runAction(
          Sequence::create(
            EaseSineInOut::create(
              FadeIn::create(0.5)
            ),
            CallFunc::create([=] () { this->buttons.noad->bind(true); }),
            nullptr
          )
        );
      }),
      CallFunc::create([=] () {
        if(this->parameters.creatures)
        {
          this->environment->creatures->create();
        }
        else
        {
          this->changeState(STATE_START);
        }

        this->parameters.creatures = false;
      }),
      nullptr
    )
  );
}

void Game::onStart()
{
  this->environment->onStart();
  this->counter->onStart();

  this->character->changeState(Character::STATE_START);
}

void Game::onGame()
{
  this->environment->onGame();
  this->counter->onGame();

  this->buttons.credits->runAction(
    Sequence::create(
      CallFunc::create([=] () { this->buttons.credits->bind(false); }),
      EaseSineInOut::create(
        FadeOut::create(0.5)
      ),
      nullptr
    )
  );
  this->buttons.noad->runAction(
    Sequence::create(
      CallFunc::create([=] () { this->buttons.noad->bind(false); }),
      EaseSineInOut::create(
        FadeOut::create(0.5)
      ),
      nullptr
    )
  );

  this->b->runAction(
    Sequence::create(
      EaseBounceOut::create(
        MoveTo::create(1.0, Vec2(0, 270)
        )
      ),
      nullptr
    )
  );
}

void Game::onLose()
{
  this->environment->onLose();
  this->counter->onLose();

  Finish::getInstance()->show();
}

/**
 *
 *
 *
 */
void Game::changeState(int state)
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
      case STATE_PREPARE:
      this->onPrepare();
      break;
      case STATE_START:
      this->onStart();
      break;
      case STATE_GAME:
      this->onGame();
      break;
      case STATE_LOSE:
      this->onLose();
      break;
    }
  }
}

/**
 *
 *
 *
 */
void Game::updateSoundState()
{
  if(!Music->enabled || !Sound->enabled)
  {
    Music->changeState(false);
    Sound->changeState(false);

    this->buttons.sound->setCurrentFrameIndex(0);
  }
  else
  {
    Music->changeState(true);
    Sound->changeState(true);

    this->buttons.sound->setCurrentFrameIndex(2);
  }
}

/**
 *
 *
 *
 */
void Game::updateCamera(float time)
{
  this->game->setPosition(
    -this->character->getPositionX() + this->center.x,
    min(
      -this->w->getPositionY(),
      -this->character->getPositionY() + this->center.y / this->d->getScale()
    )
  );

  this->g->setPositionY(
    min<float>(
      0,
      max<float>(
        DECORATIONS_POSITION_MIN,
        -(this->character->getPositionY() - (this->center.y / SCALE_MIN)) / DECORATIONS_POSITION_RATIO
      )
    )
  );

  this->d->setScale(
    max<float>(
      1.0 - 1.0 / (POSITION_MAX / (this->character->getPositionY() - this->w->getPositionY() - POSITION_MIN)),
      SCALE_MIN
    )
  );

  this->h->setPositionX(
    max<float>(-(this->width / MAX_OFFSET_X), (this->width / MAX_OFFSET_X) / (1000 / this->game->getPositionX())) * (this->state == STATE_GAME ? (1.0 + (1.0 - this->d->getScale())) : 1.0)
  );

  this->camera.x = abs(this->game->getPositionX());
  this->camera.y = abs(this->game->getPositionY());

  this->camera.width = this->width / this->d->getScale();
  this->camera.height = this->height / this->d->getScale();

  this->c->setPosition(
    this->character->getPositionX() - this->camera.width / 2 - this->h->getPositionX() / this->d->getScale(),
    this->camera.y - this->h->getPositionY() / this->d->getScale()
  );

  this->c->setScale(1.0 / this->d->getScale());
}

/**
 *
 *
 *
 */
void Game::updateMenu(float time)
{
}

void Game::updateAnimation(float time)
{
}

void Game::updatePrepare(float time)
{
}

void Game::updateStart(float time)
{
}

void Game::updateGame(float time)
{
}

void Game::updateLose(float time)
{
}

/**
 *
 *
 *
 */
void Game::updateStates(float time)
{
  switch(this->state)
  {
    case STATE_MENU:
    this->updateMenu(time);
    break;
    case STATE_ANIMATION:
    this->updateAnimation(time);
    break;
    case STATE_PREPARE:
    this->updatePrepare(time);
    break;
    case STATE_START:
    this->updateStart(time);
    break;
    case STATE_GAME:
    this->updateGame(time);
    break;
    case STATE_LOSE:
    this->updateLose(time);
    break;
  }

  switch(this->state)
  {
    case STATE_PREPARE:
    case STATE_START:
    case STATE_GAME:
    this->updateCamera(time);
    break;
  }

  this->environment->update(time);
}

/**
 *
 *
 *
 */
void Game::update(float time)
{
  Screen::update(time);

  /**
   *
   *
   *
   */
  this->updateStates(time);
}
