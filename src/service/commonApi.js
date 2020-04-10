/*
 * @Author: liyh
 * @Date: 2020-04-07 13:41:11
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-10 11:02:29
 */
import ajax from './../utils/ajax';
import config from './../config';
// get提交    
export const getSms = (params) => {
    return ajax.get(`${config.baseUrl}/frontend/send_sms.json`, params);
}

//判断企业审核状态:review是待审核 accept 审核通过
export const getEnterpriseStatus = (params) => {
    return ajax.get(`${config.baseUrl}/frontend/user/center/get_info.json`, params).then(res => {
        let { status, data } = res;
        if (status) {
            return data.status
        } else {
            return '';
        }
    });
}
