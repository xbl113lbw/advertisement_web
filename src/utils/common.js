/*
 * @Author: liyh
 * @Date: 2020-03-30 14:14:28
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-03 16:28:26
 */
class Common {
    /**
   * @description: 滚动到指定Y值
   * @param {type} targetPageY:要滚动到的Y值(必传);
   */
    scrollToTargetPageY(targetPageY) {
        setTimeout(() => {
            window.scrollTo({
                top: targetPageY,
                behavior: "smooth"
            })
        }, 30);
    }
}

// 实例化后再导出
export default new Common()