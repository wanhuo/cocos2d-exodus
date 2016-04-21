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

#include "Credits.h"

#include "Game.h"

/**
 *
 *
 *
 */
Credits* Credits::instance;

/**
 *
 *
 *
 */
Credits* Credits::getInstance()
{
  return instance;
}

/**
 *
 *
 *
 */
Credits::Credits()
{
  instance = this;

  this->background = new BackgroundColor(this, Color4B(21, 176, 191, 255));
  this->background->setPositionY(-Application->getHeight());

  this->scroll = cocos2d::ui::ScrollView::create();
  this->scroll->setDirection(cocos2d::ui::ScrollView::Direction::VERTICAL);
  this->scroll->setBounceEnabled(true);
  this->scroll->setContentSize(Size(Application->getWidth(), this->parameters.height));
  this->scroll->setPositionY(Application->getHeight() - this->parameters.height);

  this->holder = new Background(this->scroll);
  this->decorations = new Background(this->holder);

  this->holder->setPositionX(Application->getCenter().x);

  this->background->addChild(this->scroll);

  this->twitter = new Button("twitter-button.png", 1, 2, this->holder, std::bind(&Game::onTwitter, Application), true);
  this->facebook = new Button("facebook-button.png", 1, 2, this->holder, std::bind(&Game::onFacebook, Application), true);
  this->mail = new Button("mail-button.png", 1, 2, this->holder, std::bind(&Game::onMail, Application), true);
  this->restore = new Button("restore-purchases-button.png", 1, 2, this->holder, std::bind(&Game::onRestorePurchases, Application), true);

  this->decoration1 = new Entity("credits-decoration-1.png", this->decorations, true);
  this->decoration2 = new Entity("credits-decoration-2.png", this->decorations, true);
  this->decoration3 = new Entity("credits-decoration-3.png", this->decorations, true);

  this->powered1 = new Entity("cocos2dx.png", this->holder, true);
  this->powered2 = new Entity("freepick.png", this->holder, true);

  this->texts.title[0] = new Text("credits-title-1", this->holder, true);
  this->texts.title[1] = new Text("credits-title-2", this->holder, TextHAlignment::RIGHT, true);
  this->texts.title[2] = new Text("credits-title-3", this->holder, TextHAlignment::RIGHT, true);
  this->texts.title[3] = new Text("credits-title-4", this->holder, TextHAlignment::RIGHT, true);
  this->texts.title[4] = new Text("credits-title-5", this->holder, true);
  this->texts.title[5] = new Text("credits-title-6", this->holder, true);
  this->texts.title[6] = new Text("credits-title-7", this->holder, TextHAlignment::RIGHT, true);
  this->texts.title[7] = new Text("credits-title-8", this->holder, true);
  this->texts.title[8] = new Text("credits-title-9", this->holder, true);
  this->texts.title[9] = new Text("credits-title-10", this->holder, true);
  this->texts.title[10] = new Text("credits-title-11", this->holder, true);
  this->texts.title[11] = new Text("credits-title-12", this->holder, true);
  this->texts.title[12] = new Text("credits-title-13", this->holder, true);
  this->texts.title[13] = new Text("credits-title-14", this->holder, true);
  this->texts.title[14] = new Text("credits-title-15", this->holder, true);
  this->texts.title[15] = new Text("credits-title-16", this->holder, true);
  this->texts.title[16] = new Text("credits-title-17", this->holder, true);
  this->texts.title[17] = new Text("credits-title-18", this->holder, true);
  this->texts.title[18] = new Text("credits-title-19", this->holder, TextHAlignment::LEFT, true);
  this->texts.title[19] = new Text("credits-title-20", this->holder, TextHAlignment::LEFT, true);
  this->texts.title[20] = new Text("credits-title-21", this->holder, TextHAlignment::LEFT, true);
  this->texts.title[21] = new Text("credits-title-22", this->holder, TextHAlignment::LEFT, true);
  this->texts.title[22] = new Text("credits-title-23", this->holder, true);

  this->texts.title[19]->data(Internal::getVersionCode());
  this->texts.title[20]->data(Internal::getBuildNumber());
  this->texts.title[21]->data(Internal::getSupportCode());

  int t = 0;

  this->decoration1->setPosition(
    210,
    Application->getHeight() - 100
  );
  this->decoration2->setPosition(
    Application->getWidth() - 150,
    Application->getHeight() - 200
  );
  this->decoration3->setPosition(
    210,
    Application->getHeight() - 600
  );

  this->twitter->setPosition(-75, -650 - t);
  this->facebook->setPosition(0, -650 - t);
  this->mail->setPosition(75, -650 - t);
  this->restore->setPosition(0, -850 - t);

  this->powered1->setPosition(0, -1980 - t);
  this->powered2->setPosition(0, -2180 - t);

  this->texts.title[0]->setPosition(0, -100 - t);
  this->texts.title[1]->setPosition(0, -160 - t);
  this->texts.title[2]->setPosition(0, -200 - t);
  this->texts.title[3]->setPosition(0, -240 - t);
  this->texts.title[4]->setPosition(0, -440 - t);
  this->texts.title[5]->setPosition(0, -520 - t);
  this->texts.title[6]->setPosition(0, -580 - t);
  this->texts.title[7]->setPosition(0, -980 - t);
  this->texts.title[8]->setPosition(0, -1040 - t);
  this->texts.title[9]->setPosition(0, -1080 - t);
  this->texts.title[10]->setPosition(0, -1140 - t);
  this->texts.title[11]->setPosition(0, -1180 - t);
  this->texts.title[12]->setPosition(0, -1240 - t);
  this->texts.title[13]->setPosition(0, -1280 - t);
  this->texts.title[14]->setPosition(0, -1480 - t);
  this->texts.title[15]->setPosition(0, -1540 - t);
  this->texts.title[16]->setPosition(0, -1580 - t);
  this->texts.title[17]->setPosition(0, -1780 - t);
  this->texts.title[18]->setPosition(5, this->texts.title[1]->getPositionY() - 2);
  this->texts.title[19]->setPosition(5, this->texts.title[2]->getPositionY() - 2);
  this->texts.title[20]->setPosition(5, this->texts.title[3]->getPositionY() - 2);
  this->texts.title[21]->setPosition(5, this->texts.title[6]->getPositionY() - 2);
  this->texts.title[22]->setPosition(0, -780 - t);

  this->size = -this->powered2->getPositionY() + this->parameters.padding;

  this->scroll->setInnerContainerSize(
    Size(
      Application->getWidth(),
      this->size
    )
  );

  this->holder->setPositionY(this->size);

  this->state->create = true;

  this->setScheduleUpdate(true);
  this->bind(true);

  this->setLocalZOrder(1000);
  this->retain();

  /**
   *
   * @Optional
   * Hide restore purchases title and button from Android users.
   *
   */
  //#if CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID
  this->restore->setVisible(false);
  this->texts.title[22]->setVisible(false);
  //#endif
}

Credits::~Credits()
{
}

/**
 *
 *
 *
 */
void Credits::onEnter()
{
  BackgroundColor::onEnter();

  /**
   *
   *
   *
   */
  this->scroll->setInnerContainerPosition(Vec2(0, -this->size + this->parameters.height));
  this->scroll->getInnerContainer()->runAction(
    Sequence::create(
      DelayTime::create(0.5),
      MoveTo::create(60.0, Vec2(
        0,
        0
      )),
      nullptr
    )
  );

  /**
   *
   *
   *
   */
  Events::onScreenChanged("Credits");
}

void Credits::onExit()
{
  BackgroundColor::onExit();

  /**
   *
   *
   *
   */
  Events::onScreenChanged("Game");
}

/**
 *
 *
 *
 */
void Credits::onShow()
{
  Application->buttons.credits->bind(true);
}

void Credits::onHide()
{
  Application->buttons.credits->bind(true);
}

void Credits::onToogle()
{
  Application->buttons.credits->bind(false);
}

/**
 *
 *
 *
 */
void Credits::show()
{
  Application->hand->stopAllActions();
  Application->hand->runAction(
    FadeOut::create(0.2)
  );

  Application->buttons.credits->setCurrentFrameIndex(2);

  if(Application->parameters.ad)
  {
    Application->buttons.credits->runAction(
      Sequence::create(
        EaseSineInOut::create(
          MoveBy::create(this->parameters.time, Vec2(0, this->parameters.height))
        ),
        nullptr
      )
    );
  }
  else
  {
    Application->buttons.credits->runAction(
      Sequence::create(
        EaseSineInOut::create(
          MoveBy::create(this->parameters.time / 4, Vec2(0, -100))
        ),
        EaseSineInOut::create(
          MoveBy::create(this->parameters.time, Vec2(0, this->parameters.height))
        ),
        nullptr
      )
    );
  }

  this->background->runAction(
    Sequence::create(
      DelayTime::create(Application->parameters.ad ? 0 : this->parameters.time / 4),
      EaseSineInOut::create(
        MoveBy::create(this->parameters.time, Vec2(0, this->parameters.height))
      ),
      nullptr
    )
  );

  Application->addChild(this);

  this->runAction(
    Sequence::create(
      DelayTime::create(Application->parameters.ad ? 0 : this->parameters.time / 4),
      FadeTo::create(this->parameters.time, this->parameters.opacity),
      CallFunc::create(CC_CALLBACK_0(Credits::onShow, this)),
      nullptr
    )
  );
}

void Credits::hide()
{
  Application->hand->stopAllActions();
  Application->hand->runAction(
    FadeIn::create(0.2)
  );

  Application->buttons.credits->setCurrentFrameIndex(0);

  if(Application->parameters.ad)
  {
    Application->buttons.credits->runAction(
      Sequence::create(
        EaseSineInOut::create(
          MoveBy::create(this->parameters.time, Vec2(0, -this->parameters.height))
        ),
        nullptr
      )
    );
  }
  else
  {
    Application->buttons.credits->runAction(
      Sequence::create(
        EaseSineInOut::create(
          MoveBy::create(this->parameters.time, Vec2(0, -this->parameters.height))
        ),
        EaseSineInOut::create(
          MoveBy::create(this->parameters.time / 4, Vec2(0, 100))
        ),
        nullptr
      )
    );
  }

  this->background->runAction(
    EaseSineInOut::create(
      MoveBy::create(this->parameters.time, Vec2(0, -this->parameters.height))
    )
  );

  this->runAction(
    Sequence::create(
      FadeOut::create(this->parameters.time),
      CallFunc::create(CC_CALLBACK_0(Credits::removeFromParent, this)),
      CallFunc::create(CC_CALLBACK_0(Credits::onHide, this)),
      nullptr
    )
  );
}

void Credits::toogle()
{
  if(this->state->active)
  {
    this->hide();
  }
  else
  {
    this->show();
  }

  this->onToogle();
}

/**
 *
 *
 *
 */
bool Credits::containsTouchLocation(cocos2d::Touch* touch)
{
  return true;
}

/**
 *
 *
 *
 */
void Credits::update(float time)
{
  this->decorations->setPositionY(-this->scroll->getInnerContainer()->getPositionY() / 10);
}
