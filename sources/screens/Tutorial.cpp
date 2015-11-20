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
: Coins(true)
{
  instance = this;

  this->background = new BackgroundColor(this, Color4B(235, 255, 255, 255));
  this->holder = new BackgroundColor(this, Color4B(132, 209, 223, 255));

  this->list = new BackgroundPages(this);
  this->list->setDirection(cocos2d::ui::PageView::Direction::HORIZONTAL);
  this->list->setContentSize(Size(this->width, this->height));
  this->list->setTouchEnabled(true);
  this->list->addEventListener([=] (Ref *pSender, cocos2d::ui::PageView::EventType type) {
  this->onPageChanged();
  });

  this->holder->setContentSize(Size(this->width, 400));
  this->holder->ignoreAnchorPointForPosition(false);
  this->holder->setAnchorPoint(Vec2(0.5, 1.0));

  this->holder->setPosition(this->center.x, this->height);

  this->texts.title = new Text("tutorial-title-1", this->holder, true);

  this->texts.title->setPosition(this->holder->getContentSize().width / 2, this->holder->getContentSize().height / 2);

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

  this->scroll = new BackgroundScroll(this);
  this->scroll->setDirection(cocos2d::ui::ScrollView::Direction::VERTICAL);
  this->scroll->setContentSize(Size(Application->width, Application->height - 400));
  this->scroll->setBounceEnabled(true);
  this->scroll->setTouchEnabled(true);
  this->scroll->setSwallowTouches(true);
  this->scroll->setPositionY(0);
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
  this->text = new Text("tutorial-title-2", this->scroll, true);
  this->text->setPosition(Application->center.x, Application->height - 500);

  this->animation = new TutorialAnimation("tutorial-animation-1.json", "tutorial-animation-1.atlas", this->scroll);
  this->animation->setPosition(Application->center.x, Application->height - 700);
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
}

TutorialLayout2::~TutorialLayout2()
{
}
