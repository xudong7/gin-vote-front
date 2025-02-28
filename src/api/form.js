import request from "../util/request";

/**
 * 保存表单数据
 * @param
 * @returns {*}
 */
export function savePollData(data) {
  return request({
    url: "/forms",
    method: "post",
    data,
  });
}


/**
 * 获取表单数据
 * 
 */
export function getPollData() {
  return request({
    url: "/forms",
    method: "get",
  });
}

/**
 * 获取表单数据
 * 
 */
export function getPollDataById(id) {
  return request({
    url: `/forms/${id}`,
    method: "get",
  });
}

/**
 * 删除表单数据
 * @param
 * @returns {*}
*/
export function deletePollDataById(id) {
  return request({
    url: `/forms/${id}`,
    method: "delete",
  });
}

/**
 * 更新表单数据
 * @param
 * @returns {*}
*/
export function updatePollData(id, data) {
  return request({
    url: `/forms/${id}`,
    method: "put",
    data,
  });
}