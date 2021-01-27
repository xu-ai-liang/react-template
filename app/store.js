import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const allStore = {};
const requireResult = require.context('./pages', true, /store\.js/);

requireResult.keys().forEach((storeUrl) => {
  // 只匹配子目录
  if (!/^\.[/\\]([a-zA-Z\d]+?)[/\\]store\.js$/.test(storeUrl)) return;
  let key = storeUrl.replace(
    /.+[/\\]([a-zA-Z\d]+?)[/\\]store\.js$/,
    (_, arg1) => arg1
  );
  // 处理大写字母开头
  if (/^[A-Z]/.test(key)) {
    key = key.replace(/^[A-Z]/, (k) => `${k}`.toLowerCase());
  }
  allStore[key] = (state = requireResult(storeUrl)?.default || {}, action) => {
    switch (action.type) {
      case `${key}/save`:
        return Object.assign({}, state, { ...action.data });
      default:
        return state;
    }
  };
});

const rootReducer = combineReducers({
  ...allStore,
});

const loggerMiddleware = createLogger();

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    // 打印 action 日志
    loggerMiddleware
  )
);
