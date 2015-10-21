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

/**
 *
 *
 *
 */
Counter::Counter()
: Entity("counter.png", Application->b)
{
  this->circles = new Pool(new Entity("counter.png"), this, true);

  this->coins = new Entity("counter-coins.png", Application->e, true);
  this->coins->setPosition(Application->width + this->coins->getWidth() / 2, Application->height - 50);

  this->texts.value = new Text("counter", this, true);
  this->texts.best = new Text("best", Application->b);
  this->texts.taps = new Text("jumps", Application->b);
  this->texts.deaths = new Text("deaths", Application->b);
  this->texts.start = new Text("start", Application->b);
  this->texts.status = new Text("fail", Application->b);
  this->texts.coins = new Text("coins", this->coins, true);
  this->texts.decoration = new Text("decoration-0", Application->b);

  this->texts.value->setPosition(this->getWidth() / 2, this->getHeight() / 2);
  this->texts.coins->setPosition(this->coins->getWidth() / 2, this->coins->getHeight() / 2);
  this->texts.best->setPosition(Application->center.x, Application->height - 150 + 300);
  this->texts.taps->setPosition(Application->center.x, Application->height - 190 + 300);
  this->texts.deaths->setPosition(Application->center.x, Application->height - 230 + 300);

  this->circles->setLocalZOrder(-1);

  this->texts.status->setLocalZOrder(-2);
  this->texts.decoration->setLocalZOrder(-2);

  this->setScheduleUpdate(true);
}

Counter::~Counter()
{
}

/**
 *
 *
 *
 */
void Counter::onEnter()
{
  Entity::onEnter();

  /**
   *
   *
   *
   */
  this->reset();
}

void Counter::onExit()
{
  Entity::onExit();
}

/**
 *
 *
 *
 */
void Counter::onCreate()
{
  Entity::onCreate();

  /**
   *
   *
   *
   */
  this->circles->clear();

  this->setScale(0);
  this->setPosition(Application->center.x, Application->height - 410);

  this->runAction(
    EaseSineInOut::create(
      ScaleTo::create(0.5, 1.0)
    )
  );

  this->texts.best->_create()->runAction(
    Sequence::create(
      DelayTime::create(0),
      EaseSineInOut::create(
        MoveTo::create(0.2, Vec2(
          this->texts.best->getPositionX(),
          this->texts.best->getPositionY() - 300
        ))
      ),
      nullptr
    )
  );
  this->texts.taps->_create()->runAction(
    Sequence::create(
      DelayTime::create(0.2),
      EaseSineInOut::create(
        MoveTo::create(0.2, Vec2(
          this->texts.taps->getPositionX(),
          this->texts.taps->getPositionY() - 300
        ))
      ),
      nullptr
    )
  );
  this->texts.deaths->_create()->runAction(
    Sequence::create(
      DelayTime::create(0.4),
      EaseSineInOut::create(
        MoveTo::create(0.2, Vec2(
          this->texts.deaths->getPositionX(),
          this->texts.deaths->getPositionY() - 300
        ))
      ),
      nullptr
    )
  );

  this->updateTextData();
}

void Counter::onDestroy(bool action)
{
  Entity::onDestroy(action);
}

/**
 *
 *
 *
 */
void Counter::onScore(bool update)
{
  if(update)
  {
    auto element = this->circles->_create();

    element->setPositionX(this->getWidth() / 2);
    element->setPositionY(this->getHeight() / 2);

    element->setOpacity(255);
    element->setScale(1.0);

    element->runAction(
      Spawn::create(
        FadeOut::create(0.3),
        Sequence::create(
          ScaleTo::create(0.3, 1.7),
          CallFunc::create(CC_CALLBACK_0(Node::_destroy, element, true)),
          nullptr
        ),
        nullptr
      )
    );

    this->updateTextData();
  }
  else
  {
    this->values.score++;
  }
}

void Counter::onCoin(bool update)
{
  if(update)
  {
    this->updateTextData();
  }
  else
  {
    this->values.coins++;
  }
}

void Counter::onTap()
{
  this->values.taps++;
}

void Counter::onDeath()
{
  this->values.deaths++;
}

/**
 *
 *
 *
 */
void Counter::onSuccess()
{
  if(Application->character->getPositionY() >= 2000 && probably(30))
  {
    if(this->texts.decoration->getNumberOfRunningActions() < 1)
    {
      this->texts.decoration->setText("decoration-" + patch::to_string(random(0, 1)));

      this->texts.decoration->_create();
      this->texts.decoration->setPosition(Application->center.x, this->getPositionY() - 190);
      this->texts.decoration->setScale(0);
      this->texts.decoration->setOpacity(255);
      this->texts.decoration->runAction(
        Sequence::create(
          EaseSineOut::create(
            ScaleTo::create(0.2, 1.0)
          ),
          DelayTime::create(1.5),
          FadeOut::create(0.2),
          CallFunc::create(CC_CALLBACK_0(Node::_destroy, this->texts.decoration, true)),
          nullptr
        )
      );
    }
  }

  Sound->play("");
}

void Counter::onMistake()
{
  this->texts.status->stopAllActions();

  this->texts.status->setText("mistake");

  this->texts.status->_create();
  this->texts.status->setPosition(Application->center.x, this->getPositionY() - 250);
  this->texts.status->setScale(0);
  this->texts.status->setOpacity(255);
  this->texts.status->runAction(
    Sequence::create(
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      DelayTime::create(1.5),
      FadeOut::create(0.2),
      CallFunc::create(CC_CALLBACK_0(Node::_destroy, this->texts.status, true)),
      nullptr
    )
  );

  Sound->play("");
}

void Counter::onFail()
{
  this->texts.status->stopAllActions();

  this->texts.status->setText("fail");

  this->texts.status->_create();
  this->texts.status->setPosition(Application->center.x, this->getPositionY() - 250);
  this->texts.status->setScale(0);
  this->texts.status->setOpacity(255);
  this->texts.status->runAction(
    Sequence::create(
      EaseSineOut::create(
        ScaleTo::create(0.2, 1.0)
      ),
      DelayTime::create(1.5),
      FadeOut::create(0.2),
      CallFunc::create(CC_CALLBACK_0(Node::_destroy, this->texts.status, true)),
      nullptr
    )
  );

  Sound->play("");
}

/**
 *
 *
 *
 */
void Counter::onMenu()
{
}

void Counter::onAnimation()
{
  this->_create();
}

void Counter::onPrepare()
{
  this->reset();
}

void Counter::onStart()
{
  /**
   *
   * @Optional
   * Can be commented because of using animated hand texture.
   *
  */
  this->texts.start->_create();
  this->texts.start->setPosition(Application->center.x, this->getPositionY() - 180);
  this->texts.start->setOpacity(0);
  this->texts.start->runAction(
    FadeIn::create(1.0)
  );
}

void Counter::onGame()
{
  this->texts.start->runAction(
    Sequence::create(
      FadeOut::create(0.2),
      CallFunc::create(CC_CALLBACK_0(Text::_destroy, this->texts.start, true)),
      nullptr
    )
  );
}

void Counter::onLose()
{
}

/**
 *
 *
 *
 */
void Counter::save()
{
}

void Counter::reset()
{
  this->values.score = 0;
  this->updateTextData();

  this->texts.status->stopAllActions();
  this->texts.status->_destroy(true);
}

/**
 *
 *
 *
 */
void Counter::updateTextData()
{
  this->texts.value->data(this->values.score);
  this->texts.best->data(this->values.best);
  this->texts.coins->data(this->values.coins);
  this->texts.taps->data(this->values.taps);
  this->texts.deaths->data(this->values.deaths);
}

/**
 *
 *
 *
 */
void Counter::update(float time)
{
  Application->e->setPositionY(-Application->b->getPositionY());
  this->coins->setPositionX(Application->width - (Application->b->getPositionY() - this->coins->getWidth() / 2) + 30);
}
