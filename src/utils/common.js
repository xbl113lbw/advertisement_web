/*
 * @Author: liyh
 * @Date: 2020-03-30 14:14:28
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-02 11:54:25
 */
class Common {
    /**
   * @description: 滚动到指定Y值
   * @param {type} targetPageY:要滚动到的Y值(必传);
   */
    scrollToTargetPageY(targetPageY) {
        clearInterval(timer);
        let timer = setInterval(() => {
            let currentY = document.documentElement.scrollTop || document.body.scrollTop;//当前及滑动中任意时刻位置
            let distance = targetPageY > currentY ? targetPageY - currentY : currentY - targetPageY;//剩余距离
            let speed = Math.ceil(distance / 8);//每时刻速度
            if (currentY == targetPageY) {
                //到达目标点
                clearInterval(timer);
            } else {
                document.documentElement.scrollTop = targetPageY > currentY ? currentY + speed : currentY - speed
            }
        }, 10);
    }
}

// 实例化后再导出
export default new Common()