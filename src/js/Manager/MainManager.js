import Player from "js/View/Player";
import UI from "js/View/UI";
import EnemyManager from "js/Manager/EnemyManager";
// import CommonBase from "js/Common/CommonBase";

/**
 * MainManager
 * 指示系統のトップクラス
 */
export default class MainManager {
    constructor(canvas, context) {
        // super ();
        this.canvas = canvas;
        this.context = context;
        this.deadFlag = false;

        //自機を生成（インスタンス化）しています。
        //Playerクラスにて課題を確認し、動くようにしたり、弾をとばせたり
        //するようにしてください。
        //canvasオブジェクトを渡す
        this.player = new Player(canvas);
        window.addEventListener('playerDead', () => {
            console.log('playerは死にました');
            this.deadFlag = true;
            this.ui.isGameOver = true;
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && this.deadFlag === true) {
                    this.player = new Player(canvas);
                    this.deadFlag = false;
                    this.ui.isGameOver = false;
                    this.ui.frame = 0;
                }
            });
        });

        //敵のマネージャークラスです
        //EnemyManagerクラスにて課題を確認し、色々な敵を作ったり、
        //制御してください。
        this.enemyManager = new EnemyManager(canvas);

        //UIを表示させて下さい。UIクラスをインスタンス化させます。
        //はViewフォルダにあります
        this.ui = new UI(canvas);
    }
}