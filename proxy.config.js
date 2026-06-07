const proxy = [
  {
    context: ['/api/hitbox'],
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug'
  },
  {
    context: ['/api/usuario/hitbox'],
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug'
  }
];

module.exports = proxy;