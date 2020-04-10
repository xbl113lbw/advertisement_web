/*
 * @Author: liyh
 * @Date: 2020-03-30 14:14:28
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-10 16:14:36
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

    /**
     * @description: 判断是否登录
     * @return 返回去用户是否登录;true:已登录;false:未登录 
     */
    isLogin() {
        if (localStorage.getItem('token')) {
            return true;
        }
        return false;
    }

    /**
     * @description:去除<p>、</p>、<br/>标签
     * @param {type} 字符串
     * @return: 去除后的字符串
     */
    replaceText(text) {
        return text.replace(/<[^>]+>/g, "");
    }

    /**
     * @description: 随机从数组中取出n个元素
     * @param {type} 
     * @return: 
     */
    getRandomArrayElements(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }
}

// 实例化后再导出
export default new Common()