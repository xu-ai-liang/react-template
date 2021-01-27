import axios from 'axios';
import querystring from 'querystring';
import * as session from './session';

// http 请求头部信息
const headerConfig = {};

/**
 * 构造 ajax 请求
 * @param {string} method
 * @param {string} url   `/url/{id}/{id1}`
 * @param {json} params   {customQuery:{}}
 * @param {json} options
 */
async function buildRequest(method, url, params, options) {
  let param = {};
  let config = {};
  let query = '';
  // 处理路径
  url = url.replace(/\{([\s\S]+?)\}/g, (_, args1) => {
    const val = params[args1];
    delete params[args1];
    return val;
  });
  if (url.includes('undefined')) {
    throw new Error('请检查是否传路径参数的值');
  }
  // 传 query
  if (params.customQuery && method !== 'get') {
    query = querystring.stringify(params.customQuery);
    query = query ? `?${query}` : '';
    delete params.customQuery;
  }
  if (method === 'get') {
    delete params.customQuery;
    config = { ...config, ...options };
    const stringifyResult = querystring.stringify(params);
    const suffix = !stringifyResult ? '' : `?${stringifyResult}`;
    return axios[method](url + suffix, config);
  }
  if (method === 'delete') {
    return axios[method](url + query, config);
  }
  if (method === 'post' || method === 'put') {
    param = JSON.stringify(params);
    config = {
      headers: {
        ...headerConfig,
      },
    };
    config = { ...config, ...options };
  }

  return axios[method](url + query, param, config);
}

// get 请求
export const get = (url, params = {}, options) => {
  return buildRequest('get', url, params, options);
};
// delete 请求
export const del = (url, params = {}, options) => {
  return buildRequest('delete', url, params, options);
};
// put 请求
export const put = (url, params = {}, options) => {
  return buildRequest('put', url, params, options);
};

// post 请求
export const post = (url, params = {}, options) => {
  return buildRequest('post', url, params, options);
};

// 请求的数据加上 token
axios.interceptors.request.use(
  (config) => {
    const token = session.getToken('token');
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    if (token) {
      headers.Authorization = token;
    }

    return Object.assign({}, config, { headers });
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 对返回的数据做拦截处理
axios.interceptors.response.use(
  (res) => {
    const { config, data } = res;

    switch (data.code) {
      case 200:
        return data;
      // 登录过期
      case 401:
        // TODO 清空 token 信息，跳回到登录界面
        break;
      // 无权限
      case 403:
        // TODO 界面弹窗提示
        break;
      case 500:
        break;
      default:
        break;
    }

    // 在界面上显示错误信息
    if (config.showError) {
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    if (axios.isCancel(error)) {
      // TODO request cancel
    } else if (navigator && !navigator.onLine) {
      // TODO network is offline
    } else {
      // other error
      console.error(error);
    }
    return Promise.reject(error);
  }
);
