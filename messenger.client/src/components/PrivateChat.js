import React from 'react';
import * as SignalR from '@aspnet/signalr';
import ActiveConversation from './ActiveConversation';
import Conversation from './Conversation';
import {connect} from 'react-redux';
import {getAllConversations, userConnected, userDisconnected, privateMessageAdded} from '../actions/privateConversations';

class PrivateChat extends React.Component {
    constructor() {
        super();

        this.connection = new SignalR.HubConnectionBuilder()
            .withUrl('https://localhost:44319/hub/privatechat')
            .build();
    }
   
    componentDidMount() {
        this.setUpConnection();
    }

    componentWillUnmount() {
        this.connection.stop().then(() => console.log('connection stopped'));
    }

    setUpConnection = () => {
        this.connection.on('selfConnected', conversations => {
            this.props.getAllConversations(conversations);
            console.log(this.props.privateConversations);
        })
        this.connection
            .start()
            .then(() => this.connection.invoke('connect', this.getUsername()))
            .catch(err => console.log(err));
    }

    
    getUsername = () => {
        return localStorage.getItem('username');
    }

    render() {
        return (
        <div className="row pt-3">
            <div className="col-3">
                <Conversation conversations={this.props.privateConversations}/>
            </div>
            <div className="col-9">
                <ActiveConversation/>
            </div>
        </div>
        )
    }
}

const mapStateProps = state => ({
    privateConversations: state.privateConversations.privateConversations
});

export default connect(mapStateProps, {getAllConversations, userConnected, userDisconnected, privateMessageAdded})(PrivateChat);