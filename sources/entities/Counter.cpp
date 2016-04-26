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
Counter::Counter()
: Entity("counter.png", Application->b)
{
  this->circles = new Pool(new Entity("counter.png"), this, true);

  this->coins = new Entity("counter-coins-free.png", Application->e, true);
  this->best = new Entity("counter-best.png", this, true);

  this->coins->setPosition(Application->getWidth() + this->coins->getWidth() / 2, Application->getHeight() - 50);
  this->best->setPosition(this->getWidth() / 2, 20);
  this->best->setScale(0.75);
  this->best->setVisible(false);

  this->holders.status = new Entity("text-holder-3.png", Application->b);
  this->holders.decoration = new Entity("text-holder-2.png", Application->b);

  this->texts.value = new Text("counter", this, true);
  this->texts.best = new Text("best", this->best, true);
  this->texts.start = new Text("start", Application->b);
  this->texts.status = new Text("fail", this->holders.status, true);
  this->texts.coins = new Text("coins-yellow", this->coins, TextHAlignment::LEFT, true);
  this->texts.decoration = new Text("decoration-0", this->holders.decoration, true);

  this->texts.coins->setPosition(56, this->coins->getHeight() / 2);
  this->texts.value->setPosition(this->getWidth() / 2, this->getHeight() / 2);
  this->texts.best->setPosition(this->best->getWidth() / 2 + 24, this->best->getHeight() / 2 - 2);
  this->texts.status->setPosition(this->holders.status->getWidth() / 2, this->holders.status->getHeight() / 2);
  this->texts.decoration->setPosition(this->holders.decoration->getWidth() / 2, this->holders.decoration->getHeight() / 2);

  this->circles->setLocalZOrder(-1);

  this->holders.status->setLocalZOrder(-2);
  this->holders.decoration->setLocalZOrder(-2);

  this->holders.status->setCascadeOpacityEnabled(true);
  this->holders.decoration->setCascadeOpacityEnabled(true);

  this->missionUpdateProgress.coins = Storage::get("values.missions.progress.coins");
  this->missionUpdateProgress.points = Storage::get("values.missions.progress.points");
  this->missionUpdateProgress.games = Storage::get("values.missions.progress.games");
  this->missionUpdateProgress.gifts = Storage::get("values.missions.progress.gifts");

  this->missionUpdateProgress.special_progress_1 = Storage::get("values.missions.progress.special_progress_1");
  this->missionUpdateProgress.special_progress_2 = Storage::get("values.missions.progress.special_progress_2");
  this->missionUpdateProgress.special_progress_3 = Storage::get("values.missions.progress.special_progress_3");
  this->missionUpdateProgress.special_progress_4 = Storage::get("values.missions.progress.special_progress_4");
  this->missionUpdateProgress.special_progress_5 = Storage::get("values.missions.progress.special_progress_5");
}

Counter::~Counter()
{
}

/**
 *
 *
 *
 */
void Counter::onEnter()
{
  Entity::onEnter();

  /**
   *
   *
   *
   */
  this->reset();
}

void Counter::onExit()
{
  Entity::onExit();
}

/**
 *
 *
 *
 */
void Counter::onCreate()
{
  Entity::onCreate();

  /**
   *
   *
   *
   */
  this->circles->clear();

  this->setScale(0);
  this->setPosition(Application->getCenter().x, Application->getHeight() - 254);

  this->runAction(
    EaseSineInOut::create(
      ScaleTo::create(0.5, 0.75)
    )
  );

  this->updateTextData();
}

void Counter::onDestroy(bool action)
{
  Entity::onDestroy(action);
}

/**
 *
 *
 *
 */
void Counter::onScore()
{
  auto element = this->circles->_create();

  element->setPositionX(this->getWidth() / 2);
  element->setPositionY(this->getHeight() / 2);

  element->setOpacity(255);
  element->setScale(1.0);

  element->runAction(
    Spawn::create(
      FadeOut::create(0.3),
      Sequence::create(
        ScaleTo::create(0.3, 1.7),
        CallFunc::create([=] () {
          element->_destroy(true);
        }),
        nullptr
      ),
      nullptr
    )
  );

  {
    this->values.score++;
    this->values.score_b++;

    /**
     *
     * @Services
     * Update achievements.
     *
     */
    if(this->values.score >= 1)
    {
      Services::achievements->update(SERVICES_ACHIEVEMENTS_REACH_POINTS_1);
    }
    if(this->values.score >= 10)
    {
      Services::achievements->update(SERVICES_ACHIEVEMENTS_REACH_POINTS_10);
    }
    if(this->values.score >= 50)
    {
      Services::achievements->update(SERVICES_ACHIEVEMENTS_REACH_POINTS_50);
    }
    if(this->values.score >= 100)
    {
      Services::achievements->update(SERVICES_ACHIEVEMENTS_REACH_POINTS_100);
    }
    if(this->values.score >= 500)
    {
      Services::achievements->update(SERVICES_ACHIEVEMENTS_REACH_POINTS_500);
    }

    /**
     *
     *
     *
     */
    this->updateTextData();
  }
}

void Counter::onCoin()
{
  this->values.coins++;

  this->updateTextData();

  if(MissionsFactory::getInstance()->isListenen())
  {
    this->missionUpdateOnce.coins++;
    this->missionUpdateProgress.coins++;

    Events::updateMissions();
  }

  Sound->play("coins-collect");
}

void Counter::onTap()
{
  this->values.taps++;
}

void Counter::onDeath()
{
  this->values.deaths++;
}

/**
 *
 *
 *
 */
void Counter::onSuccess()
{
  if(Application->character->getPositionY() >= 2000 && probably(5))
  {
    if(this->holders.decoration->getNumberOfRunningActions() < 1)
    {
      this->texts.decoration->setText("decoration-" + patch::to_string(random(0, 1)));

      this->holders.decoration->_create();
      this->holders.decoration->setPosition(Application->getCenter().x, this->getPositionY() - 190);
      this->holders.decoration->setScale(0);
      this->holders.decoration->setOpacity(255);
      this->holders.decoration->runAction(
        Sequence::create(
          EaseSineOut::create(
            ScaleTo::create(0.2, 1.0)
          ),
          DelayTime::create(2.5),
          FadeOut::create(0.2),
          CallFunc::create([=] () {
            if(this->holders.status->state->create)
            {
              this->holders.status->runAction(
                EaseSineInOut::create(
                  MoveBy::create(0.2, Vec2(0, 80))
                )
              );
            }
          }),
          CallFunc::create([=] () {
            this->holders.decoration->_destroy(true);
          }),
          nullptr
        )
      );
    }

    if(this->holders.status->state->create)
    {
      this->holders.status->runAction(
        EaseSineInOut::create(
          MoveBy::create(0.2, Vec2(0, -80))
        )
      );
    }
  }

  if(MissionsFactory::getInstance()->isListenen())
  {
    this->missionUpdateOnce.points++;
    this->missionUpdateProgress.points++;

    Events::updateMissions();
  }
}

void Counter::onMistake()
{
  this->holders.status->stopAllActions();

  this->texts.status->setText("mistake");

  this->holders.status->_create();
  this->holders.status->setPosition(Application->getCenter().x, this->getPositionY() - (190 + (this->holders.decoration->state->create ? 80 : 0)));
  this->holders.status->setScale(0);
  this->holders.status->setOpacity(255);
  this->holders.status->runAction(
    Sequence::create(
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      DelayTime::create(1.5),
      FadeOut::create(0.2),
      CallFunc::create([=] () {
        this->holders.status->_destroy(true);
      }),
      nullptr
    )
  );

  Sound->play("mistake");

  Events::updateMissions();
}

void Counter::onFail()
{
  this->holders.status->stopAllActions();

  this->texts.status->setText("fail");

  this->holders.status->_create();
  this->holders.status->setPosition(Application->getCenter().x, this->getPositionY() - (190 + (this->holders.decoration->state->create ? 80 : 0)));
  this->holders.status->setScale(0);
  this->holders.status->setOpacity(255);
  this->holders.status->runAction(
    Sequence::create(
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      DelayTime::create(1.5),
      FadeOut::create(0.2),
      CallFunc::create([=] () {
        this->holders.status->_destroy(true);
      }),
      nullptr
    )
  );

  Sound->play("fail");

  Events::updateMissions();
}

/**
 *
 *
 *
 */
void Counter::onMissionComplete()
{
  this->resetMissionsUpdate();

  this->texts.decoration->setText("mission-complete");

  this->holders.decoration->stopAllActions();
  this->holders.decoration->_create();
  this->holders.decoration->setPosition(Application->getCenter().x, this->getPositionY() - 190);
  this->holders.decoration->setScale(0);
  this->holders.decoration->setOpacity(255);
  this->holders.decoration->runAction(
    Sequence::create(
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      DelayTime::create(4.0),
      FadeOut::create(0.2),
      CallFunc::create([=] () {
        if(this->holders.status->state->create)
        {
          this->holders.status->runAction(
            EaseSineInOut::create(
              MoveBy::create(0.2, Vec2(0, 80))
            )
          );
        }
      }),
      CallFunc::create([=] () {
        this->holders.decoration->_destroy(true);
      }),
      nullptr
    )
  );

  if(this->holders.status->state->create)
  {
    this->holders.status->runAction(
      EaseSineInOut::create(
        MoveBy::create(0.2, Vec2(0, -80))
      )
    );
  }

  Sound->play("mission-complete");
}

/**
 *
 *
 *
 */
void Counter::onMenu()
{
}

void Counter::onAnimation()
{
  this->_create();
}

void Counter::onPrepare()
{
  this->reset();
}

void Counter::onStart()
{
  /**
   *
   * @Optional
   * Can be commented because of using animated hand texture.
   *
   */
  if(!Application->parameters.tutorial)
  {
    this->texts.start->_create();
    this->texts.start->setPosition(Application->getCenter().x, this->getPositionY() - 180);
    this->texts.start->setOpacity(0);
    this->texts.start->runAction(
      FadeIn::create(1.0)
    );
  }
}

void Counter::onGame()
{
  Events::onPlay();

  this->texts.start->runAction(
    Sequence::create(
      FadeOut::create(0.2),
      CallFunc::create([=] () {
        this->texts.start->_destroy(true);
      }),
      nullptr
    )
  );

  this->coins->runAction(
    EaseBounceOut::create(
      MoveTo::create(1.0, Vec2(Application->getWidth() - this->coins->getWidth() / 2 - this->texts.coins->getWidth() - 25, Application->getHeight() - 50))
    )
  );

  if(MissionsFactory::getInstance()->isListenen())
  {
    this->missionUpdateProgress.games++;

    Events::updateMissions();
  }

  /**
   *
   * @Services
   * Update achievements.
   *
   */
  if(this->values.deaths >= 1)
  {
    Services::achievements->update(SERVICES_ACHIEVEMENTS_GAMES_PLAYED_1);
  }
  if(this->values.deaths >= 10)
  {
    Services::achievements->update(SERVICES_ACHIEVEMENTS_GAMES_PLAYED_10);
  }
  if(this->values.deaths >= 20)
  {
    Services::achievements->update(SERVICES_ACHIEVEMENTS_GAMES_PLAYED_20);
  }
  if(this->values.deaths >= 50)
  {
    Services::achievements->update(SERVICES_ACHIEVEMENTS_GAMES_PLAYED_50);
  }
  if(this->values.deaths >= 100)
  {
    Services::achievements->update(SERVICES_ACHIEVEMENTS_REACH_POINTS_100);
  }
}

void Counter::onLose()
{
  Events::onLose(this->values.score);

  /**
   *
   * @Optional
   *
   *
   */
  Events::updateMissions();
}

/**
 *
 *
 *
 */
bool Counter::save()
{
  bool ret = false;

  if(this->values.score > this->values.best)
  {
    ret = true;
  }

  this->values.best = max(this->values.best, this->values.score);

  Storage::set("values.scores.best", this->values.best);
  Storage::set("values.currenct.coins", this->values.coins);
  Storage::set("values.info.taps", this->values.taps);
  Storage::set("values.info.deaths", this->values.deaths);

  Storage::set("values.missions.progress.coins", this->missionUpdateProgress.coins);
  Storage::set("values.missions.progress.points", this->missionUpdateProgress.points);
  Storage::set("values.missions.progress.games", this->missionUpdateProgress.games);
  Storage::set("values.missions.progress.gifts", this->missionUpdateProgress.gifts);

  Storage::set("values.missions.progress.special_progress_1", this->missionUpdateProgress.special_progress_1);
  Storage::set("values.missions.progress.special_progress_2", this->missionUpdateProgress.special_progress_2);
  Storage::set("values.missions.progress.special_progress_3", this->missionUpdateProgress.special_progress_3);
  Storage::set("values.missions.progress.special_progress_4", this->missionUpdateProgress.special_progress_4);
  Storage::set("values.missions.progress.special_progress_5", this->missionUpdateProgress.special_progress_5);

  return ret;
}

/**
 *
 *
 *
 */
void Counter::reset()
{
  this->coins->setPosition(Application->getWidth() + this->coins->getWidth() / 2, Application->getHeight() - 50);

  this->values.score = 0;
  this->values.score_b = 0;
  this->updateTextData();

  this->holders.decoration->stopAllActions();
  this->holders.status->stopAllActions();

  this->holders.decoration->_destroy(true);
  this->holders.status->_destroy(true);

  this->resetOnceMissionsUpdate();

  MissionsFactory::getInstance()->startListen();
}

/**
 *
 *
 *
 */
void Counter::updateTextData()
{
  this->texts.value->data(this->values.score);
  this->texts.best->data(this->values.best);
  this->texts.coins->data(this->values.coins);

  switch(Application->state)
  {
    case Game::STATE_GAME:
    this->updateTextPosition();
    break;
  }
}

void Counter::updateTextPosition()
{
  this->coins->setPosition(Application->getWidth() - this->coins->getWidth() / 2 - this->texts.coins->getWidth() - 25, Application->getHeight() - 50);
  this->texts.coins->setPosition(56, this->coins->getHeight() / 2);
}

/**
 *
 *
 *
 */
MissionUpdate Counter::getMissionsUpdate() const
{
  MissionUpdate update;

  update.o = this->missionUpdateOnce;
  update.p = this->missionUpdateProgress;

  return update;
}

void Counter::resetMissionsUpdate()
{
  this->resetOnceMissionsUpdate();
  this->resetProgressMissionsUpdate();
}

void Counter::resetOnceMissionsUpdate()
{
  this->missionUpdateOnce.coins = 0;
  this->missionUpdateOnce.points = 0;
  this->missionUpdateOnce.points_best = this->values.best;

  this->missionUpdateOnce.special_once_1 = 0;
  this->missionUpdateOnce.special_once_2 = 0;
}

void Counter::resetProgressMissionsUpdate()
{
  this->missionUpdateProgress.coins = 0;
  this->missionUpdateProgress.points = 0;
  this->missionUpdateProgress.games = 0;
  this->missionUpdateProgress.gifts = 0;
}
