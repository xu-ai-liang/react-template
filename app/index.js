import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import GlobalRouter from './router';
import store from './store';
import './css/index.less';

if (module.hot) {
  module.hot.accept();
}

function App() {
  return (
    <Provider store={store}>
      <GlobalRouter />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
