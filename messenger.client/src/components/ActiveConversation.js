import React from 'react';
import Message from './Message';

export default class ActiveConversation extends React.Component {
    constructor() {
        super();

        this.state = {
            newMessage: ''
        }
    }
  
    checkIfAuthor = name => {
        return this.getUsername() === name;
    }

    getUsername = () => {
        return localStorage.getItem('username');
    }

    renderMessages = () => {
        return this.props.conversation.messages.map(message => 
             <Message key={message.id} from={message.from} content={message.content} isAuthor={this.checkIfAuthor(message.from)}/>
        )
    }

    handleSend = () => {
        this.props.onSend(this.state.newMessage);
        this.setState({newMessage: ''});
    }
    
    handleMessageChange = e => {
        this.setState({newMessage: e.target.value});
    }
    
    render() {
        if(!this.props.conversation) {
            return '';
        }
        return (
            <div className="container">
                <h1>{this.props.conversation.to}</h1>
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