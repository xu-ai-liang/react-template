import React from 'react';
import Sidebar from './sidebar';
import Header from './header';
import './index.less';

const Layout = (props) => {
  return (
    <div className="layout-wrap">
      <Sidebar />
      <div className="layout-content-wrap">
        <Header />
        <div className="content-wrap">
          <div className="content">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
