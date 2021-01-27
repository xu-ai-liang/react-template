import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import buildRouter from '@/utils/buildRouter';
import Index from '@/pages';
import Login from '@/pages/Login';
import NoMatch from '@/components/404';

const token = sessionStorage.getItem('token');
const router = buildRouter();
const GlobalRouter = () => {
  return (
    <Router>
      <Route
        path="/"
        render={() => {
          return token ? (
            <Index>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  {router.map((route) => (
                    <Route
                      exact={route.route || true}
                      path={route.path}
                      key={route.path}
                      component={lazy(() =>
                        import(`@/pages${route.component.replace(/\./, '')}`)
                      )}
                    />
                  ))}
                  <Redirect exact from="/" to="/home" />
                  <Route component={NoMatch} />
                </Switch>
              </Suspense>
            </Index>
          ) : (
            <Login />
          );
        }}
      />
    </Router>
  );
};

export default GlobalRouter;
