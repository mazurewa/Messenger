import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Login extends Component {
   constructor () {
       super();
       this.state={
           username: '',
        }
   }

   handleLogin = () => {
       localStorage.setItem('username', this.state.username);
       this.props.history.push('/');
   }

   handleUsernameChange = e => {
       this.setState({username: e.target.value})
   }
   
    render() {
        const {username} = this.state;
        return (
            <div style={{marginTop: '150px'}} className={"container"}>
                <input
                    className={"form-control"}
                    placeholder="Enter your nickname"
                    value={username}
                    type="text"
                    onChange={this.handleUsernameChange}
                />
                <button className="btn btn-warning" onClick={this.handleLogin}>Login</button>
            </div>
        )
    }
}

export default withRouter(Login);
