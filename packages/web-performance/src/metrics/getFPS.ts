import { retainToFixed } from "../utils/calculate.js";


/**
 * 使用 requestAnimationFrame 计算 FPS
 *   
 */
const fetchFPS = (): Promise<number> => {
  return new Promise((resolve, reject) => {

    let lastFrameTime = Date.now();
    let frameCount = 0;
    const fpsQueue = [];
    let timerId = null;


    const calculateFPS = () => {

      const now = Date.now();
      frameCount++;

      // 执行大于1s
      if (now > 1000 + lastFrameTime) {
        const fps = Math.round(frameCount * 1000 / (now - lastFrameTime))
        fpsQueue.push(fps);
        frameCount = 0;
        lastFrameTime = + new Date();

        // 循环10次
        if (fpsQueue.length > 10) {
          cancelAnimationFrame(timerId);

          const totalFPS = fpsQueue.reduce((sum: number, fps: number) => {
            sum = sum + fps;
            return sum;
          }, 0)
          const resultFPS: number = retainToFixed(totalFPS / fpsQueue.length, 2);
          resolve && resolve(resultFPS)

        } else {
          timerId = requestAnimationFrame(calculateFPS);
        }

      } else {
        timerId = requestAnimationFrame(calculateFPS);
      }

    }

    calculateFPS();

  })
}



/**
 * 获取帧率
 */
export const getFPS = (): void => {
  fetchFPS().then((fps: number) => {
    console.log('获取fps--------', fps);
  });
}