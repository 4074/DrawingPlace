module.exports = {
    host: 'localhost',
    port: 5201,
    proxy: {
        '/api': {
            target: 'http://localhost:5200',
            changeOrigin: true
        }
    }
}