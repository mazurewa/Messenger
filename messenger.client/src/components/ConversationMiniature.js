import React from 'react';

const ConversationMiniature = ({conversation, onClick}) => {
    const onClickInternal = () => {
        onClick(conversation.to);
    }
    
    return (
        <div className="card" onClick={onClickInternal}>
            <b>{conversation.to} {conversation.isActive ? <span className="badge badge-secondary">active</span> : ''}</b>
        </div>
    )
}

export default ConversationMiniature;