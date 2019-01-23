import React from 'react';

const Message = ({from, content, isAuthor}) => {

    const getUserName = () => {
        if(isAuthor) {
            return <p style={{color: 'orange'}}>Me</p>
        }
        return <p>{from}</p>
    }

    return(
        <div className='card'>
            <div className="card-body">
                <h5 className="card-title">{getUserName()}</h5>
                <p className="card-text">{content}</p>
            </div>
        </div>
    )
}

export default Message;