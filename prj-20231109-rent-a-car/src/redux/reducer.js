import * as actions from './actionTypes'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case actions.CAR_ADDED:
            return  {
                        ...state,
                        car:action.payload.car,
                        totalHour:action.payload.totalHour,
                }
            
        // case actions.CAR_REMOVED:
        //     return state.filter(item => item.car.id !== action.payload.id)
        default:
            return state;
    }
    
}