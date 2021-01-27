import React from 'react';
import { Button } from 'antd';
import { setToken } from '@/utils/session';
import loginBg from '@/assets/images/login/logo.png';
import './index.less';
/*
 * const loginBg = require('/app/images/login/bgImg.jpg');
 * 如果要使用 require 引入方式，请使用 loginBg.default  ,require 引入的图片是一个对象
 * 因为 file-laoder 的 esModule 属性默认为 true ，使用 ES 模块的语法模块化，有利于 tree-shaking
 * 所以 require 会被 webpack 解析为一个 {default: module} 对象，
 * 关于此问题详情参考：https://stackoverflow.com/questions/59070216/webpack-file-loader-outputs-object-module
 */

const Login = () => {
  const login = () => {
    setToken('token', 'login');
    window.location.reload();
  };
  return (
    <div className="login-wrap">
      <img className="login-bg-img" src={loginBg} alt="" />
      <Button type="primary" onClick={login} size="large">
        click me to Login...
      </Button>
    </div>
  );
};

export default Login;
