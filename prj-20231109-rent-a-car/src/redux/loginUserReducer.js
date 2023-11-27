import * as actions from './actionTypes'

export default function loginUserReducer(state = {}, action) {
    switch (action.type) {
        case actions.LOGIN_USER:
            let tempState = {
                ...state,
                ...action.payload.currentUser
            }
            console.log(tempState)
            return tempState
        default:
            return state;
    }
}