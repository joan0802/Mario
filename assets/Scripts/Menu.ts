import { _decorator, Component, Node, director, find, Button, EventHandler, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {
    // @property(AudioSource)
    // _audioSource: AudioSource = null!;

    start() {
        // this.playBGM();
        let loginButton = new EventHandler();
        loginButton.target = this.node;
        loginButton.component = "Menu";
        loginButton.handler = "loadLoginScene";
        find("Canvas/Background/LoginButton").getComponent(Button).clickEvents.push(loginButton);

        let registerButton = new EventHandler();
        registerButton.target = this.node;
        registerButton.component = "Menu";
        registerButton.handler = "loadRegisterScene";
        find("Canvas/Background/RegisterButton").getComponent(Button).clickEvents.push(registerButton);
    }
    // playBGM() {
        // this._audioSource.play();
    // }
    loadLoginScene() {
        console.log("loadLoginScene");
        director.loadScene("login");
    }
    loadRegisterScene() {
        console.log("loadRegisterScene");
        director.loadScene("register");
    }
}

