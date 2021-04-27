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

    onPointDown () {
        this.mainCamera.getComponent('MainCamera').startMove();
    },

    onPointUp () {
        this.mainCamera.getComponent('MainCamera').stopMove();
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad () {
        console.log("Start!!!");

        this.node.on(
            cc.Node.EventType.MOUSE_DOWN, this.onPointDown, this
        );
        this.node.on(
            cc.Node.EventType.MOUSE_UP, this.onPointUp, this
        );
    },

    onDestroy () {
        this.node.off(
            cc.SystemEvent.EventType.MOUSE_DOWN, this.onPointDown, this
        );
        this.node.off(
            cc.SystemEvent.EventType.MOUSE_UP, this.onPointUp, this
        );
    },

    update (dt) {
        if(this.mainCamera.y > this.node.y + this.node.height / 2) {
            this.onPointUp();
        }
    },
});
