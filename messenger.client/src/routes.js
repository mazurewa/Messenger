import React from 'react';
import {Route} from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import WithAutorization from './WithAutorization';
import Logout from './components/Logout';
import PrivateChat from './components/PrivateChat';
import Navbar from './components/Navbar';


export default (
    <div>
        <Navbar />
        <Route exact path="/" component={WithAutorization(Main)}/>  
        <Route exact path="/login" component={Login}/>
        <Route exact path="/logout" component={WithAutorization(Logout)}/>
        <Route exact path="/private" component={WithAutorization(PrivateChat)}/>
    </div>
)
