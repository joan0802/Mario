import { _decorator, Component, Node, EventHandler, find, Button, director, EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Login')
export class Login extends Component {
    @property({ type: EditBox })
    email: EditBox = null;

    @property({ type: EditBox })
    password: EditBox = null;

    start() {
        let loginButton = find("Canvas/menu_bg/loginButton").getComponent(Button);
        let closeButton = find("Canvas/menu_bg/closeButton").getComponent(Button);

        loginButton.node.on(Node.EventType.MOUSE_UP, this.loadGameScene, this);
        closeButton.node.on(Node.EventType.MOUSE_UP, this.loadMenuScene, this);
    }
    async loadGameScene() {
        try {
            const result = firebase.auth().signInWithEmailAndPassword(this.email.string, this.password.string)
            .then(() => {
                console.log("user signed in successfully");
                director.loadScene("game");
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    loadMenuScene() {
        director.loadScene("menu");
    }
}

