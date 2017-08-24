import Utils from 'utils'

const LOAD = 'place/LOAD'
const LOAD_SUCCESS = 'place/LOAD_SUCCESS'
const LOAD_FAIL = 'place/LOAD_FAIL'

const SELECT_COLOR = 'place/SELECT_COLOR'

const DRAW = 'place/DRAW'
const DRAW_SUCCESS = 'place/DRAW_SUCCESS'
const DRAW_FAIL = 'place/DRAW_FAIL'

const RECEIVE_DRAW = 'place/RECEIVE_DRAW'

const initialState = {

}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true
            }
        case LOAD_SUCCESS: 
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.result
            }
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false
            }
        case SELECT_COLOR:
            return {
                ...state,
                color: action.params.color
            }
        case RECEIVE_DRAW:
            return handleReceiveDraw(state, action)
        default:
            return state
    }
}

function handleReceiveDraw(state, action) {
    const point = action.data

    return {
        ...state,
        data: {
            ...state.data,
            points: Utils.mergePoints(state.data.points, point)
        }
    }
}

export function isLoaded(state) {
    return state.loaded && state.data
}

export function load(params) {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client, urls) => client.get(urls.place.get)
    }
}

export function selectColor(color) {
    return {
        type: SELECT_COLOR,
        params: { color }
    }
}

export function draw(params) {
    return {
        types: [DRAW, DRAW_SUCCESS, DRAW_FAIL],
        socket: true,
        promise: (socket) => socket.emit(socket.place, 'draw', params)
    }
}

export function listenDraw() {
    console.log('listenDraw')
    return {
        type: 'a',
        listen: (socket, next) => {
            console.log('listennnnnnnnnnn')
            socket.on(socket.place, 'draw', (data) => {
                next({type: RECEIVE_DRAW, data})
            })
        }
    }
}