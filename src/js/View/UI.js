import DomUtil from "../Util/DomUtil";
import CommonBase from "../Common/CommonBase";

// DomUtil();

/**
 * UIの描画クラス
 * スコア以外にも
 * 自機の体力
 * 経過時間や
 * クリア表示、ゲームオーバーなども作ってみて下さい。
 */
export default class UI extends CommonBase {
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.score = 0;
        this.isGameOver = false;
        this.frame = 0;
    }

    //ゲームオーバー
    update(context) {
        if (this.isGameOver === true) {
            this.frame += 1;
            const textWidth = this.canvas.width / 2;
            const loopWidth = this.canvas.width + textWidth;
            const x = this.canvas.width - (this.frame * 2) % loopWidth;
            context.save();
            context.font = "700 64px 'Arial', 'monospace'";
            context.fillText("GAMEOVER", x, (this.canvas.height / 2) + 20, textWidth);
            context.restore();
        }
        else {
            return;
        }
    }

    /**
     * スコア
     * @param {Number} value 
     */
    setScore(value) {
        this.score = value;
    }
    /**
     * 描画
     * @param {context} context 
     */
    draw(context) {
        context.save();
        context.font = "700 16px 'Arial', 'monospace'";
        context.fillStyle = "rgb(255, 169, 0)";
        context.fillText("SCORE : " + this.score, 10, 20);
        context.restore();
    }
}