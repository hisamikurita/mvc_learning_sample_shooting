import MainManager from 'js/Manager/MainManager';
import EnterFrame from 'js/Common/EnterFrame';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const context = canvas.getContext('2d');


// Canvasを画面いっぱいに表示する
function onResize() {
    canvas.width = 640; //innerWidth * devicePixelRatio;
    canvas.height = 480; //innerHeight * devicePixelRatio;
}
window.addEventListener('resize', onResize);
onResize();

new MainManager(canvas, context);
EnterFrame.startAnimationFrame(canvas, context);

/**
 * entory js　特にこれをいじる必要はありません。
 */

