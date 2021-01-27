import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
// 引入当前模块的 action。
// 也可以引入其它模块的 action，用于跨模块调用
import * as action from './store';

const DemoRedux = () => {
  const dispatch = useDispatch();
  // 获取当前模块的 store 数据
  // 也可以获取其它模块的 store 数据。
  const demoStore = useSelector((s) => {
    return s.demoRedux;
  });

  // 组件渲染完成后，获取列表
  useEffect(() => {
    // 触发 action
    dispatch(action.getList());
  }, []);

  // 新增按钮点击
  const buttonClick = () => {
    dispatch(action.openDetail(demoStore.detail_open ? 0 : 1));
  };

  return (
    <div>
      <Button
        onClick={() => {
          buttonClick();
        }}
      >
        新增
      </Button>
      detail_open：{demoStore.detail_open}
    </div>
  );
};

export default DemoRedux;
