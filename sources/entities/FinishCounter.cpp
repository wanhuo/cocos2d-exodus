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
  this->coins->setPosition(Application->width - this->coins->getWidth() / 2 - 15, Application->height - 50);

  this->holders.congratulations = new Entity("test.png", this);

  this->texts.value = new Text("counter", this, true);
  this->texts.best = new Text("best", this, true);
  this->texts.taps = new Text("jumps", this, true);
  this->texts.deaths = new Text("deaths", this, true);
  this->texts.coins = new Text("coins", this->coins, true);
  this->texts.congratulations = new Text("congratulations", this->holders.congratulations, true);

  this->holders.congratulations->setPosition(this->getWidth() / 2, 0);

  this->texts.value->setPosition(this->getWidth() / 2, this->getHeight() / 2);
  this->texts.best->setPosition(this->getWidth() / 2, this->getHeight() / 2 + 260);
  this->texts.taps->setPosition(this->getWidth() / 2, this->getHeight() / 2 + 220);
  this->texts.deaths->setPosition(this->getWidth() / 2, this->getHeight() / 2 + 180);
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
        MoveTo::create(1.0, Vec2(Application->center.x, Application->height - 310)
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
  this->texts.taps->data(Application->counter->values.taps);
  this->texts.deaths->data(Application->counter->values.deaths);
}

/**
 *
 *
 *
 */
void FinishCounter::onBest()
{
  this->crown->_create();

  this->holders.congratulations->_create();
  this->holders.congratulations->setScale(0);
  this->holders.congratulations->runAction(
    Sequence::create(
      DelayTime::create(1.0),
      EaseSineInOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      nullptr
    )
  );
  this->holders.congratulations->runAction(
    Sequence::create(
      DelayTime::create(2.0),
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
}
