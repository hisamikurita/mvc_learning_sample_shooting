import UnitBase from "./UnitBase";
import Bullet from "./Bullet";
import HitTest from "../Util/HitTest";
import Explosion from "./Explosion";

/**
 * 敵のBaseクラス。
 * 新規の敵を作る場合はこのクラスを継承してください。
 */
export default class Enemy extends UnitBase {
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.x = 400;
        this.y = 200;
        this.setHP(5);
        this.crashScore = 10;
        this.alpha = 1;
        this.event = new CustomEvent('enemyDeath');

        // setInterval(() => {
        //     // 一定間隔で弾を発射

        // }, 400);
    }
    /**
     * EnterFrame.jsの中で
     * requestAnimationFrameから自動的にcallされ続けます。
     */
    update() {
        // 動きはoverrideして下さい。↓のサンプルは上下運動
        this.deg = this.deg || 0;
        this.y = Math.cos(this.deg * (Math.PI / 180)) * 3 + this.y;
        this.deg++;

        this.bullet = new Bullet(this.canvas, this.x - 10, this.y);
        this.bullet.setSpeed(-4);
        const bullet = HitTest.getHitObjectByClassName(this, "Bullet");
        if (bullet) {
            // 弾にあたったらダメージを与え、EnemyManagerに通知して下さい。
            console.log('敵に当たった。')
            this.setDamage(bullet.damage);
            this.alpha = .1;
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
     * 描画
     * @param {context} context 
     */
    draw(context) {
        context.beginPath();

        context.arc(this.x, this.y, 20, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
        context.fillStyle = "rgba(255,0,0,0.8)";
        context.fill();

        context.strokeStyle = "purple";
        context.lineWidth = 8;
        context.stroke();
    }
}