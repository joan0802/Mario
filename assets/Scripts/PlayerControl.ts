import { _decorator, Component, Node, input, Input, EventKeyboard, Vec2, AudioClip, Sprite, Vec3, RigidBody, AudioSource, RigidBody2D, AnimationManager, AnimationComponent, SpriteFrame, BoxCollider2D, size, Size, director, PhysicsSystem, Collider } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export default class PlayerControl extends Component {

    moveSpeed: number = 100;
    jumpHeight: number = 6;
    public health: number = 1;
    life: number = 5;
    isPowerUp: boolean = false;
    moveDir: number = 0;
    position: Vec2 = new Vec2(-562.537, -410.765); // initial position
    isJumping: boolean = false;
    public isDead = false;

    @property({ type: RigidBody })
    player: RigidBody2D = null;

    @property({ type: AudioClip })
    jumpAudio: AudioClip = null;

    @property({ type: AudioClip })
    dieAudio: AudioClip = null;

    @property({ type: AudioClip })
    coinAudio: AudioClip = null;

    @property({ type: AudioClip })
    powerDownAudio: AudioClip = null;

    @property({ type: AudioSource })
    audioSource: AudioSource = null;

    @property({ type: AnimationComponent })
    animation: AnimationComponent = null;

    @property({ type: SpriteFrame })
    bigMario: SpriteFrame = null;

    @property({ type: SpriteFrame })
    smallMario: SpriteFrame = null;

    @property({ type: BoxCollider2D })
    collider: BoxCollider2D = null;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        // input.on(Input.EventType.KEY_PRESSING, this.onKeyPress, this);
        this.audioSource = this.node.getComponent(AudioSource)!;
        this.player = this.node.getComponent(RigidBody2D);
        this.animation = this.node.getComponent(AnimationComponent);
        this.collider = this.node.getComponent(BoxCollider2D);

        // this.collider.offset = new Vec2(0, -4);
    }

    onKeyUp(event: EventKeyboard) {
        if (event.keyCode == 65 || event.keyCode == 68) {
            this.moveDir = 0;
            this.animation.stop();
        }
    }
    onKeyDown(event: EventKeyboard) {
        if (!this.isDead) {
            if (event.keyCode == 87) { // W
                // console.log("Jump");
                this.jump();
                if (!this.isPowerUp)
                    this.animation.play('jump');
                else
                    this.animation.play('bigJump');
            }
            else if (event.keyCode == 65) { // A
                this.moveDir = -1;
                if (!this.isPowerUp)
                    this.animation.play('run');
                else
                    this.animation.play('bigRun');
                this.node.scale.set(-1, 1, 1);
            }
            else if (event.keyCode == 68) { // D
                this.moveDir = 1;
                if (!this.isPowerUp)
                    this.animation.play('run');
                else
                    this.animation.play('bigRun');
                this.node.scale.set(1, 1, 1);
            }
        }
    }
    jump() {
        if (!this.isJumping) {
            this.player.linearVelocity = new Vec2(0, this.jumpHeight);
            this.audioSource.playOneShot(this.jumpAudio);
        }
    }
    powerUp() {
        if (!this.isPowerUp) {
            this.isPowerUp = true;
            this.scheduleOnce(() => {
                this.collider.size.height += 16;
                this.collider.offset.y -= 3.5;
                this.collider.apply();
            }, 0.5);
        }
    }
    hurt() {
        if (this.isPowerUp) {
            this.audioSource.playOneShot(this.powerDownAudio);
            this.isPowerUp = false;
            this.node.getComponent(Sprite).spriteFrame = this.smallMario;
            this.scheduleOnce(() => {
                this.collider.size.height -= 16;
                this.collider.offset.y = 0;
                this.collider.apply();
            }, 0.5);
        }
        else {
            this.die();
        }
    }
    die() {
        this.isDead = true;
        this.audioSource.playOneShot(this.dieAudio);
        this.scheduleOnce(() => {
            this.node.position = new Vec3(-562.537, -410.765, 0);
        }, 2);
        this.scheduleOnce(() => {
            this.isDead = false;
            this.moveDir = 0;
            this.isPowerUp = false;
            this.scheduleOnce(() => {
                this.collider.size.height = 16;
                this.collider.offset.y = 0;
                this.collider.apply();
            }, 0.5);
            this.node.getComponent(Sprite).spriteFrame = this.smallMario;
        }, 2);
    }
    update(dt) {
        // console.log(this.collider);
        // console.log(this.node.position.x);
        if (this.isPowerUp) {
            this.collider.offset = new Vec2(0, 8);
        }
        if (!this.isDead) {
            this.node.position = this.node.position.add(new Vec3(this.moveSpeed * this.moveDir * dt, 0, 0));
            if (this.player.linearVelocity.y != 0)
                this.isJumping = true;
            else
                this.isJumping = false;
        }
        else {
            this.node.position = new Vec3(-562.537, -410.765, 0);
        }
    }
}

