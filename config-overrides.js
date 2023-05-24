module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.module.rules = [
    ...config.module.rules,
    {
      resolve: {
        fallback: { https: false },
      },
    },
  ];
  return config;
};
