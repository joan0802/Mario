import { _decorator, Component, Node, input, Input, EventKeyboard, Vec2, AudioClip, Vec3, RigidBody, AudioSource, RigidBody2D, AnimationManager, AnimationComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {

    moveSpeed: number = 100;
    jumpHeight: number = 6;
    health: number = 1;
    life: number = 5;
    moveDir: number = 0;
    position: Vec2 = new Vec2(-562.537, -410.765); // initial position
    isJumping: boolean = false;

    @property({ type: RigidBody })
    player: RigidBody2D = null;

    @property({ type: AudioClip })
    jumpAudio: AudioClip = null;

    @property({ type: AudioClip })
    dieAudio: AudioClip = null;

    @property({ type: AudioClip })
    coinAudio: AudioClip = null;

    @property({ type: AudioSource })
    audioSource: AudioSource = null;

    @property({ type: AnimationComponent })
    animation: AnimationComponent = null;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        this.audioSource = this.node.getComponent(AudioSource)!;
        this.player = this.node.getComponent(RigidBody2D);
        this.animation = this.node.getComponent(AnimationComponent);
        // console.log(this.player);
    }

    onKeyUp(event: EventKeyboard) {
        if (event.keyCode == 65 || event.keyCode == 68)
            this.moveDir = 0;
        this.animation.stop();
    }
    onKeyDown(event: EventKeyboard) {
        if (event.keyCode == 87) { // W
            // console.log("Jump");
            this.jump();
            this.animation.play('jump');
        }
        else if (event.keyCode == 65) { // A
            this.moveDir = -1;
            this.animation.play('run');
            this.node.scale.set(-1, 1, 1);
        }
        else if (event.keyCode == 68) { // D
            this.moveDir = 1;
            this.animation.play('run');
            this.node.scale.set(1, 1, 1);
        }
        // else {
        //     this.moveDir = 0;
        // }
    }
    jump() {
        if (!this.isJumping) {
            this.player.linearVelocity = new Vec2(0, this.jumpHeight);
            this.audioSource.playOneShot(this.jumpAudio);
        }
    }
    update(dt) {
        this.node.position = this.node.position.add(new Vec3(this.moveSpeed * this.moveDir * dt, 0, 0));
        if (this.player.linearVelocity.y != 0)
            this.isJumping = true;
        else
            this.isJumping = false;
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        if(otherCollider.node.parent.name == 'Coins') {
            this.audioSource.playOneShot(this.coinAudio);
            otherCollider.node.destroy();
        }
    }
}

