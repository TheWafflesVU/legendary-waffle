const { override } = require('customize-cra');

module.exports = override(
  (config, env) => {
    // Disable CSS optimization
    config.optimization.minimizer.forEach(minimizer => {
      if (minimizer.constructor.name === 'CssMinimizerPlugin') {
        minimizer.options.minify = false;
      }
    });

    return config;
  }
);
