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

#include "Mission.h"

#include "Game.h"
#include "Store.h"
#include "Missions.h"

/**
 *
 *
 *
 */
Mission::Mission(int id)
: BackgroundColor(Missions::getInstance()->scroll, Color4B(132, 209, 223, 255))
{
  this->id = id;
  this->mission = MissionsFactory::getInstance()->getMission(this->id);

  int size = MissionsFactory::getInstance()->getMissions().size() - 1;

  float x = Application->getCenter().x;
  float y = 200 + (size - this->id) * 220;

  this->ignoreAnchorPointForPosition(false);
  this->setAnchorPoint(Vec2(0.5, 0.5));
  this->setContentSize(Size(620, 200));
  this->setPosition(x, y);

  this->progressBackground = new BackgroundColor(this, Color4B(255, 255, 255, 255));
  this->progressBar = new BackgroundColor(this, Color4B(237, 113, 115, 255));

  this->coins = new Entity("counter-coins.png", this);
  this->lock = new Entity("lock.png", this);

  this->texts.mission = new Text(this->mission->text, this);
  this->texts.additional = new Text("mission-additional-reward", this);
  this->texts.coins = new Text("coins", this->coins, true);

  this->lock->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2);
  this->coins->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 - 70);

  this->texts.coins->setPosition(this->coins->getContentSize().width / 2, this->coins->getContentSize().height / 2);

  this->coins->setScale(0.75);

  this->progressBackground->ignoreAnchorPointForPosition(false);
  this->progressBar->ignoreAnchorPointForPosition(false);

  this->progressBackground->setAnchorPoint(Vec2(0.5, 0.5));
  this->progressBar->setAnchorPoint(Vec2(0.0, 0.5));

  this->progressBackground->setContentSize(Size(550, 30));
  this->progressBar->setContentSize(Size(550 - 10, 20));

  this->progressBackground->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 - 70);
  this->progressBar->setPosition(this->getContentSize().width / 2 - 550 / 2 + 5, this->getContentSize().height / 2 - 70);

  this->progressBackground->_destroy();
  this->progressBar->_destroy();

  this->bind(true, false);
}

Mission::~Mission()
{
}

/**
 *
 *
 *
 */
void Mission::onEnter()
{
  BackgroundColor::onEnter();

  /**
   *
   *
   *
   */
  this->state->create = true;

  switch(this->mission->state)
  {
    case MissionStruct::STATE_LOCKED:
    case MissionStruct::STATE_CURRENT:
    this->setColor(Color3B(132, 209, 223));
    break;
    case MissionStruct::STATE_CLAIM:
    this->setColor(Color3B(237, 115, 113));
    break;
  }

  switch(this->mission->state)
  {
    case MissionStruct::STATE_LOCKED:
    this->lock->_create();
    break;
    case MissionStruct::STATE_CURRENT:
    this->texts.mission->_create();

    switch(this->mission->type)
    {
      case MissionStruct::TYPE_ONCE:
      if(this->mission->coins)
      {
        this->coins->_create();
        this->texts.additional->_create();
        this->texts.additional->setText("mission-additional-reward");

        this->texts.mission->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 + 50);
        this->texts.additional->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 - 20);

        this->texts.coins->data(this->mission->coins);
      }
      else
      {
        this->texts.mission->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2);
      }
      break;
      case MissionStruct::TYPE_PROGRESS:
      this->texts.additional->_create();
      this->texts.additional->setText("mission-progress");

      this->texts.mission->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 + 50);
      this->texts.additional->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 - 20);

      this->progressBackground->_create();
      this->progressBar->_create();

      this->progressBar->setContentSize(Size((Application->getWidth() - 300 - 10) * this->mission->progress / 100.0, 20));
      break;
    }
    break;
    case MissionStruct::STATE_CLAIM:
    this->setScale(1.0);
    this->runAction(
      RepeatForever::create(
        Sequence::create(
          EaseSineInOut::create(
            ScaleTo::create(2.0, 1.05)
          ),
          EaseSineInOut::create(
            ScaleTo::create(2.0, 1.0)
          ),
          nullptr
        )
      )
    );

    this->coins->_create();
    this->texts.additional->_create();
    this->texts.additional->setText("mission-claim-reward");

    this->texts.additional->setPosition(this->getContentSize().width / 2, this->getContentSize().height / 2 + 20);

    this->texts.coins->data(this->mission->coins);
    break;
    case MissionStruct::STATE_FINISHED:
    break;
  }
}

void Mission::onExit()
{
  BackgroundColor::onExit();

  /**
   *
   *
   *
   */
  this->state->create = false;

  this->lock->_destroy();
  this->coins->_destroy();

  this->texts.mission->_destroy();
  this->texts.additional->_destroy();

  this->progressBackground->_destroy();
  this->progressBar->_destroy();
}

/**
 *
 *
 *
 */
void Mission::onTouchStart(cocos2d::Touch* touch, Event* e)
{
  Node::onTouchStart(touch, e);

  /**
   *
   *
   *
   */
  Color3B color;

  switch(this->mission->state)
  {
    case MissionStruct::STATE_LOCKED:
    case MissionStruct::STATE_CURRENT:
    color = Color3B(100, 204, 223);
    break;
    case MissionStruct::STATE_CLAIM:
    color = Color3B(237, 101, 100);
    break;
  }

  auto action = EaseSineInOut::create(
    TintTo::create(0.2, color)
  );
  action->setTag(1);

  this->runAction(action);
}

void Mission::onTouchFinish(cocos2d::Touch* touch, Event* e)
{
  this->stopActionByTag(1);

  switch(this->mission->state)
  {
    case MissionStruct::STATE_LOCKED:
    case MissionStruct::STATE_CURRENT:
    this->setColor(Color3B(132, 209, 223));
    break;
    case MissionStruct::STATE_CLAIM:
    this->setColor(Color3B(237, 115, 113));
    break;
  }

  Node::onTouchFinish(touch, e);
}

void Mission::onTouchCancelled(cocos2d::Touch* touch, Event* e)
{
  Node::onTouchCancelled(touch, e);

  /**
   *
   *
   *
   */
  this->stopActionByTag(1);

  switch(this->mission->state)
  {
    case MissionStruct::STATE_LOCKED:
    case MissionStruct::STATE_CURRENT:
    this->setColor(Color3B(132, 209, 223));
    break;
    case MissionStruct::STATE_CLAIM:
    this->setColor(Color3B(237, 115, 113));
    break;
  }
}

/**
 *
 *
 *
 */
void Mission::onTouch(cocos2d::Touch* touch, Event* e)
{
  switch(this->mission->state)
  {
    case MissionStruct::STATE_CURRENT:
    switch(this->mission->link)
    {
      case 0:
      Director::getInstance()->popToRootScene(TransitionFade::create(0.2, Director::getInstance()->getRootScene(), Color3B::WHITE));

      switch(Application->state)
      {
        case Game::STATE_FINISH:
        Application->changeState(Game::STATE_PREPARE);
        break;
      }
      break;
      case 1:
      Store::getInstance()->show();
      Store::getInstance()->list->runAction(
        Sequence::create(
          DelayTime::create(0.2),
          CallFunc::create([=] () {
          Store::getInstance()->list->scrollToPage(1);
          }),
          nullptr
        )
      );
      break;
    }
    break;
    case MissionStruct::STATE_CLAIM:
    this->runAction(
      Sequence::create(
        CallFunc::create([=] () {
          Modal::block();

          Missions::getInstance()->createCoins(this->mission->coins);

          this->mission->setState(MissionStruct::STATE_FINISHED);
          this->bind(false);

          this->setLocalZOrder(1);
          this->runAction(
            Sequence::create(
              EaseSineInOut::create(
                MoveBy::create(0.5, Vec2(0, -20))
              ),
              EaseSineInOut::create(
                MoveBy::create(0.5, Vec2(0, 520))
              ),
              CallFunc::create([=] () {
                float y = this->getPositionY() - 500;
                float t = 0;

                for(auto m : Missions::getInstance()->missions)
                {
                  if(m->getPositionY() < y)
                  {
                    m->runAction(
                      Sequence::create(
                        DelayTime::create(t),
                        MoveBy::create(0.2, Vec2(0, 220)),
                        nullptr
                      )
                    );

                    t += 0.1;
                  }
                }
              }),
              CallFunc::create([=] () {
              	this->_destroy(true);
              }),
              CallFunc::create([=] () {
              	//Missions::getInstance()->updateListHeight();
              }),
              CallFunc::create([=] () {
                Modal::hide();
              }),
              nullptr
            )
          );

          Sound->play("unlock");
        }),
        nullptr
      )
    );
    break;
  }

  switch(this->mission->state)
  {
    case MissionStruct::STATE_LOCKED:
    Sound->play("disable");
    break;
    case MissionStruct::STATE_CURRENT:
    case MissionStruct::STATE_CLAIM:
    Sound->play("touch");
    break;
  }
}
