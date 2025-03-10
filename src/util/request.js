import axios from "axios";

const url = "http://localhost:8080/api"; // 本地环境
// 线上环境
// const url = "http://8.134.51.50:8080/api";
const jumpUrl = "http://localhost:5173/login"; // 本地环境
// 线上环境
// const jumpUrl = "http://8.134.51.50:5173/login";

const request = axios.create({
  baseURL: url,
  timeout: 5000,
});

/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    console.log("请求参数：", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response) => {
    console.log("响应数据：", response);
    return response;
  },
  (error) => {
    // 统一错误处理
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error("请求参数错误");
          break;
        case 401:
          console.error("未授权，请登录");
          setTimeout(() => {
            window.location.href = jumpUrl;
          }, 1000);
          break;
        case 403:
          console.error("拒绝访问");
          break;
        case 404:
          console.error("请求地址出错");
          break;
        case 408:
          console.error("请求超时");
          break;
        case 500:
          console.error("服务器内部错误");
          break;
        case 501:
          console.error("服务未实现");
          break;
        case 502:
          console.error("网关错误");
          break;
        case 503:
          console.error("服务不可用");
          break;
        case 504:
          console.error("网关超时");
          break;
        case 505:
          console.error("HTTP版本不受支持");
          break;
        default:
          console.error("网络错误");
      }
    }
    return Promise.reject(error);
  },
);

export default request;
