import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import router from '@/router/router';
import classnames from 'classnames';
import './index.less';

const Header = () => {
  const { pathname } = useLocation();
  return (
    <div className="layout-sidebar-wrap">
      {router.map((route) => (
        <div
          key={route.path}
          className={classnames(
            'sidebar-link',
            pathname === route.path && 'active'
          )}
        >
          <Link to={route.path}>{route.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Header;
