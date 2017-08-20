const LOAD = 'place/LOAD'
const LOAD_SUCCESS = 'place/LOAD_SUCCESS'
const LOAD_FAIL = 'place/LOAD_FAIL'

const SELECT_COLOR = 'place/SELECT_COLOR'

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
        default:
            return state
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
