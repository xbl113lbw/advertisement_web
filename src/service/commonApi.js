/*
 * @Author: liyh
 * @Date: 2020-04-07 13:41:11
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-07 13:50:08
 */
import ajax from './../utils/ajax';
import config from './../config';
// get提交    
export const getSms = (params) => {
    return ajax.get(`${config.baseUrl}/frontend/send_sms.json`, params);
}
