/*
 * @Author: liyh
 * @Date: 2020-03-21 19:52:42
 * @LastEditors: liyh
 * @LastEditTime: 2020-04-10 10:06:30
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
export const enterpriseLogin = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/enterprise/login.json`, params);
}

//企业用户注册
export const enterpriseRegister = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/enterprise/register.json`, params);
}

//获取用户基础信息(此接口主要用来判断是个人用户还是企业用户)
export const getUserInfo = (params) => {
    return ajax.get(`${config.baseUrl}/frontend/user/center/get_info.json`, params);
}

//获取个人信息
export const getPersonalInfo = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/user/center/personal_info.json`, params);
}

//编辑个人名称
export const editPersonalInfo = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/user/center/edit/personal_info.json`, params);
}

//获取企业信息
export const getEnterpriseInfo = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/user/center/enterprise_info.json`, params);
}

//编辑企业信息
export const editEnterpriseInfo = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/user/center/edit/enterprise_info.json`, params);
}

//服务管理-审核中
export const serviceManegeReview = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/user/center/review/list.json`, params);
}

//服务管理-已发布
export const serviceManegeAccept = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/user/center/accept/list.json`, params);
}

//服务管理-其他
export const serviceManegeOther = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/user/center/others/list.json`, params);
}

//认证管理-查看信息
export const getAttestInfo = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/user/center/attest_info.json`, params);
}
//认证管理-保存信息
export const editAttestInfo = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/user/center/edit/attest_info.json`, params, {
        headers: {
            "Content-Type": 'multipart/form-data',
            "X-Requested-With": 'XMLHttpRequest',
        }
    });
}

//服务发布->表单提交
export const publish = (params) => {
    return ajax.post(`${config.baseUrl}/frontend/service/publish/submit.json`, params, {
        headers: {
            "Content-Type": 'multipart/form-data',
            "X-Requested-With": 'XMLHttpRequest',
        }
    });
}

