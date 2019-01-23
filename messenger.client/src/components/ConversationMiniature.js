import React from 'react';

const ConversationMiniature = ({conversation}) => {
    return (
        <div className="card">
            <b>{conversation.to}</b>
        </div>
    )
}

export default ConversationMiniature;