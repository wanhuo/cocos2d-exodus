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

#include "Coins.h"

#include "Game.h"

/**
 *
 *
 *
 */
Coins::Coins(bool environment)
{
  if(environment)
  {
    this->holder = new Entity("counter-coins.png", this, true);
    this->texts.coins = new Text("coins", this->holder, true);

    this->holder->setPosition(this->getWidth() - this->holder->getWidth() / 2 - 15, this->getHeight() - 50);
    this->texts.coins->setPosition(this->holder->getWidth() / 2, this->holder->getHeight() / 2);

    #if CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_MAC
    this->buttons.back = new Button("back-button.png", 1, 2, this, std::bind(&Coins::hide, this), true);
    this->buttons.back->setPosition(65, this->getHeight() - 65);
    this->buttons.back->setLocalZOrder(10);
    #endif

    this->holder->setLocalZOrder(10);
  }

  this->coins = new Pool(new Coin, 30, this);
}

Coins::~Coins()
{
}

/**
 *
 *
 *
 */
void Coins::onEnter()
{
  Screen::onEnter();

  /**
   *
   *
   *
   */
  this->updateTextData();

  this->counter.add = 0;
  this->counter.remove = 0;
}

void Coins::onExit()
{
  this->stopAllActions();
  this->clearCoins();

  if(this->counter.add)
  {
    Application->counter->values.coins += this->counter.add;
  }

  if(this->counter.remove)
  {
    Application->counter->values.coins -= this->counter.remove;
  }

  Application->counter->save();

  /**
   *
   *
   *
   */
  Screen::onExit();
}

void Coins::onEnterTransitionDidFinish()
{
  this->updateTextData();

  /**
   *
   *
   *
   */
  Screen::onEnterTransitionDidFinish();
}

void Coins::onExitTransitionDidStart()
{
  this->stopAllActions();
  this->clearCoins();

  if(this->counter.add)
  {
    Application->counter->values.coins += this->counter.add;
  }

  if(this->counter.remove)
  {
    Application->counter->values.coins -= this->counter.remove;
  }

  Application->counter->save();

  /**
   *
   *
   *
   */
  Screen::onExitTransitionDidStart();
}

/**
 *
 *
 *
 */
void Coins::createCoins(int count, int coins)
{
  Coin::TIME = 1.0;

  this->addCoins(max(count, coins));

  this->runAction(
    Sequence::create(
      DelayTime::create(0.1),
      CallFunc::create([=] () {

        /**
         *
         *
         *
         */
        for(int i = 0; i < count; i++)
        {
          this->coins->_create();
        }
      }),
      DelayTime::create(0.5),
      CallFunc::create([=] () {

        /**
         *
         *
         *
         */
        Coin::TIME = 0.2;
      }),
      DelayTime::create(0.5),
      CallFunc::create([=] () {

        /**
         *
         *
         *
         */
        Coin::TIME = 1.0;
      }),
      nullptr
    )
  );

  Sound->play("coins-reward");
}

void Coins::clearCoins()
{
  this->coins->clear();
}

/**
 *
 *
 *
 */
void Coins::addCoins(int count)
{
  this->counter.add += count;

  this->runAction(
    Repeat::create(
      Sequence::create(
        CallFunc::create([=] () {
          Application->counter->values.coins++;
          this->counter.add--;

          this->updateTextData();
        }),
        DelayTime::create(0.01),
        nullptr
      ),
      count
    )
  );
}

void Coins::removeCoins(int count)
{
  this->counter.remove += count;

  this->runAction(
    Repeat::create(
      Sequence::create(
        CallFunc::create([=] () {
          Application->counter->values.coins--;
          this->counter.remove--;

          this->updateTextData();
        }),
        DelayTime::create(0.01),
        nullptr
      ),
      count
    )
  );
}

/**
 *
 *
 *
 */
void Coins::updateTextData()
{
  if(this->texts.coins)
  {
    this->texts.coins->data(Application->counter->values.coins);
  }
}
