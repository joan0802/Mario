import { _decorator, Component, Node, input, Input, EventKeyboard, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {

    moveSpeed: number = 5;
    health: number = 1;
    position: Vec3 = new Vec3(-562.537, -410.765, 0);

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    onKeyDown(event: EventKeyboard) {
        if(event.keyCode == 87) { // W
            console.log("Jump");
            // this.node.position = this.node.position.add(new Vec3(0, this.speed, 0));
        }
        else if(event.keyCode == 65) { // A
            this.node.position = this.node.position.add(new Vec3(-this.moveSpeed, 0, 0));
            // Vec3.add(this.node.position, this.node.position, new Vec3(-this.speed, 0, 0));
        }
        else if(event.keyCode == 68) { // D
            console.log("Right");
        }
        else if(event.keyCode == 83) { // S
            console.log("Down");
        }
    }
    updateMove(deltaTime: number) {
        if(this.position) {
            this.node.setPosition(this.position);
        }
    }
}

