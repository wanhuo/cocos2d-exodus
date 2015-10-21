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

#ifndef _GAME_H_
#define _GAME_H_

#include "Entity.h"
#include "TiledEntity.h"
#include "AnimatedEntity.h"
#include "Button.h"
#include "Background.h"
#include "BackgroundColor.h"
#include "Screen.h"
#include "ParallaxPool.h"
#include "Shake.h"

#include "AnimatedButton.h"
#include "Creatures.h"
#include "Human.h"
#include "Counter.h"
#include "FinishCounter.h"
#include "Character.h"
#include "Explanation.h"
#include "Fish.h"
#include "Name.h"
#include "Water.h"
#include "Rocket.h"
#include "Pointer.h"

#include "Environment.h"

#include "Positions.h"

/**
 *
 *
 *
 */
#define Application Game::getInstance()

/**
 *
 *
 *
 */
class Game : public Screen
{
  /**
   *
   *
   *
   */
  private:
  static Game* instance;

  struct CameraStruct {
    float x = 0;
    float y = 0;
    float width = Director::getInstance()->getWinSize().width;
    float height = Director::getInstance()->getWinSize().height;
    float center = 450;
  };

  struct Buttons {
    Button* play;
    Button* rate;
    Button* leaderboards;
    Button* achievements;
    Button* sound;
    Button* store;
    Button* credits;
    Button* noad;
  };

  struct Parameters {
    bool ad = Storage::get("state.ad.disabled");
    bool creatures = true;
    bool tutorial;
  };

  /**
   *
   *
   *
   */
  public:
  static Game* getInstance();

  Game();
 ~Game();

  const static int STATE_NONE = 0;
  const static int STATE_MENU = 1;
  const static int STATE_ANIMATION = 2;
  const static int STATE_PREPARE = 3;
  const static int STATE_START = 4;
  const static int STATE_GAME = 5;
  const static int STATE_LOSE = 6;
  const static int STATE_FINISH = 7;

  static float SCALE_MAX;
  static float SCALE_MIN;

  const static int POSITION_MAX = 2560;
  const static int POSITION_MIN = 450;

  const static int DECORATIONS_POSITION_MAX = 0;
  const static int DECORATIONS_POSITION_MIN = -1280 * (4 - 1);
  const static int DECORATIONS_POSITION_RATIO = 3;

  const static int MAX_OFFSET_X = 8;
  const static int MAX_OFFSET_Y = 0;

  int state = 0;

  CameraStruct camera;
  Parameters parameters;

  Buttons buttons;

  Background* h;
  Background* d;
  Background* s;
  Background* b;
  Background* w;
  Background* g;
  Background* e;
  Background* c;

  Background* game;
  Background* menu;

  Name* name;
  Counter* counter;

  Character* character;

  Environment* environment;

  const Positions* positions = new Positions;

  virtual void onTouchStart(cocos2d::Touch* touch, Event* event);

  virtual void onEnter();
  virtual void onExit();

  virtual void onPlay();
  virtual void onRate();
  virtual void onLike();
  virtual void onShare();
  virtual void onScores();
  virtual void onAchievements();
  virtual void onSound();
  virtual void onStore();
  virtual void onCredits();
  virtual void onNoad();
  virtual void onTwitter();
  virtual void onFacebook();
  virtual void onMail();
  virtual void onRestorePurchases();

  virtual void onMenu();
  virtual void onAnimation();
  virtual void onPrepare();
  virtual void onStart();
  virtual void onGame();
  virtual void onLose();
  virtual void onFinish();

  virtual void changeState(int state);

  virtual void updateSoundState();

  virtual void updateCamera(float time = 0);

  virtual void updateMenu(float time);
  virtual void updateAnimation(float time);
  virtual void updatePrepare(float time);
  virtual void updateStart(float time);
  virtual void updateGame(float time);
  virtual void updateLose(float time);
  virtual void updateFinish(float time);

  virtual void updateStates(float time);
  virtual void update(float time);
};

#endif