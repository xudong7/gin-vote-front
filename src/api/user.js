import request from '../util/request'

/**
 * 获取id用户信息
 * @param
 * @returns {*}
 */
export function getUserById(data) {
    return request({
        url: `/users/${data}`,
        method: 'get',
    })
}

/**
 * 获取用户列表
 * @param
 * @returns {*}
 */
export function getUsers() {
    return request({
        url: '/users',
        method: 'get',
    })
}