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

#ifndef _GAME_H_
#define _GAME_H_

#include "Entity.h"
#include "TiledEntity.h"
#include "AnimatedEntity.h"
#include "Entity3D.h"
#include "Button.h"
#include "Background.h"
#include "BackgroundColor.h"
#include "Screen.h"
#include "ParallaxPool.h"
#include "Shake.h"
#include "Motion.h"

#include "AnimatedButton.h"
#include "Creatures.h"
#include "Human.h"
#include "Apatosaurus.h"
#include "Stegosaurus.h"
#include "Triceratops.h"
#include "Counter.h"
#include "FinishCounter.h"
#include "Character.h"
#include "Explanation.h"
#include "Fish.h"
#include "Name.h"
#include "Water.h"
#include "Rocket.h"
#include "Pointer.h"
#include "Missile.h"
#include "Handler.h"
#include "Water.h"
#include "Coin.h"

#include "Environment.h"

/**
 *
 *
 *
 */
#define SERVICES_LEADERBOARD_BEST_SCORE 0
#define SERVICES_LEADERBOARD_TAPS_COUNT 1
#define SERVICES_LEADERBOARD_GAMES_PLAYED 2

#define SERVICES_ACHIEVEMENTS_REACH_POINTS_1 0
#define SERVICES_ACHIEVEMENTS_REACH_POINTS_10 1
#define SERVICES_ACHIEVEMENTS_REACH_POINTS_50 2
#define SERVICES_ACHIEVEMENTS_REACH_POINTS_100 3
#define SERVICES_ACHIEVEMENTS_REACH_POINTS_500 4

#define SERVICES_ACHIEVEMENTS_UNLOCK_CHARACTERS_5 5
#define SERVICES_ACHIEVEMENTS_UNLOCK_CHARACTERS_10 6
#define SERVICES_ACHIEVEMENTS_UNLOCK_CHARACTERS_15 7
#define SERVICES_ACHIEVEMENTS_UNLOCK_CHARACTERS_20 8
#define SERVICES_ACHIEVEMENTS_UNLOCK_CHARACTERS_25 9

#define SERVICES_ACHIEVEMENTS_GAMES_PLAYED_1 10
#define SERVICES_ACHIEVEMENTS_GAMES_PLAYED_10 11
#define SERVICES_ACHIEVEMENTS_GAMES_PLAYED_20 12
#define SERVICES_ACHIEVEMENTS_GAMES_PLAYED_50 13
#define SERVICES_ACHIEVEMENTS_GAMES_PLAYED_100 14

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
    Button* missions;
    Button* tutorial;
  };

  struct Parameters {
    bool ad = Storage::get("state.ad.disabled");
    bool tutorial = Storage::get("state.tutorial.disabled");
    bool creatures = true;
  };

  /**
   *
   *
   *
   */
  protected:
  int environment_index = -1;

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
  Background* v;

  BackgroundColor* transfer;

  Background* game;
  Background* menu;

  ParallaxPool* water1;
  ParallaxPool* water2;
  ParallaxPool* water3;

  Name* name;
  Counter* counter;

  Character* character;

  Environment* environment;

  Pool* pointers;
  Pool* pointers2;

  Pool* pickups;

  Motion* bonus;

  AnimatedEntity* hand;

  Creatures* creatures;

  vector<Environment*> environments;

  virtual bool isNextEnvironment();

  virtual void resetEnvironment();
  virtual void nextEnvironment();
  virtual void setEnvironment(int index);

  virtual void onTouchStart(cocos2d::Touch* touch, Event* event);

  virtual bool onSwipe();

  virtual void onSwipeUp();
  virtual void onSwipeDown();
  virtual void onSwipeLeft();
  virtual void onSwipeRight();

  virtual void onEnter();
  virtual void onExit();

  virtual void onBack();

  virtual void onPlay();
  virtual void onRate();
  virtual void onLike();
  virtual void onShare();
  virtual void onScores();
  virtual void onAchievements();
  virtual void onSound();
  virtual void onStore();
  virtual void onMissions();
  virtual void onTutorial();
  virtual void onCredits();
  virtual void onNoad();
  virtual void onNoadAction();
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
  virtual void updateState();

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
