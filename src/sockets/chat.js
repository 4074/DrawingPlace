
export default function chat(socket) {
    socket.on('say', (data) => {
        console.log(data)
    })
}