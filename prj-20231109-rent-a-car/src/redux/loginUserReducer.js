import * as actions from './actionTypes'

export default function loginUserReducer(state = {}, action) {
    switch (action.type) {
        case actions.LOGIN_USER:
            return {
                ...state,
                ...action.payload.currentUser
            }
        default:
            return state;
    }
}