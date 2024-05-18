import { _decorator, AudioClip, AudioSource, Collider, Component, find, Node, RigidBody, BoxCollider2D, Contact2DType, EditBox, Label } from 'cc';
import PlayerControl from './PlayerControl';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    life: number = 5;
    score: number = 0;
    time: number = 300;

    @property({ type: AudioClip })
    coinAudio: AudioClip = null!;

    @property({ type: AudioClip })
    dieAudio: AudioClip = null!;

    @property({ type: AudioSource })
    audioSource: AudioSource = null!;

    @property({ type: Node })
    coins: Node[] = [];

    @property({ type: Label })
    health: Label = null!;

    @property({ type: BoxCollider2D})
    floorBound: BoxCollider2D = null!;

    @property({ type: Node })
    player: Node = null!;

    @property({ type: Label })
    scoreLabel: Label = null!;

    @property({ type: Label })
    timeLabel: Label = null!;

    start() {
        this.audioSource = this.node.getComponent(AudioSource)!;
        this.coins = find('Canvas/game-bg/TiledMap/Coins')!.children;

        for (let coin of this.coins) {
            const coinCollider = coin.getComponent(BoxCollider2D);
            if (coinCollider) {
                coinCollider.on(Contact2DType.BEGIN_CONTACT, (self: BoxCollider2D, other: BoxCollider2D, contact: null) => {
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

        this.floorBound.on(Contact2DType.BEGIN_CONTACT, (self: BoxCollider2D, other: BoxCollider2D, contact: null) => {
            if (other.node.name == 'player') {
                console.log('player hit the floor');
                this.player.getComponent(PlayerControl)!.isDead = true;
                this.life--;
                this.health.string = this.life.toString();
                this.audioSource.playOneShot(this.dieAudio);
            }
        });
    }

    update(deltaTime: number) {
        this.scoreLabel.string = this.score.toString();
        this.time -= deltaTime;
        this.timeLabel.string = this.time.toFixed(0).toString();
    }
}

