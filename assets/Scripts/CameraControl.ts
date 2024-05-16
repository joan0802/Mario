import { _decorator, Component, Node, Camera, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraControl')
export class CameraControl extends Component {

    @property({type: Node})
    player: Node = null;

    start() {
    }

    update(deltaTime: number) {
        if (this.player) {
            this.node.position = new Vec3(this.player.position.x+400, -70, 0);
        }
    }
}

