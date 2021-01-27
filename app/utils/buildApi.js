import { get, post, del, put } from './ajax';

/**
 * api 对象转换成 api 函数。
 * 输入：
 * api = {
 *   list: 'get /api/user'
 * }
 * 输出：
 * api = {
 *    list: (data, options) => {
 *      return get('/api/user', data, options)
 *    }
 * }
 * @param {Object} api
 */
function buildApi(api) {
  const obj = {};
  Object.keys(api).forEach((key) => {
    const item = api[key];
    const [left, right] = item.split(/ +/);
    const method = left.toLowerCase();
    if (method === 'get') {
      obj[key] = (data, options) => {
        return get(right, data, options);
      };
    } else if (method === 'post') {
      obj[key] = (data, options) => {
        return post(right, data, options);
      };
    } else if (method === 'delete') {
      obj[key] = (data, options) => {
        return del(right, data, options);
      };
    } else if (method === 'put') {
      obj[key] = (data, options) => {
        return put(right, data, options);
      };
    }
  });

  return obj;
}

export default buildApi;
