const originConfig = require('../webpack.config');

module.exports = async ({ config }) => {
  return {
    ...config,
    module: { ...config.module, rules: originConfig.module.rules },
    resolve: { ...config.resolve, extensions: originConfig.resolve.extensions }
  };
};
