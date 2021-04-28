// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        mainCamera: {
            default: null,
            type: cc.Node
        },

        tsunami: {
            default: null,
            type: cc.Node
        },

        backgroundPrefab: {
            default: null,
            type: cc.Prefab
        }
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    addBackground () {
        var newBackground = cc.instantiate(this.backgroundPrefab);
        newBackground.getComponent('background').mainCamera = this.mainCamera;
        newBackground.getComponent('background').tsunami = this.tsunami;
        this.node.addChild(newBackground);
        newBackground.zIndex = 0;
        newBackground.getComponent('background').addListener();
        this.background = newBackground;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.addBackground();
        this.background.setPosition(cc.v2(0, 1500));
    },

    onDestroy () {

    },

    start () {

    },

    update (dt) {
        var cameraYNextFrame = this.mainCamera.y + dt * this.mainCamera.getComponent('MainCamera').speed;
        if (
            (this.mainCamera.y <= this.background.y)
            && (cameraYNextFrame > this.background.y)) {
                var yOfNewBackground = this.background.y + this.background.height;
                this.addBackground();
                this.background.setPosition(cc.v2(0, yOfNewBackground));

        }
    },
});
