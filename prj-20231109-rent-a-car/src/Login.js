import React, { Component } from 'react'

import { loginUserStore} from './redux/store';
import { loginUser } from './redux/actions';



export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            username: "",
            password: "",
            haveAccount: false,
            message: ""
        }
    }

    clearInputs=() => {
        this.setState({name: ""});
        this.setState({surname: ""});
        this.setState({username: ""});
        this.setState({password: ""});
    }

    SignInButton = () => {
        fetch("http://localhost:3000/users")
            .then(data => data.json())
            .then(data => {
                const user = data.find((user) => user.username === this.state.username && user.password === this.state.password)
                if (user) {
                    this.props.setCurrentUser(user);
                    loginUserStore.dispatch(loginUser(user));
                }
                else {
                    this.setState({ message: "invalid username or password" })
                }
            }).finally(this.clearInputs);
    }

    SignUpButton = () => {
        if (!(this.state.name && this.state.surname && this.state.username && this.state.password)){
            this.clearInputs();
            return;
        }
            
        const newUser = {
            name: this.state.name,
            surname: this.state.surname,
            username: this.state.username,
            password: this.state.password,
            addedCars: [] // keep added cars id in order to get request from json
        }
        fetch("http://localhost:3000/users", {
            method: 'POST', // not PUT method
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(response => response.json())
        .then(response => this.setState({haveAccount:true}))
        .finally(this.clearInputs)
    }


    render() {
        return (
            !this.state.haveAccount ?
                <div>
                    <h2>Sign Up</h2>
                    <input required type="text" className="form-control mt-3" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} placeholder="Name" />
                    <input type="text" className="form-control mt-3" value={this.state.surname} onChange={(e) => this.setState({ surname: e.target.value })} placeholder="Surname" />
                    <input type="text" className="form-control mt-3" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} placeholder="username" />
                    <input type="password" className="form-control mt-3" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="password" />
                    <div className='justify-content-between'>
                        <button className="btn btn-success mt-3" onClick={this.SignUpButton}>SIGN UP</button>
                        <p className='mt-2'>Have an Account? <button className='btn btn-info' onClick={() => this.setState({ haveAccount: true })}>SIGN IN</button> </p>
                    </div>
                </div>
                :
                <div>
                    <h2>Sign In</h2>
                    <input type="text" className="form-control mt-3" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} placeholder="username" />
                    <input type="password" className="form-control mt-3" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="password" />
                    <button className="btn btn-success mt-3" onClick={this.SignInButton}>SIGN IN</button>
                    {this.state.message &&
                        <p className='mt-2'>{this.state.message}<button className='btn btn-info ms-3' onClick={() => this.setState({ haveAccount: false, message: "" })}>SIGN UP</button> </p>
                    }
                </div>
        )
    }
}
