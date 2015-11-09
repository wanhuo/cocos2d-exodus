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

#include "Store.h"
#include "Game.h"

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
{
  instance = this;

  this->camera = Camera::createPerspective(60, this->width / this->height, 1.0f, 10000.0f);
  this->camera->setCameraFlag(CameraFlag::USER1);
  this->addChild(this->camera);

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
    auto item = new ItemCharacter;
    item->id = Json_getString(characterJsonData, "id", "");
    item->missions = Json_getInt(characterJsonData, "missions", 0);
    item->coins = Json_getInt(characterJsonData, "coins", 0);
    item->state = Storage::get(item->id);

    if(!item->state)
    {
      if(item->missions)
      {
        item->setState(Item::STATE_LOCKED_MISSIONS);
      }
      else if(item->coins)
      {
        item->setState(Item::STATE_LOCKED_COINS);
      }
    }

    this->items.characters.push_back(item);
  }

  /**
   *
   *
   *
   */
  for(auto creatureJsonData = creaturesJsonData->child; creatureJsonData; creatureJsonData = creatureJsonData->next)
  {
    this->items.creatures.push_back(new ItemCreature);
  }

  /**
   *
   *
   *
   */
  for(auto environmentJsonData = environmentsJsonData->child; environmentJsonData; environmentJsonData = environmentJsonData->next)
  {
    this->items.environments.push_back(new ItemEnvironment);
  }

  /**
   *
   *
   *
   */
  this->coins = new Pool(new Coin, 30, this);

  this->background = new BackgroundColor(this, Color4B(235, 255, 255, 255));
  this->holder = new BackgroundColor(this, Color4B(132, 209, 223, 255));

  this->holder->setContentSize(Size(Application->width, 400));

  this->holder->ignoreAnchorPointForPosition(false);
  this->holder->setAnchorPoint(Vec2(0.5, 1.0));
  this->holder->setPosition(Application->center.x, Application->height);

  this->coinsBackground = new Entity("counter-coins.png", this, true);
  
  this->list = new BackgroundPages(this);
  this->list->setDirection(cocos2d::ui::PageView::Direction::HORIZONTAL);
  this->list->setContentSize(Size(Application->width, Application->height));
  this->list->setTouchEnabled(true);

  #if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
  this->buttons.back = new Button("back-button.png", 1, 2, this, std::bind(&Store::hide, this), true);
  #endif

  this->texts.coins = new Text("coins", this->coinsBackground, true);

  #if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
  this->buttons.back->setPosition(65, Application->height - 65);
  #endif

  this->coinsBackground->setPosition(Application->width - this->coinsBackground->getWidth() / 2 - 15, Application->height - 50);

  this->texts.coins->setPosition(this->coinsBackground->getContentSize().width / 2, this->coinsBackground->getContentSize().height / 2);

  this->list->insertPage(new StoreLayoutCharacters, 0);
  this->list->insertPage(new StoreLayoutCreatures, 1);
  this->list->insertPage(new StoreLayoutEnvironments, 2);
  this->list->insertPage(new StoreLayoutCoins, 3);
}

Store::~Store()
{
}

/**
 *
 *
 *
 */
void Store::onEnter()
{
  Screen::onEnter();

  /**
   *
   *
   *
   */
  this->updateTextData();

  Events::onScreenChanged("Store");
}

void Store::onExit()
{
  Screen::onExit();
}

/**
 *
 *
 *
 */
void Store::onBack()
{
  this->hide();
}

/**
 *
 *
 *
 */
void Store::show()
{
  Director::getInstance()->pushScene(TransitionFade::create(0.2, this, Color3B::WHITE));
}

void Store::hide()
{
  Director::getInstance()->popScene(TransitionFade::create(0.2, Director::getInstance()->getPreviousScene(), Color3B::WHITE));
}

/**
 *
 *
 *
 */
void Store::updateTextData()
{
  this->texts.coins->data(Application->counter->values.coins);
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
  this->setContentSize(Size(Application->width, Application->height));

  this->scroll = new BackgroundScroll(this);
  this->scroll->setDirection(cocos2d::ui::ScrollView::Direction::VERTICAL);
  this->scroll->setContentSize(Size(Application->width, Application->height - 400));
  this->scroll->setBounceEnabled(true);
  this->scroll->setTouchEnabled(true);
  this->scroll->setSwallowTouches(true);
  this->scroll->setPositionY(0);
}

StoreLayout::~StoreLayout()
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
StoreLayoutCharacters::StoreLayoutCharacters()
{
  this->items = Store::getInstance()->items.characters;

  this->holder = new Entity("holder-background-1.png", this, true);

  this->texts.title1 = new Text("store-title-1", this, true);
  this->texts.title2 = new Text("missions-title-2", this->holder, true);

  this->holder->setPosition(Application->center.x, Application->height - 400);

  this->texts.title1->setPosition(Application->center.x, Application->height - 200);
  this->texts.title2->setPosition(this->holder->getContentSize().width / 2, this->holder->getContentSize().height / 2);

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
void StoreLayoutCharacters::updateItems()
{
  bool position = false;

  float x = 0;
  float y = 0;

  for(auto element : this->items)
  {
    element->setPosition(Application->center.x + (160) * (position ? 1 : -1), y);

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
  int size = 400 + (this->items.size() - 1) / 2 * 220;

  this->scroll->setInnerContainerSize(
    Size(
      Application->width,
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
  this->holder = new Entity("holder-background-1.png", this, true);

  this->texts.title1 = new Text("store-title-2", this, true);
  this->texts.title2 = new Text("missions-title-2", this->holder, true);

  this->holder->setPosition(Application->center.x, Application->height - 400);

  this->texts.title1->setPosition(Application->center.x, Application->height - 200);
  this->texts.title2->setPosition(this->holder->getContentSize().width / 2, this->holder->getContentSize().height / 2);
}

StoreLayoutCreatures::~StoreLayoutCreatures()
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
StoreLayoutEnvironments::StoreLayoutEnvironments()
{
  this->holder = new Entity("holder-background-1.png", this, true);

  this->texts.title1 = new Text("store-title-3", this, true);
  this->texts.title2 = new Text("missions-title-2", this->holder, true);

  this->holder->setPosition(Application->center.x, Application->height - 400);

  this->texts.title1->setPosition(Application->center.x, Application->height - 200);
  this->texts.title2->setPosition(this->holder->getContentSize().width / 2, this->holder->getContentSize().height / 2);
}

StoreLayoutEnvironments::~StoreLayoutEnvironments()
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
StoreLayoutCoins::StoreLayoutCoins()
{
  this->texts.title1 = new Text("store-title-4", this, true);

  this->texts.title1->setPosition(Application->center.x, Application->height - 200);
}

StoreLayoutCoins::~StoreLayoutCoins()
{
}
