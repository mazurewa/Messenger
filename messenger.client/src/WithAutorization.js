import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {isUserLoggedIn} from './Autorization';
// reuzywalny serwis


export default function WithAutorization (ComposedComponent) {
    return class Autorization extends Component {
        render() {
            if(isUserLoggedIn()) {
                return (
                    <ComposedComponent {...this.props}/>
                ) 
            }
            return (
                <Redirect to="/login"/>
            );
        }
    }
}

//przekierowujemy uzytkownika do componentu ktory chcial wybrac