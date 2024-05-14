import { _decorator, Component, Node, find, Button, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StageSelect')
export class StageSelect extends Component {
    start() {
        let stage1 = find("Canvas/menu_bg/stage1").getComponent(Button);
        let stage2 = find("Canvas/menu_bg/stage2").getComponent(Button);

        stage1.node.on(Node.EventType.MOUSE_UP, this.loadStageOne, this);
        stage2.node.on(Node.EventType.MOUSE_UP, this.loadStageTwo, this);
    }
    loadStageOne() {
        director.loadScene("stage1");
    }
    loadStageTwo() {
        director.loadScene("stage2");
    }
}

