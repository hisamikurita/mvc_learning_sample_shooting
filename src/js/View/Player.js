import UnitBase from "js/View/UnitBase";
import HitTest from "js/Util/HitTest";

/**
 * 自機クラス
 */
export default class Player extends UnitBase {
    constructor(canvas) {
        super();
        this.canvas = canvas; //canvasオブジェクトを取得する
        this.x = 100;
        this.y = 200;
        this.playerHalfWidth =25;
        this.playerHalfHeight =14;
        this.tx = 0;
        this.ty = 0;
        this.speed = 6;
        this.setHP(100);
        this.setWidth(40);
        this.setHeight(40);
        this.isKeyDown = {};

        //キーイベントの判定を行う
        window.addEventListener('keydown', (e) => {
            this.isKeyDown[`key_${e.key}`] = true;
        }, false);
        window.addEventListener('keyup', (e) => {
            this.isKeyDown[`key_${e.key}`] = false;
        }, false);
    }

    /**
     * EnterFrame.jsの中で
     * requestAnimationFrameから自動的にcallされ続けます。
     */
    update() {
        // 矢印キー　←↑→↓で動くようにする
        if (this.isKeyDown.key_ArrowLeft === true) {
            this.x -= this.speed;
        };
        if (this.isKeyDown.key_ArrowRight === true) {
            this.x += this.speed;
        };
        if (this.isKeyDown.key_ArrowUp === true) {
            this.y -= this.speed;
        };
        if (this.isKeyDown.key_ArrowDown === true) {
            this.y += this.speed;
            console.log(this.y)
        };
        //自機の画面外判定
        this.tx = Math.min(Math.max(this.x, this.playerHalfWidth), this.canvas.width - this.playerHalfWidth);
        this.ty = Math.min(Math.max(this.y, this.playerHalfHeight), this.canvas.height - this.playerHalfHeight);
        this.x = this.tx;
        this.y = this.ty;

        // スペースキーを押すとBulletが発射されるようにして下さい。
        // Enemyクラスを参考にしてください。

        // 敵の弾に当たったらダメージを受けるようにして下さい。
        const bullet = HitTest.getHitObjectByClassName(this, "Bullet");
        if (bullet) {
            // ダメージを与えて下さい。↓コメントアウトを外していただくですがw
            // this.setDamage (bullet.damage);
            // ↑さて、setDamageはどこで定義されているでしょうか？

            // HPが0になったら死亡状態にし、MainManageに通知して下さい。
            // そして、MainManager側に、その通知を受け取れるようにして下さい。
            // console.log (this.HP);
        }
    }

    /**
     * 機体描画
     * 三角形
     * @param {ctx} context 
     */
    draw(context) {
        context.beginPath();
        context.moveTo(this.x - 20, this.y + 10);
        context.lineTo(this.x + 20, this.y);
        context.lineTo(this.x - 20, this.y - 10);
        context.closePath();

        context.strokeStyle = "rgb(0,0,0)"; //枠線の色
        context.stroke();

        context.fillStyle = "rgba(0,0,255, 1)";//塗りつぶしの色
        context.fill();
    }
}