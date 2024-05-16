import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraControl')
export class CameraControl extends Component {

    @property({type: Node})
    player: Node = null;

    start() {
    }

    update(deltaTime: number) {
        // var cc.follow
    }
}

