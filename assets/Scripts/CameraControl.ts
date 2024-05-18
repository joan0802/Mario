import { _decorator, Component, Node, Camera, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraControl')
export class CameraControl extends Component {

    @property({ type: Node })
    player: Node = null;

    start() {
    }

    update(deltaTime: number) {
        if (this.player) {
            if (this.player.position.x < -450) {
                this.node.position = new Vec3(-57.9, -70, 0);
            }
            else {
                this.node.position = new Vec3(this.player.position.x + 400, -70, 0);
            }
        }
    }
}

