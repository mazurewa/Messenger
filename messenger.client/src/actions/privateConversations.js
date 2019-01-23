import {USER_CONNECTED, USER_DISCONNECTED, GET_ALL_CONVERSATIONS, PRIVATE_MESSAGE_ADDED} from './types';

export const getAllConversations = (conversations) => dispatch => {
    dispatch({
        type: GET_ALL_CONVERSATIONS,
        payload: conversations
    })
}

export const userConnected = (username) => dispatch => {
    dispatch({
        type: USER_CONNECTED,
        payload: username
    })
}

export const userDisconnected = (username) => dispatch => {
    dispatch({
        type: USER_DISCONNECTED,
        payload: username
    })
}

export const privateMessageAdded = (message) => dispatch => {
    dispatch({
        type: PRIVATE_MESSAGE_ADDED,
        payload: message
    })
}