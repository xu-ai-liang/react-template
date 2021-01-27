const postcssNormalize = require('postcss-normalize');
const postcssFilexBugsFixes = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  // parser: 'postcss-strip-inline-comments',
  plugins: [
    postcssFilexBugsFixes,
    postcssPresetEnv({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    postcssNormalize(),
  ],
};

// postcss-preset-env: 将最新的CSS语法转换为目标环境的浏览器能够理解的CSS语法。
// stage, 决定了哪些CSS特性需要被填充
// stage-0 非官方草案
// stage-1 编辑草案或早期工作草案
// stage-2 工作草案
// stage-3 候选版本
// stage-4 推荐标准

// autoprefixer,解析css为其添加浏览器前缀 postcss-preset-env集成了autoprefixer
// flexbox: 'no-2009'，为 flexbox 添加前缀，Autoprefixer只会最终和IE 10个版本规格的加上前缀
