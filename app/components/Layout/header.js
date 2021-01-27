import React from 'react';
import { clearToken } from '@/utils/session';
import './index.less';

const Header = () => {
  const dropout = () => {
    clearToken('token');
    window.location.reload();
  };

  return (
    <div className="layout-content-title">
      <div onClick={dropout} className="dropout-wrap">
        退出
      </div>
    </div>
  );
};

export default Header;
