import request from "../util/request";

/**
 * 登录
 * @param
 * @returns {*}
 * 
*/
export function authLogin(data) {
    return request({
        url: "/auth/login",
        method: "post",
        data,
    });
}

/**
 * 注册
 * @param
 * @returns {*}
 *
*/
export function authRegister(data) {
    return request({
        url: "/auth/register",
        method: "post",
        data,
    });
}
