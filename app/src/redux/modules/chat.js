const SAY = 'chat/SAY'
const SAY_SUCCESS = 'chat/SAY_SUCCESS'
const SAY_FAIL = 'chat/SAY_FAIL'

const initialState = {}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SAY:
            return {
                ...state,
                saying: true
            }
        case SAY_SUCCESS:
            return {
                ...state,
                saying: false,
                said: true
            }
        case SAY_FAIL:
            return {
                ...state,
                saying: false,
                said: false
            }
        default:
            return state
    }
}

export function say(params) {
    return {
        types: [SAY, SAY_SUCCESS, SAY_FAIL],
        socket: true,
        promise: (socket) => socket.emit(socket.chat, 'say', params)
    }
}