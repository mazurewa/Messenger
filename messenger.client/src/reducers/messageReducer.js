import {MESSAGE_ADDED, MESSAGE_FETCHED} from '../actions/types';

const initialState = {
    messages: []
}

export default function (state=initialState, action) {
    switch(action.type) {
        case MESSAGE_FETCHED: {
            return {
                state, 
                messages: action.payload
            }
        }
        case MESSAGE_ADDED: {
            return {
                state, 
                messages: [...state.messages, action.payload]
            }
        }
        default:
            return state;
    }
}