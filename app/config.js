module.exports = {
    host: '0.0.0.0',
    port: 5201,
    proxy: {
        '/api': {
            target: 'http://localhost:5200',
            changeOrigin: true
        },
        '/socket.io': {
            target: 'http://localhost:5200',
            changeOrigin: true
        }
    }
}