import Player from "js/View/Player";
import UI from "js/View/UI";
import EnemyManager from "js/Manager/EnemyManager";
// import CommonBase from "js/Common/CommonBase";

/**
 * MainManager
 * 指示系統のトップクラス
 */
export default class MainManager {
    constructor(canvas) {
        // super ();
        this.canvas = canvas;
        //自機を生成（インスタンス化）しています。
        //Playerクラスにて課題を確認し、動くようにしたり、弾をとばせたり
        //するようにしてください。
        //canvasオブジェクトを渡す
        this.dead = 'プレーヤーは死亡しました';
        this.player = new Player(canvas, this.dead);

        //敵のマネージャークラスです
        //EnemyManagerクラスにて課題を確認し、色々な敵を作ったり、
        //制御してください。
        this.enemyManager = new EnemyManager(canvas);

        //UIを表示させて下さい。UIクラスをインスタンス化させます。
        //はViewフォルダにあります

    }
}