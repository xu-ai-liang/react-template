import buildApi from '@/utils/buildApi';

export default buildApi({
  // 新增用户
  create: 'post /api/demo/user',
  // 获取用户列表
  getList: 'get /api/demo/user',
});
