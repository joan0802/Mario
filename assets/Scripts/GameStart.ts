import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameStart')
export class GameStart extends Component {
    start() {
        this.scheduleOnce(() => {
            director.loadScene("stage1");
        }, 3);
    }

    update(deltaTime: number) {
        
    }
}

