import React, { Component } from 'react'

export default class UpdateCar extends Component {
    constructor(props) {
        super(props)
        this.setUpdateCar = this.props.setUpdateCar;
    }

    render() {
        return (
            <div>
                UpdateCar
                <button onClick={() => this.setUpdateCar(null)}>
                    Update
                </button>
            </div>
        )
    }
}
