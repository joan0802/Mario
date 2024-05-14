import { _decorator, Component, Node, EventHandler, find, Button, director, EditBox } from 'cc';
// import { ref, set, get } from "firebase/database";
const { ccclass, property } = _decorator;

@ccclass('Register')
export class Register extends Component {
    @property({ type: EditBox })
    email: EditBox = null;

    @property({ type: EditBox })
    password: EditBox = null;

    @property({ type: EditBox })
    userName: EditBox = null;

    start() {
        let registerButton = find("Canvas/menu_bg/registerButton").getComponent(Button);
        let closeButton = find("Canvas/menu_bg/closeButton").getComponent(Button);

        registerButton.node.on(Node.EventType.MOUSE_UP, this.loadGameScene, this);
        closeButton.node.on(Node.EventType.MOUSE_UP, this.loadMenuScene, this);
    }
    loadMenuScene() {
        director.loadScene("menu");
    }
    async loadGameScene() {
        console.log("loadGameScene");

        try {
            const result = await firebase.auth().createUserWithEmailAndPassword(this.email.string, this.password.string);
            const user = result.user;
            const userRef = firebase.database().ref('users/' + user.uid);
            await userRef.set({
                email: this.email.string,
                userName: this.userName.string,
            });
            alert("user created successfully");
            director.loadScene("stageSelect");
            // console.log("user created successfully");
        } catch (error) {
            // alert(error.message);
            console.error(error);
        }
    }

}

