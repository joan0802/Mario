import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOver')
export class GameOver extends Component {
    start() {
        this.scheduleOnce(() => {
            director.loadScene("stageSelect");
        }, 5);
    }

    update(deltaTime: number) {
        
    }
}

