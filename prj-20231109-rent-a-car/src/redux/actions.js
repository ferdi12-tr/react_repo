import * as actions from './actionTypes'

export const carAdded = (car, totalHour) => ({
    type:actions.CAR_ADDED,
    payload: {
        car,
        totalHour,
    }
})

export const carRemoved = (carId) => ({
    type:actions.CAR_REMOVED,
    payload :{
        carId,
    }
})