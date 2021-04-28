// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
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

    onKeyDown () {
        this.mainCamera.getComponent('MainCamera').backMove();
    },

    addListener () {
        this.node.on(
            cc.Node.EventType.MOUSE_DOWN, this.onPointDown, this
        );
        this.node.on(
            cc.Node.EventType.MOUSE_UP, this.onPointUp, this
        );
	    /////////////////////////////////////////////////////////////
        cc.systemEvent.on(
            cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this
        );
        cc.systemEvent.on(
            cc.SystemEvent.EventType.KEY_UP, this.onPointUp, this
        );
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onDestroy () {
        this.node.off(
            cc.SystemEvent.EventType.MOUSE_DOWN, this.onPointDown, this
        );
        this.node.off(
            cc.SystemEvent.EventType.MOUSE_UP, this.onPointUp, this
        );
        //////////////////////////////////////////////////////////////
        	
        cc.systemEvent.off(
            cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this
        );
        cc.systemEvent.off(
            cc.SystemEvent.EventType.KEY_UP, this.onPointUp, this
        );
    },

    update (dt) {
        var upperBound = this.node.y + this.node.height / 2;
        var tsunamiLowerBound = this.tsunami.y - this.tsunami.height / 2;
        if (upperBound < tsunamiLowerBound - cc.director.getWinSizeInPixels().height) {
            this.node.destroy();
        }
    },
});
