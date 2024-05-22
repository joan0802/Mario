# Software Studio 2024 Spring Assignment 2

## Student ID : 111062123 Name : 蔡杰恩

### Scoring

|**Basic Component**|**Score**|**Check**|
|:-:|:-:|:-:|
|Complete Game Process|5%|Y|
|Basic Rules|55%|Y|
|Animations|10%|Y|
|Sound Effects|10%|Y|
|UI|10%|Y|

|**Advanced Component**|**Score**|**Check**|
|:-:|:-:|:-:|
|firebase deploy|5%|Y|
|Leaderboard|5%|Y|
|Offline multi-player game|5%|N|
|Online multi-player game|10%|N|
|Others [name of functions]|1-10%|N|

---

## Basic Components Description : 
1. World map : 
   * The world map shows the correct physics properties.
   * The camera will move according to the player's position
![](https://i.imgur.com/75MsyW5.png)
1. Player : 
   * Users can use "WASD" to make Mario move or jump. 
   * When the player goes out of bounds, they will lose one life and reborn at the initial position.
   * When the player tounches enemies, they will lose one life or power down(if it is big Mario).
2. Enemies : 
    * Goomba: When the player touches it, they will get hurt. It can be killed by stepping on its head.
  
        ![](https://i.imgur.com/Z5O9dzd.png) 
3. Question Blocks : 

    ![](https://i.imgur.com/tdZzYnR.png)
    * When the player jumps and hits the question block, it will produce a super mushroom.
    ![](https://i.imgur.com/cyJB6XB.png)
    * When the player touches the mushroom, they will become big Mario.
  
        ![](https://i.imgur.com/gMFcGUb.png)
4. Animations : 
    * The player has jump and walk animations.
    * Goomba has walk and die animations.
5. Sound effects :
    * BGM: Menu and the stage have BGMs
    * Player jump & die sound effects
    * Additional sound effects:
      * Player power-up sound effect
      * Player power-down sound effect
      * Game over sound effect
      * Goomba die sound effect
      * Coin collected sound effect
6. UI : At the top of screen, the name of stage, player's lives, timer, and current score are displayed.
![](https://i.imgur.com/c68K38M.png)

## Advanced Component Description : 

1. Firebase deploy:
    This game is deployed on Firebase, and has the membership mechanism.
2. LeaderBoard:
    * Click the star button in the stage select scene to go to the leaderboard page. 
    ![](https://i.imgur.com/3kc9BH1.png)
    * The leaderboard page lists all of the players' highest scores.
    ![](https://i.imgur.com/9otqpNW.png)

# Firebase page link

   [Mario](https://mario-47ac8.web.app/)