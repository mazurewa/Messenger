import React from 'react';
import ConversationMiniature from './ConversationMiniature';

export default class Conversation extends React.Component {
    render() {
        const {conversations} = this.props;
        return (
            <div>
                Conversations
                {conversations.map((con, index) => <ConversationMiniature key={index} conversation={con}/>)}
            </div>
        )
    }
}