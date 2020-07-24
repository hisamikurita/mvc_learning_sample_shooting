import UnitBase from "./UnitBase";
import HitTest from "../Util/HitTest";
import Bullet from "./Bullet";
import Explosion from "./Explosion";

/**
 * 自機クラス
 */
export default class Player extends UnitBase {
    constructor(canvas) {
        super();
        this.canvas = canvas; //canvasオブジェクトを取得する
        this.x = 100;
        this.y = 200;
        this.playerHalfWidth = 25;
        this.playerHalfHeight = 14;
        this.tx = 0;
        this.ty = 0;
        this.playerSpeed = 2.6;
        this.bulletCheckCounter = 0;
        this.bulletSetInteval = 10;
        this.setHP(10);
        this.setWidth(40);
        this.setHeight(40);
        this.isKeyDown = {};
        this.event = new CustomEvent('playerDead');
        this.alpha = 1;

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
            this.x -= this.playerSpeed;
        };
        if (this.isKeyDown.key_ArrowRight === true) {
            this.x += this.playerSpeed;
        };
        if (this.isKeyDown.key_ArrowUp === true) {
            this.y -= this.playerSpeed;
        };
        if (this.isKeyDown.key_ArrowDown === true) {
            this.y += this.playerSpeed;
        };
        //自機の画面外判定
        this.tx = Math.min(Math.max(this.x, this.playerHalfWidth), this.canvas.width - this.playerHalfWidth);
        this.ty = Math.min(Math.max(this.y, this.playerHalfHeight), this.canvas.height - this.playerHalfHeight);
        this.x = this.tx;
        this.y = this.ty;

        // スペースキーを押すとBulletが発射されるようにして下さい。
        // Enemyクラスを参考にしてください。
        if (this.isKeyDown[`key_ `] === true) {
            // 一定間隔で弾を発射
            if (this.bulletCheckCounter >= 0) {
                this.bullet = new Bullet(this.canvas, this.x + this.playerHalfWidth, this.y);
                this.bullet.setSpeed(4);
                this.bulletCheckCounter = -this.bulletSetInteval;
            }
        };
        this.bulletCheckCounter++

        // 敵の弾に当たったらダメージを受けるようにして下さい。
        const bullet = HitTest.getHitObjectByClassName(this, "Bullet");

        if (bullet) {
            // ダメージを与えて下さい。
            this.setDamage(bullet.damage);

            this.alpha = .1;

            // HPが0になったら死亡状態にし、MainManageに通知して下さい。
            // そして、MainManager側に、その通知を受け取れるようにして下さい。
            if (this.HP < 0) {
                this.explosion = new Explosion(100, 15, 30, .25);
                this.explosion.set(this.x, this.y);
                window.dispatchEvent(this.event);
                this.destroy();
            }
        }
        if (this.alpha <= 1) {
            this.alpha += .1;
        }
    }

    /**
     * 機体描画
     * 三角形
     * @param {ctx} context
     */
    draw(context) {
        context.save()
        context.beginPath();

        context.globalAlpha = this.alpha;

        context.moveTo(this.x - 20, this.y + 10);
        context.lineTo(this.x + 20, this.y);
        context.lineTo(this.x - 20, this.y - 10);
        context.closePath();

        context.strokeStyle = "rgb(0,0,0)"; //枠線の色
        context.stroke();

        context.fillStyle = "rgba(0,0,255, 1)";//塗りつぶしの色
        context.fill();

        context.restore();
    }
}