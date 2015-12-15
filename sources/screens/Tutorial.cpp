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

#include "Tutorial.h"
#include "Game.h"

/**
 *
 *
 *
 */
Tutorial* Tutorial::instance;

/**
 *
 *
 *
 */
Tutorial* Tutorial::getInstance()
{
  return instance;
}

/**
 *
 *
 *
 */
Tutorial::Tutorial()
: Coins(false)
{
  instance = this;

  this->background = new BackgroundColor(this, Color4B(235, 255, 255, 255));
  this->holder = new BackgroundColor(this, Color4B(132, 209, 223, 255));

  this->list = new BackgroundPages(this);
  this->list->setDirection(cocos2d::ui::PageView::Direction::HORIZONTAL);
  this->list->setContentSize(Size(this->width, this->height));
  this->list->setTouchEnabled(false);

  this->next = new Button("finish-play-button.png", 1, 2, this, std::bind(&Tutorial::onPageChanged, this), true);

  this->holder->setContentSize(Size(this->width, 400));
  this->holder->ignoreAnchorPointForPosition(false);
  this->holder->setAnchorPoint(Vec2(0.5, 1.0));

  this->holder->setPosition(this->center.x, this->height);

  this->next->setPosition(Application->center.x, 200);
  this->next->setScale(0.5);

  this->list->insertPage(new TutorialLayout1, 0);
  this->list->insertPage(new TutorialLayout2, 1);
}

Tutorial::~Tutorial()
{
}

/**
 *
 *
 *
 */
void Tutorial::onEnter()
{
  Coins::onEnter();

  /**
   *
   *
   *
   */
  this->index = 0;

  this->next->runAction(
    RepeatForever::create(
      Sequence::create(
        EaseSineInOut::create(
          ScaleTo::create(0.75, 0.6)
        ),
        EaseSineInOut::create(
          ScaleTo::create(0.75, 0.4)
        ),
        nullptr
      )
    )
  );

  Events::onScreenChanged("Tutorial");
}

void Tutorial::onExit()
{
  Coins::onExit();
}

/**
 *
 *
 *
 */
void Tutorial::onPageChanged()
{
  switch(this->index++)
  {
    case 0:
    this->changePage(1);
    break;
    case 1:
    this->hide();
    break;
  }
}

/**
 *
 *
 *
 */
void Tutorial::changePage(int index)
{
  this->list->scrollToPage(index);
}

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
TutorialLayout::TutorialLayout()
{
  this->setContentSize(Size(Application->width, Application->height));
}

TutorialLayout::~TutorialLayout()
{
}

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
TutorialLayout1::TutorialLayout1()
{
  this->text = new Text("tutorial-title-2", this, true);
  this->text->setPosition(Application->center.x, Application->height - 200);

  this->animation = new TutorialAnimation("tutorial-animation-1.json", "tutorial-animation-1.atlas", this);
  this->animation->setPosition(Application->center.x, Application->height - 500);
}

TutorialLayout1::~TutorialLayout1()
{
}

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
TutorialLayout2::TutorialLayout2()
{
  this->text = new Text("tutorial-title-3", this, true);
  this->text->setPosition(Application->center.x, Application->height - 200);

  this->animation = new TutorialAnimation("tutorial-animation-2.json", "tutorial-animation-2.atlas", this);
  this->animation->setPosition(Application->center.x, Application->height - 500);
}

TutorialLayout2::~TutorialLayout2()
{
}
