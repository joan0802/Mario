import { _decorator, AudioClip, AudioSource, Collider, Component, find, Vec3, Vec2, tween, RigidBody2D, Node, RigidBody, BoxCollider2D, Contact2DType, EditBox, Label, Sprite, SpriteFrame, IPhysics2DContact, Prefab, instantiate, director } from 'cc';
import PlayerControl from './PlayerControl';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export default class GameManager extends Component {

    public life: number = 5;
    score: number = 0;
    time: number = 300;

    /* Audio Clip */

    @property({ type: AudioClip })
    coinAudio: AudioClip = null!;

    @property({ type: AudioClip })
    dieAudio: AudioClip = null!;

    @property({ type: AudioClip })
    gameOverAudio: AudioClip = null!;

    @property({ type: AudioClip })
    powerUpAppearAudio: AudioClip = null!;

    @property({ type: AudioClip })
    powerUpAudio: AudioClip = null!;

    @property({ type: AudioClip })
    levelClearAudio: AudioClip = null!;

    @property({ type: AudioSource })
    audioSource: AudioSource = null!;

    /* Set of Nodes */

    @property({ type: Node })
    coins: Node[] = [];

    @property({ type: Node })
    questions: Node[] = [];

    @property({ type: Node })
    end: Node = null!;

    /* World NavBar */

    @property({ type: Label })
    health: Label = null!;

    @property({ type: Label })
    scoreLabel: Label = null!;

    @property({ type: Label })
    timeLabel: Label = null!;

    /* Others */

    @property({ type: BoxCollider2D })
    floorBound: BoxCollider2D = null!;

    @property({ type: Node })
    player: Node = null!;

    @property({ type: SpriteFrame })
    questionDisabled: SpriteFrame = null!;

    @property({ type: Prefab })
    mushroom: Prefab = null!;

    onLoad() {
        this.resetInEditor();
    }

    start() {
        this.audioSource = this.node.getComponent(AudioSource)!;
        this.coins = find('Canvas/game-bg/TiledMap/Coins')!.children;
        this.questions = find('Canvas/game-bg/TiledMap/Questions')!.children;
        this.end = find('Canvas/game-bg/TiledMap/End');

        const endCollider = this.end.getComponent(BoxCollider2D);
        if (endCollider) {
            endCollider.on(Contact2DType.BEGIN_CONTACT, (self: BoxCollider2D, other: BoxCollider2D, contact: null) => {
                if (other.node.name == 'player') {
                    this.win();
                }
            });
        }
        for (let coin of this.coins) {
            const coinCollider = coin.getComponent(BoxCollider2D);
            if (coinCollider) {
                coinCollider.on(Contact2DType.BEGIN_CONTACT, (self: BoxCollider2D, other: BoxCollider2D, contact: IPhysics2DContact) => {
                    let normal = contact.getWorldManifold().normal;
                    if(contact.colliderA.node === self.node) {
                        normal = new Vec2(-normal.x, -normal.y);
                    }
                    if (other.node.name == 'player') {
                        this.audioSource.playOneShot(this.coinAudio);
                        self.enabled = false;
                        this.score += 100;
                        coin.getComponent(Component).scheduleOnce(() => {
                            coin.active = false;
                        }, 0.1);
                        console.log('coin collected');
                    }
                });
            }
            else {
                console.log('coinCollider is null');
            }
        }

        for (let question of this.questions) {
            const questionCollider = question.getComponent(BoxCollider2D);
            if (questionCollider) {
                console.log('questionCollider is not null');
                questionCollider.on(Contact2DType.BEGIN_CONTACT, (self: BoxCollider2D, other: BoxCollider2D, contact: IPhysics2DContact) => {
                    let normal = contact.getWorldManifold().normal;
                    if(contact.colliderA.node === self.node) {
                        normal = new Vec2(-normal.x, -normal.y);
                    }
                    console.log("question normal: ", normal.y);
                    if (other.node.name == 'player' && normal.y == 1 && question.getComponent(Sprite).spriteFrame != this.questionDisabled) {
                        this.score += 100;
                        question.getComponent(Component).scheduleOnce(() => {
                            question.getComponent(Sprite).spriteFrame = this.questionDisabled;
                            const mushroom = instantiate(this.mushroom);
                            mushroom.position = new Vec3(question.position.x, question.position.y + 16, 0);
                            mushroom.getComponent(RigidBody2D).linearVelocity = new Vec2(-2, 0);
                            this.schedule(() => {
                                mushroom.getComponent(RigidBody2D).linearVelocity = new Vec2(-2, mushroom.getComponent(RigidBody2D).linearVelocity.y);
                            }, 0.1);
                            find('Canvas/game-bg/TiledMap').addChild(mushroom);

                            const mushroomCollider = mushroom.getComponent(BoxCollider2D);
                            if (mushroomCollider) {
                                mushroomCollider.on(Contact2DType.BEGIN_CONTACT, (self: BoxCollider2D, other: BoxCollider2D, contact: null) => {
                                    if (other.node.name == 'player') {
                                        this.audioSource.playOneShot(this.powerUpAudio);
                                        self.enabled = false;
                                        this.score += 200;
                                        this.player.getComponent(PlayerControl)!.powerUp();
                                        mushroom.getComponent(Component).scheduleOnce(() => {
                                            mushroom.active = false;
                                        }, 0.1);
                                        console.log('mushroom collected');
                                    }
                                });
                            }
                            else {
                                console.log('mushroomCollider is null');
                            }

                            this.audioSource.playOneShot(this.powerUpAppearAudio);
                        }, 0.1);
                        console.log('question collected');
                    }
                });
            }
            else {
                console.log('questionCollider is null');
            }
        }

        this.floorBound.on(Contact2DType.BEGIN_CONTACT, (self: BoxCollider2D, other: BoxCollider2D, contact: null) => {
            if (other.node.name == 'player') {
                console.log('player hit the floor');
                this.life--;
                this.health.string = this.life.toString();
                if (this.life == 0) {
                    this.scheduleOnce(() => {
                        const currentScene = director.getScene();
                        if (currentScene) {
                            currentScene.walk(node => {
                                const components = node.getComponentsInChildren(Component);
                                components.forEach(component => {
                                    component.unscheduleAllCallbacks();
                                    component.destroy();
                                });
                            });
                        }
                        director.loadScene('gameOver');
                    }, 0.5);
                }
                else {
                    this.player.getComponent(PlayerControl)!.die();
                }
                // this.audioSource.playOneShot(this.dieAudio);
            }
        });
    }

    win() {
        this.audioSource.playOneShot(this.levelClearAudio);
        this.scheduleOnce(() => {
            director.loadScene('stageSelect')
            const user = firebase.auth().currentUser;
            const userRef = firebase.database().ref('users/' + user.uid);
            userRef.once('value', (snapshot) => {
                const userData = snapshot.val();
                const updateScore = this.score > userData.score ? this.score : userData.score;

                userRef.set({
                    ...userData,
                    score: updateScore
                });
            });
        }, 2);
    }
    loseOneLife() {
        this.life--;
        if (this.life == 0) {
            this.scheduleOnce(() => {
                const currentScene = director.getScene();
                if (currentScene) {
                    currentScene.walk(node => {
                        const components = node.getComponentsInChildren(Component);
                        components.forEach(component => {
                            component.unscheduleAllCallbacks();
                            component.destroy();
                        });
                    });
                }
                director.loadScene('gameOver');
            }, 0.5);
        }
    }

    update(deltaTime: number) {
        this.scoreLabel.string = this.score.toString();
        this.time -= deltaTime;
        this.timeLabel.string = this.time.toFixed(0).toString();
        this.health.string = this.life.toString();
    }
}

