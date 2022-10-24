module.exports = {
    apps : [{
      name: 'naixue-cha-he',
      script: 'bin/www',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 'max',
      autorestart: true,
      // watch: true,
      max_memory_restart: '1G',
      "instance_var": "INSTANCE_ID",
      "exec_mode" : "cluster",
      env: {
        NODE_ENV: 'development',
        PORT: 4040
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8001
      }
    }]
  };
