/*
 * @Author: liyh
 * @Date: 2020-03-30 14:14:28
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-30 14:29:01
 */
class Common {
    /**
     * @description: 设置浏览器标题
     * @param {type} title
     */
    setViewTitle(title) {
        document.title = title;
        let iframe = document.createElement("iframe");
        iframe.setAttribute("src", "/favicon.ico");
        iframe.addEventListener('load', function () {
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 10);
        });
        document.body.appendChild(iframe);
    }
}

// 实例化后再导出
export default new Common()