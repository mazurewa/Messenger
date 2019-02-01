import React from 'react';
import * as SignalR from '@aspnet/signalr';
import ActiveConversation from './ActiveConversation';
import Conversation from './Conversation';
import {connect} from 'react-redux';
import {getAllConversations, userConnected, userDisconnected, privateMessageAdded} from '../actions/privateConversations';

class PrivateChat extends React.Component {
    constructor() {
        super();
        this.state = {
            activeParticipant: null
        }

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

    onClick = participant => {
        this.setState({activeParticipant: participant});
    }

    setUpConnection = () => {
        this.connection.on('selfConnected', conversations => {
            this.props.getAllConversations(conversations);
        })

        this.connection.on('messageAdded', message => {
            this.props.privateMessageAdded(message);
        })

        this.connection.on('newUserConnected', username => {
            this.props.userConnected(username);
        })

        this.connection.on('userDisconnected', username => {
            this.props.userDisconnected(username);
        })

        this.connection
            .start()
            .then(() => this.connection.invoke('connect', this.getUsername()))
            .catch(err => console.log(err));
    }

    
    getUsername = () => {
        return localStorage.getItem('username');
    }

    getActiveConversation = () => {
        const activeConversation = this.props.privateConversations.find(con => con.to === this.state.activeParticipant);
        console.log('active');
        console.log(this.props.privateConversations)
        return activeConversation;
    }

    handleSend = (message) => {
        this.connection.invoke('sendMessage', {to: this.state.activeParticipant, from: this.getUsername(), content: message});
    }

    render() {
        return (
        <div className="row pt-3">
            <div className="col-3">
                <Conversation conversations={this.props.privateConversations} onClick={this.onClick}/>
            </div>
            <div className="col-9">
                <ActiveConversation onSend={this.handleSend} conversation={this.getActiveConversation()}/>
            </div>
        </div>
        )
    }
}

const mapStateProps = state => ({
    privateConversations: state.privateConversations.privateConversations
});

export default connect(mapStateProps, {getAllConversations, userConnected, userDisconnected, privateMessageAdded})(PrivateChat);