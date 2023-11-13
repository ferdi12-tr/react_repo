import * as actions from './actionTypes'

/*
slice:
[
    {
        car:car, // clicked car object
        totalHour: 0
    }
]
*/

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