import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAllMessages, getNewMessage} from '../actions/messages';
import Message from '../components/Message';
import * as SignalR from '@aspnet/signalr';

class Main extends Component {
    constructor() {
        super();

        this.state = {
            newMessage: ''
        }

        this.connection = new SignalR.HubConnectionBuilder()
            .withUrl('https://localhost:44319/hub/chat')
            .build();
    }

    componentDidMount() {
        this.setUpConnection();
    }

    setUpConnection = () => {
        this.connection.on("Connected", data => {
            this.props.getAllMessages(data);
            console.log(this.props.messages);
        })

        this.connection.on("MessageAdded", data => {
            this.props.getNewMessage(data);
            console.log(this.props.messages);
        })

        this.connection
            .start()
            .then(() => console.log("Connection success"))
            .catch(err => console.log(err));
    }

    getUsername = () => {
        return localStorage.getItem('username');
    }

    handleMessageChange = e => {
        this.setState({newMessage: e.target.value});
    }

    handleSend = e => {
        e.preventDefault()
        
        this.connection
        .invoke("sendMessage", {
            from: this.getUsername(),
            content: this.state.newMessage,
        })
        this.setState({newMessage: ''});
    }

    checkIfAuthor = name => {
        return this.getUsername() === name;
    }

    renderMessages = () => {
        return this.props.messages.map(message => 
             <Message key={message.id} from={message.from} content={message.content} isAuthor={this.checkIfAuthor(message.from)}/>
        )
    }

    render() {
        return (
            <div>
                <h1>{this.getUsername()}</h1>
                {this.renderMessages()}
                <form onSubmit={this.handleSend}>
                    <input
                        className="form-control"
                        placeholder="Type something..."
                        value={this.state.newMessage}
                        onChange={this.handleMessageChange}/>
                    <button type="submit" className="btn btn-warning">Send</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages.messages
})

export default connect(mapStateToProps, {getAllMessages, getNewMessage})(Main)

