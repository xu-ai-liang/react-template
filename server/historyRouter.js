/**
 * 在 Nodejs 端支持 React 的 historyRouter
 * 用户如果刷新浏览器，此时 http://domain/a/b 会返回 404
 * 该组件对以上地址重写至 /index.html。
 */
const url = require('url');

function evaluateRewriteRule(parsedUrl, match, rule, req) {
  if (typeof rule === 'string') {
    return rule;
  }
  if (typeof rule !== 'function') {
    throw new Error('Rewrite rule can only be of type string or function.');
  }

  return rule({
    parsedUrl,
    match,
    request: req,
  });
}

function acceptsHtml(header, options) {
  const opts = options;
  opts.htmlAcceptHeaders = opts.htmlAcceptHeaders || ['text/html', '*/*'];
  for (let i = 0; i < opts.htmlAcceptHeaders.length; i += 1) {
    if (header.indexOf(opts.htmlAcceptHeaders[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function getLogger() {
  // 返回空函数。调试的时候，再返回 console.log
  return () => {};
  // return console.log.bind(console);
}

module.exports = function historyApiFallback(options) {
  const opts = options || {};
  const logger = getLogger(opts);

  return (req, res, next) => {
    const { headers } = req;
    if (req.method !== 'GET') {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the method is not GET.'
      );
      return next();
    }
    if (!headers || typeof headers.accept !== 'string') {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the client did not send an HTTP accept header.'
      );
      return next();
    }
    if (headers.accept.indexOf('application/json') === 0) {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the client prefers JSON.'
      );
      return next();
    }
    if (!acceptsHtml(headers.accept, opts)) {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the client does not accept HTML.'
      );
      return next();
    }

    const parsedUrl = url.parse(req.url);
    let rewriteTarget;
    opts.rewrites = opts.rewrites || [];
    for (let i = 0; i < opts.rewrites.length; i += 1) {
      const rewrite = opts.rewrites[i];
      const match = parsedUrl.pathname.match(rewrite.from);
      if (match !== null) {
        rewriteTarget = evaluateRewriteRule(parsedUrl, match, rewrite.to, req);

        if (rewriteTarget.charAt(0) !== '/') {
          logger(
            'We recommend using an absolute path for the rewrite target.',
            'Received a non-absolute rewrite target',
            rewriteTarget,
            'for URL',
            req.url
          );
        }

        logger('Rewriting', req.method, req.url, 'to', rewriteTarget);
        req.url = rewriteTarget;
        return next();
      }
    }

    const { pathname } = parsedUrl;
    // url 地址中包含 .js .css .ico 不重写
    if (
      pathname.lastIndexOf('.') > pathname.lastIndexOf('/') &&
      opts.disableDotRule !== true
    ) {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the path includes a dot (.) character.'
      );
      return next();
    }
    // url 地址中以 /api/ 开头，不重写
    if (pathname.indexOf('/api/') === 0) {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the path start of a /api/.'
      );
      return next();
    }

    rewriteTarget = opts.index || '/index.html';
    logger('Rewriting', req.method, req.url, 'to', rewriteTarget);
    req.url = rewriteTarget;
    return next();
  };
};
