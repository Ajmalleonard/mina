module.exports = {
  apps: [
    {
      name: 'minafoundationtz.org',
      script: 'npm',
      args: 'start',
      cwd: '/home/apps/sq/mina/apps/web', 
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000, 
      }
    },
    {
      name: 'minafoundationtz-backend',
      script: 'npm',
      args: 'dist/src/main.js', 
      cwd: '/home/apps/sq/mina/apps/api', 
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001, 
      }
    }
  ]
};