import { _decorator, Component, Node, Label, Prefab, instantiate, Button, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LeaderBoard')
export class LeaderBoard extends Component {

    initY: number = -97;

    @property({ type: Prefab })
    userPrefab: Prefab = null!;

    @property({ type: Label })
    userLabel: Label = null!;

    @property({ type: Label })
    scoreLabel: Label = null!;

    @property({ type: Node })
    content: Node = null!;

    @property({ type: Button })
    backButton: Button = null!;


    start() {
        this.backButton.node.on(Node.EventType.MOUSE_UP, this.backStageSelect, this);
    }
    onLoad() {
        const userList = firebase.database().ref('users');
        userList.on('value', (snapshot) => {
            const usersData = snapshot.val();
            const userList = [];

            for (let user in usersData) {
                userList.push({
                    userName: usersData[user].userName,
                    score: usersData[user].score
                });
            }
            userList.sort((a, b) => b.score - a.score);
            for(let i = 0; i < userList.length; i++) {
                const user = userList[i];
                const userNode = instantiate(this.userPrefab);
                if (!userNode) {
                    console.error("Failed to instantiate userItemPrefab!");
                    continue;
                }
                userNode.getChildByName("userName").getComponent(Label)!.string = user.userName.toUpperCase();
                userNode.getChildByName("userScore").getComponent(Label)!.string = user.score;
                userNode.setPosition(18.55, this.initY -i * 50);
                this.content.addChild(userNode);
            }
        });
    }
    backStageSelect() {
        director.loadScene("stageSelect");
    }

    update(deltaTime: number) {

    }
}

