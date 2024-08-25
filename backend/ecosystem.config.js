module.exports = {
  apps: [
    {
      name: "recordstore-backoffice",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        ENV_VAR1: "enviroment-variable",
      },
    },
  ],
};
