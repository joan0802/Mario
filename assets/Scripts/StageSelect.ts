import { _decorator, Component, Node, find, Button, director, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StageSelect')
export class StageSelect extends Component {

    @property({ type: Label })
    userLabel: Label = null;

    @property({ type: Label })
    scoreLabel: Label = null;

    @property({ type: Button })
    leaderBoardButton: Button = null;

    start() {
        let stage1 = find("Canvas/menu_bg/stage1").getComponent(Button);
        let stage2 = find("Canvas/menu_bg/stage2").getComponent(Button);

        stage1.node.on(Node.EventType.MOUSE_UP, this.loadStageOne, this);
        stage2.node.on(Node.EventType.MOUSE_UP, this.loadStageTwo, this);
        this.leaderBoardButton.node.on(Node.EventType.MOUSE_UP, this.loadLeaderBoard, this);

        const user = firebase.auth().currentUser;
        const userRef = firebase.database().ref('users/' + user.uid);
        userRef.once('value', (snapshot) => {
            const userData = snapshot.val();
            this.userLabel.string = userData.userName.toUpperCase();
            this.scoreLabel.string = userData.score;
        });
    }
    loadStageOne() {
        director.loadScene("gameStart");
    }
    loadStageTwo() {
        director.loadScene("stage2");
    }
    loadLeaderBoard() {
        director.loadScene("leaderBoard");
    }
}

