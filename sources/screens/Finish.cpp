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

#include "Finish.h"

#include "Game.h"
#include "Store.h"

/**
 *
 *
 *
 */
Finish* Finish::instance;

/**
 *
 *
 *
 */
Finish* Finish::getInstance()
{
  return instance;
}

/**
 *
 *
 *
 */
Finish::Finish()
{
  instance = this;

  this->background = new BackgroundColor(this, Color4B(132, 209, 200, 255));
  this->splash = new BackgroundColor(this, Color4B(255, 255, 255, 0));
  this->holder = new Background(this);

  this->decoration = new Spine("character.json", "character.atlas", 1.0, this->holder);
  this->decoration->setScheduleTextures(true);

  this->counter = new FinishCounter;

  this->buttons.play = new Button("finish-play-button.png", 1, 2, this->holder, std::bind(&Finish::hide, this));
  this->buttons.like = new Button("like-button.png", 1, 2, this->holder, std::bind(&Game::onLike, Application));
  this->buttons.rate = new Button("rate-button.png", 1, 2, this->holder, std::bind(&Game::onRate, Application));
  this->buttons.share = new Button("share-button.png", 1, 2, this->holder, std::bind(&Game::onShare, Application));
  this->buttons.leaderboards = new Button("leaderboards-button.png", 1, 3, this->holder, std::bind(&Game::onScores, Application));
  this->buttons.achievements = new Button("achievements-button.png", 1, 3, this->holder, std::bind(&Game::onAchievements, Application));
  this->buttons.sound = new Button("sound-button.png", 2, 2, this->holder, std::bind(&Finish::onSound, this));
  this->buttons.store = new Button("store-button.png", 1, 2, this->holder, std::bind(&Game::onStore, Application));
  this->buttons.noad = new Button("finish-noad-button.png", 2, 1, this->holder, std::bind(&Game::onNoad, Application));
  this->buttons.missions = new Button("missions-button.png", 1, 2, this->holder, std::bind(&Game::onMissions, Application));
  this->buttons.tutorial = new Button("tutorial-button.png", 1, 2, this->holder, std::bind(&Game::onTutorial, Application));

  this->buttons.video = new VideoButton(this);
  this->buttons.gift = new GiftButton(this);
  this->buttons.character = new CharacterButton(this);

  #if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
  this->buttons.leaderboards->setCurrentFrameIndex(2);
  this->buttons.achievements->setCurrentFrameIndex(2);

  this->buttons.leaderboards->bind(false);
  this->buttons.achievements->bind(false);
  #endif

  this->background->setLocalZOrder(-1);
  this->decoration->setLocalZOrder(-1);

  this->splash->setGlobalZOrder(1000);

  this->buttons.store->addChild(new StoreHandler);
  this->buttons.missions->addChild(new MissionsHandler);
}

Finish::~Finish()
{
}

/**
 *
 *
 *
 */
void Finish::onEnter()
{
  this->updateSoundState();
  this->showButtons();

  Application->changeState(Game::STATE_FINISH);

  if(Application->counter->save())
  {
    this->onBest();
  }
  else
  {
    this->onRegular();
  }

  Events::onScreenChanged("Finish");

  Coins::onEnter();
}

void Finish::onExit()
{
  Coins::onExit();

  /**
   *
   *
   *
   */
  this->buttons.video->_destroy();
  this->buttons.gift->_destroy();
  this->buttons.character->_destroy();
}

/**
 *
 *
 *
 */
void Finish::onSound()
{
  Events::onSound();

  /**
   *
   *
   *
   */
  this->updateSoundState();
}

/**
 *
 *
 *
 */
void Finish::onMoveUp()
{
  this->holder->runAction(
    EaseSineInOut::create(
      MoveTo::create(0.2, Vec2(0, 100))
    )
  );
}

void Finish::onMoveDown()
{
  this->holder->runAction(
    EaseSineInOut::create(
      MoveTo::create(0.2, Vec2(0, 0))
    )
  );

  if(this->buttons.character->state->create)
  {
    this->buttons.character->runAction(
      EaseSineInOut::create(
        MoveBy::create(0.2, Vec2(0, -100))
      )
    );
  }

  if(this->buttons.gift->state->create)
  {
    this->buttons.gift->runAction(
      EaseSineInOut::create(
        MoveBy::create(0.2, Vec2(0, -100))
      )
    );
  }

  if(this->buttons.video->state->create)
  {
    this->buttons.video->runAction(
      EaseSineInOut::create(
        MoveBy::create(0.2, Vec2(0, -100))
      )
    );
  }
}

/**
 *
 *
 *
 */
void Finish::onBest()
{
  this->counter->onBest();
}

void Finish::onRegular()
{
  this->counter->onRegular();
}

void Finish::onUnlock()
{
  vector<Item*> items;

  for(auto item : Store::getInstance()->items.characters)
  {
    if(item->state == Item::STATE_LOCKED_COINS)
    {
      items.push_back(item);
    }
  }

  items[random(0, (int) (items.size() - 1))]->setState(Item::STATE_SELECTED);

  if(!Application->parameters.ad)
  {
    this->onMoveDown();
  }

  this->splash->runAction(
    Sequence::create(
      FadeIn::create(0.2),
      FadeOut::create(1.0),
      nullptr
    )
  );

  float x = Application->getCenter().x - 627;
  float y = Application->getCenter().y - 656;

  this->decoration->_destroy();
  this->decoration->setSkin(Application->character->getSkin());
  this->decoration->_create();
  this->decoration->setSlotsToSetupPose();
  this->decoration->setBonesToSetupPose();
  this->decoration->onCreateTextures(true);
  this->decoration->setAnimation({0, "menu", false});
  this->decoration->setPosition(x, y);
  this->decoration->setRotation(45);
  this->decoration->runAction(
    Sequence::create(
      EaseSineInOut::create(
        MoveTo::create(0.2, Vec2(this->decoration->getPositionX() + 500, this->decoration->getPositionY() + 500))
      ),
      nullptr
    )
  );

  this->removeCoins(100);
}

/**
 *
 *
 *
 */
void Finish::show()
{
  Director::getInstance()->pushScene(this);
}

void Finish::hide()
{
  this->stopAllActions();

  this->buttons.play->_destroy();

  this->decoration->runAction(
    EaseSineInOut::create(
      MoveTo::create(0.2, Vec2(this->decoration->getPositionX() + 500, this->decoration->getPositionY() + 500))
    )
  );

  Director::getInstance()->popScene(TransitionFade::create(0.4, Director::getInstance()->getPreviousScene(), Color3B::WHITE));

  Application->changeState(Game::STATE_PREPARE);
}

/**
 *
 *
 *
 */
void Finish::showButtons()
{
  Node* special = nullptr;

  if(Application->state == Game::STATE_LOSE)
  {
    this->parameters.elapsed.video++;
    this->parameters.elapsed.gift++;
    this->parameters.elapsed.ad++;

    if(Heyzap::available(Config::AD_TYPE_VIDEO) && this->parameters.elapsed.video >= this->parameters.video)
    {
      special = this->buttons.video->_create();
    }
    else
    {
      if(this->parameters.elapsed.gift >= this->parameters.gift)
      {
        special = this->buttons.gift->_create();
      }
      else
      {
        if(Application->counter->values.coins >= 100)
        {
          int count = 0;

          for(auto item : Store::getInstance()->items.characters)
          {
            if(item->state == Item::STATE_LOCKED_COINS)
            {
              count++;
            }
          }

          if(count)
          {
            special = this->buttons.character->_create();
          }
        }

        if(this->parameters.elapsed.ad >= this->parameters.ad)
        {
          this->parameters.elapsed.ad = 0;

          Heyzap::show(Config::AD_TYPE_INTERSTITIAL);
        }
      }
    }

    if(special)
    {
      Sound->play("special");
    }
  }

  if(special && !Application->parameters.ad)
  {
    this->holder->setPosition(0, 100);
  }
  else
  {
    this->holder->setPosition(0, 0);
  }

  float x = Application->getCenter().x - 627;
  float y = Application->getCenter().y - 656;

  this->decoration->setSkin(Application->character->getSkin());
  this->decoration->_create();
  this->decoration->setSlotsToSetupPose();
  this->decoration->setBonesToSetupPose();
  this->decoration->onCreateTextures(true);
  this->decoration->setAnimation({0, "menu", false});
  this->decoration->setPosition(x, y);
  this->decoration->setRotation(45);
  this->decoration->runAction(
    Sequence::create(
      EaseSineInOut::create(
        MoveTo::create(0.2, Vec2(this->decoration->getPositionX() + 500, this->decoration->getPositionY() + 500))
      ),
      DelayTime::create(0.5),
      CallFunc::create([=] () {

        /**
         *
         *
         *
         */
        Vote::update();
      }),
      nullptr
    )
  );

  this->buttons.play->_create();
  this->buttons.play->setPosition(Application->getCenter().x, Application->getCenter().y - 30);
  this->buttons.like->setPosition(Application->getCenter().x - 200, Application->getCenter().y - 200);
  this->buttons.rate->setPosition(Application->getCenter().x - 110, Application->getCenter().y - 270);
  this->buttons.share->setPosition(Application->getCenter().x, Application->getCenter().y - 290);
  this->buttons.leaderboards->setPosition(Application->getCenter().x + 110, Application->getCenter().y - 270);
  this->buttons.achievements->setPosition(Application->getCenter().x + 200, Application->getCenter().y - 200);
  this->buttons.sound->setPosition(Application->getCenter().x - 240, Application->getCenter().y + 20);
  this->buttons.store->setPosition(Application->getCenter().x + 240, Application->getCenter().y + 20);
  this->buttons.missions->setPosition(Application->getCenter().x + 240, Application->getCenter().y - 90);
  this->buttons.tutorial->setPosition(Application->getCenter().x - 240, Application->getCenter().y - 90);
  this->buttons.noad->setPosition(Application->getCenter().x - 240, Application->getCenter().y + 20);

  if(!Application->parameters.ad&&false)
  {
    this->buttons.sound->_destroy();

    this->buttons.noad->_create();
    this->buttons.noad->setScale(0);
    this->buttons.noad->runAction(
      Sequence::create(
        DelayTime::create(0.05),
        EaseSineOut::create(
          ScaleTo::create(0.2, 1.0)
        ),
        nullptr
      )
    );
  }
  else
  {
    this->buttons.noad->_destroy();

    this->buttons.sound->_create();
    this->buttons.sound->setScale(0);
    this->buttons.sound->runAction(
      Sequence::create(
        DelayTime::create(0.05),
        EaseSineOut::create(
          ScaleTo::create(0.2, 1.0)
        ),
        nullptr
      )
    );
  }

  this->buttons.tutorial->_create();
  this->buttons.tutorial->setScale(0);
  this->buttons.tutorial->runAction(
    Sequence::create(
      DelayTime::create(0.1),
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      nullptr
    )
  );

  this->buttons.like->_create();
  this->buttons.like->setScale(0);
  this->buttons.like->runAction(
    Sequence::create(
      DelayTime::create(0.15),
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      nullptr
    )
  );

  this->buttons.rate->_create();
  this->buttons.rate->setScale(0);
  this->buttons.rate->runAction(
    Sequence::create(
      DelayTime::create(0.2),
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      nullptr
    )
  );

  this->buttons.share->_create();
  this->buttons.share->setScale(0);
  this->buttons.share->runAction(
    Sequence::create(
      DelayTime::create(0.25),
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      nullptr
    )
  );

  this->buttons.leaderboards->_create();
  this->buttons.leaderboards->setScale(0);
  this->buttons.leaderboards->runAction(
    Sequence::create(
      DelayTime::create(0.3),
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      nullptr
    )
  );

  this->buttons.achievements->_create();
  this->buttons.achievements->setScale(0);
  this->buttons.achievements->runAction(
    Sequence::create(
      DelayTime::create(0.35),
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      nullptr
    )
  );

  this->buttons.missions->_create();
  this->buttons.missions->setScale(0);
  this->buttons.missions->runAction(
    Sequence::create(
      DelayTime::create(0.4),
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      nullptr
    )
  );

  this->buttons.store->_create();
  this->buttons.store->setScale(0);
  this->buttons.store->runAction(
    Sequence::create(
      DelayTime::create(0.45),
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      nullptr
    )
  );

  this->buttons.play->_create();
  this->buttons.play->setScale(0);
  this->buttons.play->runAction(
    Sequence::create(
      DelayTime::create(0.5),
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      nullptr
    )
  );
}

/**
 *
 *
 *
 */
void Finish::updateSoundState()
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
void Finish::updateTextData()
{
  this->counter->updateTextData();
}
