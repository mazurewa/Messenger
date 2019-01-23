import {MESSAGE_ADDED, MESSAGE_FETCHED} from './types';

export const getAllMessages = (messages) => dispatch => {
    dispatch({
        type: MESSAGE_FETCHED,
        payload: messages
    })
}

export const getNewMessage = (message) => dispatch => {
    dispatch({
        type: MESSAGE_ADDED,
        payload: message
    })
}