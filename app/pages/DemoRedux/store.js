/**
 * 当前模块的 store
 * type 都是”模块名/save“
 */

import api from './api';

const type = 'demoRedux/save';

// 初始 store 数据
const initState = {
  // 列表
  list: [],
  // 查询条件
  query: {},
  // 每页显示 10 条
  limit: 10,
  // 第几页
  page: 1,
  // 详情
  detail: null,
  // 详情对话框是否打开
  detail_open: 0,
};

// 打开一个对话框
export const openDetail = (flag) => {
  return {
    type,
    data: { detail_open: flag },
  };
};

// 获取用户列表
export const getList = () => {
  return (dispatch, state) => {
    // 查询条件（包含分页信息）从 store 获取
    const { limit, page, query } = state().demoRedux;
    api.getList({ limit, page, ...query }).then((d) => {
      dispatch({
        type,
        data: { list: d.list },
      });
    });
  };
};

// 新增
// 由业务界面显示错误信息，而非 axios 处理
// options = { showError: true }
export const create = (data) => {
  return (dispatch) => {
    api.create(data, { showError: true }).then((d) => {
      if (d.code !== 0) {
        dispatch({
          type,
          data: { uierror: data.message },
        });
      } else {
        // 关闭对话框
        dispatch({
          type,
          data: { detail_open: 0 },
        });
      }
    });
  };
};

// 改变 store。
// 简化使用方式，统一使用 type='模块名/save'。
export default initState;
