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

#include "Store.h"

#include "ItemCharacter.h"
#include "ItemCreature.h"
#include "ItemEnvironment.h"
#include "ItemCoins.h"

#include "Game.h"
#include "Finish.h"

/**
 *
 *
 *
 */
Store* Store::instance;

/**
 *
 *
 *
 */
Store* Store::getInstance()
{
  return instance;
}

/**
 *
 *
 *
 */
Store::Store()
: Coins(true)
{
  instance = this;

  /**
   *
   *
   *
   */
  auto rootJsonData = Json_create(FileUtils::getInstance()->getStringFromFile("items.json").c_str());
  auto charactersJsonData = Json_getItem(rootJsonData, "characters");
  auto creaturesJsonData = Json_getItem(rootJsonData, "creatures");
  auto environmentsJsonData = Json_getItem(rootJsonData, "environments");

  /**
   *
   *
   *
   */
  for(auto characterJsonData = charactersJsonData->child; characterJsonData; characterJsonData = characterJsonData->next)
  {
    this->items.characters.push_back(new ItemCharacter(characterJsonData));
  }

  /**
   *
   *
   *
   */
  for(auto creatureJsonData = creaturesJsonData->child; creatureJsonData; creatureJsonData = creatureJsonData->next)
  {
    this->items.creatures.push_back(new ItemCreature(creatureJsonData));
  }

  /**
   *
   *
   *
   */
  for(auto environmentJsonData = environmentsJsonData->child; environmentJsonData; environmentJsonData = environmentJsonData->next)
  {
    this->items.environments.push_back(new ItemEnvironment(environmentJsonData));
  }

  /**
   *
   *
   *
   */
  bool someCharacterSelected = false;
  bool someEnvironmentSelected = false;

  for(auto selectedCharacter : this->items.characters)
  {
    if(selectedCharacter->state == Item::STATE_SELECTED)
    {
      someCharacterSelected = true;
    }
  }

  for(auto selectedEnvironment : this->items.environments)
  {
    if(selectedEnvironment->state == Item::STATE_SELECTED)
    {
      someEnvironmentSelected = true;
    }
  }

  if(!someCharacterSelected)
  {
    this->items.characters.at(0)->setState(Item::STATE_SELECTED);
  }

  if(!someEnvironmentSelected)
  {
    this->items.environments.at(0)->setState(Item::STATE_SELECTED);
  }

  /**
   *
   *
   *
   */
  this->background = new BackgroundColor(this, Color4B(235, 255, 255, 255));
  this->holder = new BackgroundColor(this, Color4B(132, 209, 223, 255));

  this->holder->setContentSize(Size(this->getWidth(), 400));

  this->holder->ignoreAnchorPointForPosition(false);
  this->holder->setAnchorPoint(Vec2(0.5, 1.0));
  this->holder->setPosition(this->getCenter().x, Application->getHeight());
  
  this->list = new BackgroundPages(this);
  this->list->setDirection(cocos2d::ui::PageView::Direction::HORIZONTAL);
  this->list->setContentSize(Size(this->getWidth(), this->getHeight()));
  this->list->setTouchEnabled(true);
  this->list->addEventListener([=] (Ref *pSender, cocos2d::ui::PageView::EventType type) {
  this->onPageChanged();
  });

  this->buttons.root.push_back(new Button("store-button-1.png", 1, 3, this, std::bind(&Store::changePage, this, 0), true));
  this->buttons.root.push_back(new Button("store-button-2.png", 1, 3, this, std::bind(&Store::changePage, this, 1), true));
  this->buttons.root.push_back(new Button("store-button-3.png", 1, 3, this, std::bind(&Store::changePage, this, 2), true));
  //this->buttons.root.push_back(new Button("store-button-4.png", 1, 3, this, std::bind(&Store::changePage, this, 3), true));

  this->buttons.root.at(0)->setPosition(this->getCenter().x - 160, this->getHeight() - 270);
  this->buttons.root.at(1)->setPosition(this->getCenter().x - 0, this->getHeight() - 270);
  this->buttons.root.at(2)->setPosition(this->getCenter().x + 160, this->getHeight() - 270);
  //this->buttons.root.at(3)->setPosition(this->getCenter().x + 192, this->getHeight() - 270);

  this->buttons.root.at(0)->addChild(new StoreCharactersHandler);
  this->buttons.root.at(1)->addChild(new StoreCreaturesHandler);
  this->buttons.root.at(2)->addChild(new StoreEnvironmentsHandler);
  //this->buttons.root.at(3)->addChild(new StoreCoinsHandler);

  this->list->insertPage(new StoreLayoutCharacters, 0);
  this->list->insertPage(new StoreLayoutCreatures, 1);
  this->list->insertPage(new StoreLayoutEnvironments, 2);
  //this->list->insertPage(new StoreLayoutCoins, 3);
}

Store::~Store()
{
}

/**
 *
 *
 *
 */
void Store::onPageChanged()
{
  for(auto button : this->buttons.root)
  {
    button->setCurrentFrameIndex(0);
    button->bind(true);
  }
  
  this->buttons.root.at(this->list->getCurPageIndex())->setCurrentFrameIndex(2);
  this->buttons.root.at(this->list->getCurPageIndex())->bind(false);
}

/**
 *
 *
 *
 */
void Store::onEnter()
{
  Coins::onEnter();

  /**
   *
   *
   *
   */
  this->onPageChanged();

  Events::onScreenChanged("Store");
}

void Store::onExit()
{
  Coins::onExit();
}

/**
 *
 *
 *
 */
void Store::changePage(int index)
{
  this->list->scrollToPage(index);

  for(auto button : this->buttons.root)
  {
    button->setCurrentFrameIndex(0);
    button->bind(true);
  }

  this->buttons.root.at(index)->setCurrentFrameIndex(2);
  this->buttons.root.at(index)->bind(false);

  ((StoreLayout*) this->list->getPage(index))->onPageEnter();
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
StoreLayout::StoreLayout()
{
  this->setContentSize(Size(Application->getWidth(), Application->getHeight()));

  this->scroll = new BackgroundScroll(this);
  this->scroll->setDirection(cocos2d::ui::ScrollView::Direction::VERTICAL);
  this->scroll->setContentSize(Size(Application->getWidth(), Application->getHeight() - 400));
  this->scroll->setBounceEnabled(true);
  this->scroll->setTouchEnabled(true);
  this->scroll->setSwallowTouches(true);
  this->scroll->setPositionY(0);
}

StoreLayout::~StoreLayout()
{
}

/**
 *
 *
 *
 */
void StoreLayout::onEnter()
{
  cocos2d::ui::Layout::onEnter();

  /**
   *
   *
   *
   */
  if(this->holder)
  {
    this->holder->setScale(1.0);
    this->holder->runAction(
      RepeatForever::create(
        Sequence::create(
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
  }

  this->onPageEnter();

  this->updateTextData();
}

/**
 *
 *
 *
 */
void StoreLayout::onPageEnter()
{
  this->scroll->jumpToTop();
}

void StoreLayout::onExit()
{
  cocos2d::ui::Layout::onExit();
}

/**
 *
 *
 *
 */
void StoreLayout::updateTextData()
{
  int counter = 0;

  for(auto item : this->items)
  {
    switch(item->state)
    {
      case Item::STATE_NORMAL:
      case Item::STATE_SELECTED:
      counter++;
      break;
    }
  }

  this->texts.description->data(counter, this->items.size());
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
StoreLayoutCharacters::StoreLayoutCharacters()
{
  this->items = Store::getInstance()->items.characters;

  this->holder = new Entity("holder-background-2.png", this, true);

  this->texts.title1 = new Text("store-title-1", this, true);
  this->texts.title2 = new Text("store-action-1", this, true);
  this->texts.description = new Text("store-description-1", this->holder, true);

  this->holder->setPosition(Application->getCenter().x, Application->getHeight() - 400);

  this->texts.title1->setPosition(Application->getCenter().x, Application->getHeight() - 100);
  this->texts.title2->setPosition(Application->getCenter().x, Application->getHeight() - 170);
  this->texts.description->setPosition(this->holder->getContentSize().width / 2, this->holder->getContentSize().height / 2);

  this->updateItems();
}

StoreLayoutCharacters::~StoreLayoutCharacters()
{
}

/**
 *
 *
 *
 */
void StoreLayoutCharacters::onEnter()
{
  StoreLayout::onEnter();
}

void StoreLayoutCharacters::onExit()
{
  StoreLayout::onExit();
}

/**
 *
 *
 *
 */
void StoreLayoutCharacters::updateItems()
{
  bool position = false;

  float x = 0;
  float y = 0;

  for(auto element : this->items)
  {
    element->setPosition(Application->getCenter().x + (160) * (position ? 1 : -1), y);

    this->scroll->addChild(element);

    position = !position;

    if(!position)
    {
      y -= 220;
    }
  }

  this->updateListHeight();
}

void StoreLayoutCharacters::updateListHeight()
{
  int size = max(Application->getHeight() - 400.0f, 400.0f + (this->items.size() - 1) / 2.0f * 220.0f);

  this->scroll->setInnerContainerSize(
    Size(
      Application->getWidth(),
      size
    )
  );

  for(auto element : this->scroll->getChildren())
  {
    element->setPositionY(element->getPositionY() + size - 200);
  }
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
StoreLayoutCreatures::StoreLayoutCreatures()
{
  this->items = Store::getInstance()->items.creatures;

  this->holder = new Entity("holder-background-3.png", this, true);

  this->texts.title1 = new Text("store-title-2", this, true);
  this->texts.title2 = new Text("store-action-2", this, true);
  this->texts.description = new Text("store-description-2", this->holder, true);

  this->holder->setPosition(Application->getCenter().x, Application->getHeight() - 400);

  this->texts.title1->setPosition(Application->getCenter().x, Application->getHeight() - 100);
  this->texts.title2->setPosition(Application->getCenter().x, Application->getHeight() - 170);
  this->texts.description->setPosition(this->holder->getContentSize().width / 2, this->holder->getContentSize().height / 2);

  this->updateItems();
}

StoreLayoutCreatures::~StoreLayoutCreatures()
{
}

/**
 *
 *
 *
 */
void StoreLayoutCreatures::onEnter()
{
  StoreLayout::onEnter();
}

void StoreLayoutCreatures::onExit()
{
  StoreLayout::onExit();
}

/**
 *
 *
 *
 */
void StoreLayoutCreatures::updateItems()
{
  bool position = false;

  float x = 0;
  float y = 0;

  for(auto element : this->items)
  {
    element->setPosition(Application->getCenter().x + (160) * (position ? 1 : -1), y);

    this->scroll->addChild(element);

    position = !position;

    if(!position)
    {
      y -= 320;
    }
  }

  this->updateListHeight();
}

void StoreLayoutCreatures::updateListHeight()
{
  int size = max(Application->getHeight() - 400.0f, 400.0f + (this->items.size() - 1) / 2.0f * 220.0f);

  this->scroll->setInnerContainerSize(
    Size(
      Application->getWidth(),
      size
    )
  );

  for(auto element : this->scroll->getChildren())
  {
    element->setPositionY(element->getPositionY() + size - 250);
  }
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
StoreLayoutEnvironments::StoreLayoutEnvironments()
{
  this->items = Store::getInstance()->items.environments;

  this->holder = new Entity("holder-background-4.png", this, true);

  this->texts.title1 = new Text("store-title-3", this, true);
  this->texts.title2 = new Text("store-action-3", this, true);
  this->texts.description = new Text("store-description-3", this->holder, true);

  this->holder->setPosition(Application->getCenter().x, Application->getHeight() - 400);

  this->texts.title1->setPosition(Application->getCenter().x, Application->getHeight() - 100);
  this->texts.title2->setPosition(Application->getCenter().x, Application->getHeight() - 170);
  this->texts.description->setPosition(this->holder->getContentSize().width / 2, this->holder->getContentSize().height / 2);

  this->updateItems();
}

StoreLayoutEnvironments::~StoreLayoutEnvironments()
{
}

/**
 *
 *
 *
 */
void StoreLayoutEnvironments::onEnter()
{
  StoreLayout::onEnter();
}

void StoreLayoutEnvironments::onExit()
{
  StoreLayout::onExit();
}

/**
 *
 *
 *
 */
void StoreLayoutEnvironments::updateItems()
{
  float x = 0;
  float y = 0;

  for(auto element : this->items)
  {
    element->setPosition(Application->getCenter().x, y);

    this->scroll->addChild(element);

    y -= 220;
  }

  this->updateListHeight();
}

void StoreLayoutEnvironments::updateListHeight()
{
  int size = max(Application->getHeight() - 400.0f, 400.0f + (this->items.size() - 1) / 2.0f * 220.0f);

  this->scroll->setInnerContainerSize(
    Size(
      Application->getWidth(),
      size
    )
  );

  for(auto element : this->scroll->getChildren())
  {
    element->setPositionY(element->getPositionY() + size - 200);
  }
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
StoreLayoutCoins::StoreLayoutCoins()
{
  this->texts.title1 = new Text("store-title-4", this, true);
  this->texts.title2 = new Text("store-action-4", this, true);

  this->texts.title1->setPosition(Application->getCenter().x, Application->getHeight() - 100);
  this->texts.title2->setPosition(Application->getCenter().x, Application->getHeight() - 170);

  auto item1 = new ItemCoins;
  auto item2 = new ItemCoins;
  auto item3 = new ItemCoins;

  item1->id = "com.ketchapp.exodusgame.coins.200";
  item2->id = "com.ketchapp.exodusgame.coins.500";
  item3->id = "com.ketchapp.exodusgame.coins.1000";

  item1->i = 1;
  item2->i = 2;
  item3->i = 3;

  item1->setState(Item::STATE_NORMAL);
  item2->setState(Item::STATE_NORMAL);
  item3->setState(Item::STATE_NORMAL);

  item1->setPicture(new Entity("store-coins-background-1.png", item1));
  item2->setPicture(new Entity("store-coins-background-2.png", item2));
  item3->setPicture(new Entity("store-coins-background-3.png", item3));

  this->items.push_back(item1);
  this->items.push_back(item2);
  this->items.push_back(item3);

  this->updateItems();
}

StoreLayoutCoins::~StoreLayoutCoins()
{
}

/**
 *
 *
 *
 */
void StoreLayoutCoins::updateItems()
{
  float x = 0;
  float y = 0;

  for(auto element : this->items)
  {
    element->setPosition(Application->getCenter().x, y);

    this->scroll->addChild(element);

    y -= 220;
  }

  this->updateListHeight();
}

void StoreLayoutCoins::updateListHeight()
{
  int size = max(Application->getHeight() - 400.0f, 400.0f + (this->items.size() - 1) / 2.0f * 220.0f);

  this->scroll->setInnerContainerSize(
    Size(
      Application->getWidth(),
      size
    )
  );

  for(auto element : this->scroll->getChildren())
  {
    element->setPositionY(element->getPositionY() + size - 200);
  }
}

/**
 *
 *
 *
 */
void StoreLayoutCoins::updateTextData()
{
}
