import { _decorator, AudioClip, AudioSource, Collider, Component, find, Node, RigidBody, BoxCollider2D, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: AudioClip })
    coinAudio: AudioClip = null!;

    @property({ type: AudioSource })
    audioSource: AudioSource = null!;

    @property({ type: Node })
    coins: Node[] = [];

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
    }

    update(deltaTime: number) {

    }
}

