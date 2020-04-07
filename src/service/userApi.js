/*
 * @Author: liyh
 * @Date: 2020-03-21 19:52:42
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-07 16:26:12
 */
import ajax from './../utils/ajax';

import config from './../config';

//个人用户登录
export const personalLogin = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/personal/login.json`, params);
}

//个人用户注册
export const personalRegister = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/personal/register.json`, params);
}

//企业用户登录
export const enterpriseRegister = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/enterprise/register.json`, params);
}

//企业用户注册
export const enterpriseLogin = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/enterprise/login.json`, params);
}

//获取用户个人信息
export const getUserInfo = (params) => {
    return ajax.get(`${config.baseUrl}/frontend/user/center/get_info.json`, params);
}


