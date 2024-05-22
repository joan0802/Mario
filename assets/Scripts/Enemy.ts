import { _decorator, Component, Node, AnimationComponent, AudioSource, find, Vec3, RigidBody2D, Vec2, Contact2DType, BoxCollider2D, IPhysics2DContact, AudioClip } from 'cc';
import PlayerControl from './PlayerControl';
import GameManager from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    goombaSpeed: number = 1;
    counter: number = 0;
    goombaDir: number = 1;

    @property({ type: AnimationComponent })
    animation: AnimationComponent = null;

    @property({ type: AudioSource })
    audioSource: AudioSource = null;

    @property({ type: AudioClip })
    goombaDieAudio: AudioClip = null;

    @property({ type: Node })
    goombas: Node[] = [];

    @property({ type: Node })
    player: Node = null;

    @property({ type: Node })
    gameManager: Node = null;

    start() {
        this.goombas = find("Canvas/game-bg/Enemies")!.children;
        this.animation = this.node.getComponent(AnimationComponent);
        this.audioSource = this.node.getComponent(AudioSource)!;

        for (let goomba of this.goombas) {
            const goombaCollider = goomba.getComponent(BoxCollider2D);
            const goombaAnimation = goomba.getComponent(AnimationComponent);
            if (goombaCollider) {
                goombaCollider.on(Contact2DType.BEGIN_CONTACT, (self: BoxCollider2D, other: BoxCollider2D, contact: IPhysics2DContact) => {
                    let normal = contact.getWorldManifold().normal;
                    if(contact.colliderA.node === self.node) {
                        console.log("swap direction");
                        normal = new Vec2(-normal.x, -normal.y);
                    }
                    if (other.node.name == "player" && !contact.disabled) {
                        if (normal.y < 0) {
                            goombaAnimation.stop();
                            goombaAnimation.play("goombaDie");
                            this.gameManager.getComponent(GameManager).score += 200;
                            this.audioSource.playOneShot(this.goombaDieAudio);
                            goomba.getComponent(Component).scheduleOnce(() => {
                                goomba.active = false;
                            }, 0.5);
                        }
                        else {
                            console.log('player hurt');
                            contact.disabled = true;
                            this.player.getComponent(PlayerControl).hurt();
                            this.gameManager.getComponent(GameManager).loseOneLife();
                            goomba.getComponent(Component).scheduleOnce(() => {
                                contact.disabled = false;
                            }, 2);
                        }
                    }
                });
            }
        }
    }

    update(deltaTime: number) {
        this.counter += deltaTime;
        for (let goomba of this.goombas) {
            goomba.getComponent(RigidBody2D).linearVelocity = new Vec2(this.goombaSpeed, 0);
            if (this.counter > 3) {
                this.goombaSpeed *= -1;
                console.log(this.goombaSpeed);
                this.counter = 0;
            }
            if (Number(this.counter.toFixed(0)) % 2 == 0) {
                this.goombaDir = 1;
                goomba.scale.set(this.goombaDir, 1, 1);
            }
            else {
                this.goombaDir = -1;
                goomba.scale.set(this.goombaDir, 1, 1);
            }
        }
    }
}

