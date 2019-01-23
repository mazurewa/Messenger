import {USER_CONNECTED, USER_DISCONNECTED, PRIVATE_MESSAGE_ADDED, GET_ALL_CONVERSATIONS} from '../actions/types';

const initialState = {
    privateConversations: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_CONVERSATIONS: {
            return {
                ...state,
                privateConversations: action.payload
            }
        }
        
        default: {
            return state;
        }
    }
}