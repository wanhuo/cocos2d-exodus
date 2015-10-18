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
  this->background->setPositionY(-Application->height);

  this->scroll = cocos2d::ui::ScrollView::create();
  this->scroll->setDirection(cocos2d::ui::ScrollView::Direction::VERTICAL);
  this->scroll->setBounceEnabled(true);
  this->scroll->setContentSize(Size(Application->width, this->parameters.height));
  this->scroll->setPositionY(Application->height - this->parameters.height);

  this->holder = new Background(this->scroll);
  this->decorations = new Background(this->holder);

  this->holder->setPositionX(Application->center.x);

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

  this->tutorialAnimation1 = new TutorialAnimation("tutorial-animation-1.json", "tutorial-animation-1.atlas", this->holder);
  this->tutorialAnimation2 = new TutorialAnimation("tutorial-animation-2.json", "tutorial-animation-2.atlas", this->holder);
  this->tutorialAnimation3 = new TutorialAnimation("tutorial-animation-3.json", "tutorial-animation-3.atlas", this->holder);

  this->tutorialRepeat = new TutorialRepeat(this->holder);

  this->texts.titles[0] = new Text("tutorial-title-1", this->holder, true);
  this->texts.titles[1] = new Text("tutorial-title-2", this->holder, true);
  this->texts.titles[2] = new Text("tutorial-title-3", this->holder, true);
  this->texts.titles[3] = new Text("tutorial-title-4", this->holder, true);

  this->texts.numbers[0] = new Text("tutorial-number-1", this->holder, true);
  this->texts.numbers[1] = new Text("tutorial-number-2", this->holder, true);
  this->texts.numbers[2] = new Text("tutorial-number-3", this->holder, true);

  this->texts.tutorial[0] = new Text("credits-title-1", this->holder, true);
  this->texts.tutorial[1] = new Text("credits-title-2", this->holder, TextHAlignment::RIGHT, true);
  this->texts.tutorial[2] = new Text("credits-title-3", this->holder, TextHAlignment::RIGHT, true);
  this->texts.tutorial[3] = new Text("credits-title-4", this->holder, TextHAlignment::RIGHT, true);
  this->texts.tutorial[4] = new Text("credits-title-5", this->holder, true);
  this->texts.tutorial[5] = new Text("credits-title-6", this->holder, true);
  this->texts.tutorial[6] = new Text("credits-title-7", this->holder, TextHAlignment::RIGHT, true);
  this->texts.tutorial[7] = new Text("credits-title-8", this->holder, true);
  this->texts.tutorial[8] = new Text("credits-title-9", this->holder, true);
  this->texts.tutorial[9] = new Text("credits-title-10", this->holder, true);
  this->texts.tutorial[10] = new Text("credits-title-11", this->holder, true);
  this->texts.tutorial[11] = new Text("credits-title-12", this->holder, true);
  this->texts.tutorial[12] = new Text("credits-title-13", this->holder, true);
  this->texts.tutorial[13] = new Text("credits-title-14", this->holder, true);
  this->texts.tutorial[14] = new Text("credits-title-15", this->holder, true);
  this->texts.tutorial[15] = new Text("credits-title-16", this->holder, true);
  this->texts.tutorial[16] = new Text("credits-title-17", this->holder, true);
  this->texts.tutorial[17] = new Text("credits-title-18", this->holder, true);
  this->texts.tutorial[18] = new Text("credits-title-19", this->holder, TextHAlignment::LEFT, true);
  this->texts.tutorial[19] = new Text("credits-title-20", this->holder, TextHAlignment::LEFT, true);
  this->texts.tutorial[20] = new Text("credits-title-21", this->holder, TextHAlignment::LEFT, true);
  this->texts.tutorial[21] = new Text("credits-title-22", this->holder, TextHAlignment::LEFT, true);
  this->texts.tutorial[22] = new Text("credits-title-23", this->holder, true);

  this->texts.tutorial[19]->data(Internal::getVersionCode());
  this->texts.tutorial[20]->data(Internal::getBuildNumber());
  this->texts.tutorial[21]->data(Internal::getSupportCode());

  int t = 1600;

  this->decoration1->setPosition(
    210,
    Application->height - 700
  );
  this->decoration2->setPosition(
    Application->width - 150,
    Application->height - 800
  );
  this->decoration3->setPosition(
    210,
    Application->height - 1200
  );

  this->twitter->setPosition(-75, -650 - t);
  this->facebook->setPosition(0, -650 - t);
  this->mail->setPosition(75, -650 - t);
  this->restore->setPosition(0, -850 - t);

  this->powered1->setPosition(0, -1980 - t);
  this->powered2->setPosition(0, -2180 - t);

  this->tutorialAnimation1->setPosition(0, -300);
  this->tutorialAnimation2->setPosition(0, -700);
  this->tutorialAnimation3->setPosition(0, -1100);

  this->tutorialRepeat->setPosition(0, -1530);

  this->texts.titles[0]->setPosition(0, -100);
  this->texts.titles[1]->setPosition(0, -180);
  this->texts.titles[2]->setPosition(0, -580);
  this->texts.titles[3]->setPosition(0, -960);

  this->texts.numbers[0]->setPosition(-this->texts.titles[1]->getWidth() / 2 - 25, -150);
  this->texts.numbers[1]->setPosition(-this->texts.titles[2]->getWidth() / 2 - 25, -550);
  this->texts.numbers[2]->setPosition(-this->texts.titles[3]->getWidth() / 2 - 25, -950);

  this->texts.tutorial[0]->setPosition(0, -100 - t);
  this->texts.tutorial[1]->setPosition(0, -160 - t);
  this->texts.tutorial[2]->setPosition(0, -200 - t);
  this->texts.tutorial[3]->setPosition(0, -240 - t);
  this->texts.tutorial[4]->setPosition(0, -440 - t);
  this->texts.tutorial[5]->setPosition(0, -520 - t);
  this->texts.tutorial[6]->setPosition(0, -580 - t);
  this->texts.tutorial[7]->setPosition(0, -980 - t);
  this->texts.tutorial[8]->setPosition(0, -1040 - t);
  this->texts.tutorial[9]->setPosition(0, -1080 - t);
  this->texts.tutorial[10]->setPosition(0, -1140 - t);
  this->texts.tutorial[11]->setPosition(0, -1180 - t);
  this->texts.tutorial[12]->setPosition(0, -1240 - t);
  this->texts.tutorial[13]->setPosition(0, -1280 - t);
  this->texts.tutorial[14]->setPosition(0, -1480 - t);
  this->texts.tutorial[15]->setPosition(0, -1540 - t);
  this->texts.tutorial[16]->setPosition(0, -1580 - t);
  this->texts.tutorial[17]->setPosition(0, -1780 - t);
  this->texts.tutorial[18]->setPosition(5, this->texts.tutorial[1]->getPositionY());
  this->texts.tutorial[19]->setPosition(5, this->texts.tutorial[2]->getPositionY());
  this->texts.tutorial[20]->setPosition(5, this->texts.tutorial[3]->getPositionY());
  this->texts.tutorial[21]->setPosition(5, this->texts.tutorial[6]->getPositionY());
  this->texts.tutorial[22]->setPosition(0, -780 - t);

  this->size = -this->powered2->getPositionY() + this->parameters.padding;

  this->scroll->setInnerContainerSize(
    Size(
      Application->width,
      this->size
    )
  );

  this->holder->setPositionY(this->size);

  this->state->create = true;

  this->setScheduleUpdate(true);
  this->bind(true);

  this->setLocalZOrder(1000);
  this->retain();
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
  Application->buttons.credits->setCurrentFrameIndex(2);
  Application->buttons.credits->runAction(
    EaseSineInOut::create(
      MoveBy::create(this->parameters.time, Vec2(0, this->parameters.height))
    )
  );

  this->background->runAction(
    EaseSineInOut::create(
      MoveBy::create(this->parameters.time, Vec2(0, this->parameters.height))
    )
  );

  Application->addChild(this);

  this->runAction(
    Sequence::create(
      FadeTo::create(this->parameters.time, this->parameters.opacity),
      CallFunc::create(CC_CALLBACK_0(Credits::onShow, this)),
      nullptr
    )
  );
}

void Credits::hide()
{
  Application->buttons.credits->setCurrentFrameIndex(0);
  Application->buttons.credits->runAction(
    EaseSineInOut::create(
      MoveBy::create(this->parameters.time, Vec2(0, -this->parameters.height))
    )
  );

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
