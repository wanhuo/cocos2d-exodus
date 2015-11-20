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

/**
 *
 *
 *
 */
FinishCounter::FinishCounter()
: Entity("counter.png", Finish::getInstance(), true)
{
  this->crown = new Crown(this);

  this->coins = new Entity("counter-coins.png", Finish::getInstance(), true);
  this->best = new Entity("counter-best.png", this, true);

  this->coins->setPosition(Application->width - this->coins->getWidth() / 2 - 15, Application->height - 50);
  this->best->setPosition(this->getWidth() / 2, 20);
  this->best->setScale(0.75);

  this->holders.congratulations = new Entity("text-holder-1.png", this);

  this->texts.value = new Text("counter", this, true);
  this->texts.best = new Text("best", this->best, true);
  this->texts.coins = new Text("coins", this->coins, true);
  this->texts.congratulations = new Text("congratulations", this->holders.congratulations, true);

  this->holders.congratulations->setPosition(this->getWidth() / 2, 0);

  this->texts.value->setPosition(this->getWidth() / 2, this->getHeight() / 2);
  this->texts.best->setPosition(this->best->getWidth() / 2, this->best->getHeight() / 2);
  this->texts.coins->setPosition(this->coins->getWidth() / 2, this->coins->getHeight() / 2);
  this->texts.congratulations->setPosition(this->holders.congratulations->getWidth() / 2, this->holders.congratulations->getHeight() / 2);
}

FinishCounter::~FinishCounter()
{
}

/**
 *
 *
 *
 */
void FinishCounter::onEnter()
{
  Entity::onEnter();

  /**
   *
   *
   *
   */
  this->setPosition(Application->center.x, Application->height - 140);
  this->runAction(
    Sequence::create(
      EaseBounceOut::create(
        MoveBy::create(1.0, Vec2(0.0, -100.0)
        )
      ),
      nullptr
    )
  );

  this->updateTextData();
}

void FinishCounter::onExit()
{
  Entity::onExit();

  /**
   *
   *
   *
   */
  this->holders.congratulations->_destroy();

  this->crown->_destroy();
}

/**
 *
 *
 *
 */
void FinishCounter::updateTextData()
{
  this->texts.value->data(Application->counter->values.score);
  this->texts.best->data(Application->counter->values.best);
  this->texts.coins->data(Application->counter->values.coins);
}

/**
 *
 *
 *
 */
void FinishCounter::onBest()
{
  Services::leaderboards->update(SERVICES_LEADERBOARD_BEST_SCORE, Application->counter->values.best);
  Services::leaderboards->update(SERVICES_LEADERBOARD_TAPS_COUNT, Application->counter->values.taps);
  Services::leaderboards->update(SERVICES_LEADERBOARD_GAMES_PLAYED, Application->counter->values.deaths);

  this->crown->_create();

  this->holders.congratulations->_create();
  this->holders.congratulations->setScale(0);
  this->holders.congratulations->runAction(
    Sequence::create(
      EaseSineInOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      nullptr
    )
  );
  this->holders.congratulations->runAction(
    Sequence::create(
      CallFunc::create([=] () {
        this->holders.congratulations->runAction(
          RepeatForever::create(
            Sequence::create(
              DelayTime::create(1.0),
              EaseSineInOut::create(
                ScaleTo::create(3.0, 1.2)
              ),
              EaseSineInOut::create(
                ScaleTo::create(3.0, 1.0)
              ),
              nullptr
            )
          )
        );
      }),
      nullptr
    )
  );

  Sound->play("best");
}
