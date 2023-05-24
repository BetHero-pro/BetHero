module.exports = function override(config, env) {
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
