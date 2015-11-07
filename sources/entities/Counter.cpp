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
Counter::Counter()
: Entity("counter.png", Application->b)
{
  this->circles = new Pool(new Entity("counter.png"), this, true);

  this->coins = new Entity("counter-coins.png", Application->e, true);
  this->coins->setPosition(Application->width + this->coins->getWidth() / 2, Application->height - 50);

  this->holders.status = new Entity("text-holder-3.png", Application->b);
  this->holders.decoration = new Entity("text-holder-2.png", Application->b);

  this->texts.value = new Text("counter", this, true);
  this->texts.best = new Text("best", Application->b);
  this->texts.taps = new Text("jumps", Application->b);
  this->texts.deaths = new Text("deaths", Application->b);
  this->texts.start = new Text("start", Application->b);
  this->texts.status = new Text("fail", this->holders.status, true);
  this->texts.coins = new Text("coins", this->coins, true);
  this->texts.decoration = new Text("decoration-0", this->holders.decoration, true);

  this->texts.value->setPosition(this->getWidth() / 2, this->getHeight() / 2);
  this->texts.coins->setPosition(this->coins->getWidth() / 2, this->coins->getHeight() / 2);
  this->texts.best->setPosition(Application->center.x, Application->height - 150 + 300);
  this->texts.taps->setPosition(Application->center.x, Application->height - 190 + 300);
  this->texts.deaths->setPosition(Application->center.x, Application->height - 230 + 300);
  this->texts.status->setPosition(this->holders.status->getWidth() / 2, this->holders.status->getHeight() / 2);
  this->texts.decoration->setPosition(this->holders.decoration->getWidth() / 2, this->holders.decoration->getHeight() / 2);

  this->circles->setLocalZOrder(-1);

  this->holders.status->setLocalZOrder(-2);
  this->holders.decoration->setLocalZOrder(-2);

  this->holders.status->setCascadeOpacityEnabled(true);
  this->holders.decoration->setCascadeOpacityEnabled(true);

  this->setScheduleUpdate(true);

  this->missionUpdateProgress.coins = Storage::get("values.missions.progress.coins");
  this->missionUpdateProgress.points = Storage::get("values.missions.progress.points");
  this->missionUpdateProgress.games = Storage::get("values.missions.progress.games");
  this->missionUpdateProgress.gifts = Storage::get("values.missions.progress.gifts");
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
  this->setPosition(Application->center.x, Application->height - 410);

  this->runAction(
    EaseSineInOut::create(
      ScaleTo::create(0.5, 1.0)
    )
  );

  this->texts.best->_create()->runAction(
    Sequence::create(
      DelayTime::create(0),
      EaseSineInOut::create(
        MoveTo::create(0.2, Vec2(
          this->texts.best->getPositionX(),
          this->texts.best->getPositionY() - 300
        ))
      ),
      nullptr
    )
  );
  this->texts.taps->_create()->runAction(
    Sequence::create(
      DelayTime::create(0.2),
      EaseSineInOut::create(
        MoveTo::create(0.2, Vec2(
          this->texts.taps->getPositionX(),
          this->texts.taps->getPositionY() - 300
        ))
      ),
      nullptr
    )
  );
  this->texts.deaths->_create()->runAction(
    Sequence::create(
      DelayTime::create(0.4),
      EaseSineInOut::create(
        MoveTo::create(0.2, Vec2(
          this->texts.deaths->getPositionX(),
          this->texts.deaths->getPositionY() - 300
        ))
      ),
      nullptr
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
void Counter::onScore(bool update)
{
  if(update)
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
          CallFunc::create(CC_CALLBACK_0(Node::_destroy, element, true)),
          nullptr
        ),
        nullptr
      )
    );

    this->updateTextData();
  }
  else
  {
    this->values.score++;
  }
}

void Counter::onCoin(bool update)
{
  if(update)
  {
    this->updateTextData();

    if(MissionsFactory::getInstance()->isListenen())
    {
      this->missionUpdateOnce.coins++;
      this->missionUpdateProgress.coins++;

      Events::updateMissions();
    }

    Sound->play("coins-collect");
  }
  else
  {
    this->values.coins++;

    Sound->play("coins");
  }
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
      this->holders.decoration->setPosition(Application->center.x, this->getPositionY() - 190);
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
          CallFunc::create(CC_CALLBACK_0(Node::_destroy, this->holders.decoration, true)),
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

  Sound->play("success");
}

void Counter::onMistake()
{
  this->holders.status->stopAllActions();

  this->texts.status->setText("mistake");

  this->holders.status->_create();
  this->holders.status->setPosition(Application->center.x, this->getPositionY() - (190 + (this->holders.decoration->state->create ? 80 : 0)));
  this->holders.status->setScale(0);
  this->holders.status->setOpacity(255);
  this->holders.status->runAction(
    Sequence::create(
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      DelayTime::create(1.5),
      FadeOut::create(0.2),
      CallFunc::create(CC_CALLBACK_0(Node::_destroy, this->holders.status, true)),
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
  this->holders.status->setPosition(Application->center.x, this->getPositionY() - (190 + (this->holders.decoration->state->create ? 80 : 0)));
  this->holders.status->setScale(0);
  this->holders.status->setOpacity(255);
  this->holders.status->runAction(
    Sequence::create(
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      DelayTime::create(1.5),
      FadeOut::create(0.2),
      CallFunc::create(CC_CALLBACK_0(Node::_destroy, this->holders.status, true)),
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
  this->holders.decoration->setPosition(Application->center.x, this->getPositionY() - 190);
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
      CallFunc::create(CC_CALLBACK_0(Node::_destroy, this->holders.decoration, true)),
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
   *
  this->texts.start->_create();
  this->texts.start->setPosition(Application->center.x, this->getPositionY() - 180);
  this->texts.start->setOpacity(0);
  this->texts.start->runAction(
    FadeIn::create(1.0)
  );
   */
}

void Counter::onGame()
{
  this->texts.start->runAction(
    Sequence::create(
      FadeOut::create(0.2),
      CallFunc::create(CC_CALLBACK_0(Text::_destroy, this->texts.start, true)),
      nullptr
    )
  );

  if(MissionsFactory::getInstance()->isListenen())
  {
    this->missionUpdateProgress.games++;

    Events::updateMissions();
  }
}

void Counter::onLose()
{
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

  return ret;
}

/**
 *
 *
 *
 */
void Counter::reset()
{
  this->values.score = 0;
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
  this->texts.taps->data(this->values.taps);
  this->texts.deaths->data(this->values.deaths);
}

/**
 *
 *
 *
 */
MissionUpdate Counter::getMissionsUpdate()
{
  return {
    this->missionUpdateOnce,
    this->missionUpdateProgress
  };
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
}

void Counter::resetProgressMissionsUpdate()
{
  this->missionUpdateProgress.coins = 0;
  this->missionUpdateProgress.points = 0;
  this->missionUpdateProgress.games = 0;
  this->missionUpdateProgress.gifts = 0;
}

/**
 *
 *
 *
 */
void Counter::update(float time)
{
  Application->e->setPositionY(-Application->b->getPositionY());
  this->coins->setPositionX(Application->width - (Application->b->getPositionY() - this->coins->getWidth() / 2) + 30);
}
