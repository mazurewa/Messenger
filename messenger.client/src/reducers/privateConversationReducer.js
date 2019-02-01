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

        case PRIVATE_MESSAGE_ADDED: {
            const newConversations = state.privateConversations.map(c => {
                if(c.to === action.payload.to || c.to === action.payload.from) {
                    c.messages.push(action.payload);
                }
                return c;
            })
            return {
                ...state,
                privateConversations: newConversations
            }
        }

        case USER_DISCONNECTED: {
            const newConversations = state.privateConversations.map(c => {
                if(c.to === action.payload) {
                    c.isActive = false;
                }
                return c;
            })
            return {
                ...state,
                privateConversations: newConversations
            }
        }

        case USER_CONNECTED: {
            let newConversations = [...state.privateConversations];

            let existingConversation;
            let existingConversationIndex = newConversations.findIndex(c => c.to == action.payload);

            if (existingConversationIndex >= 0) {
                existingConversation = newConversations[existingConversationIndex];
                existingConversation.isActive = true;
                newConversations[existingConversationIndex] = existingConversation
            } else {
                existingConversation = {to: action.payload, messages: [], isActive: true};
                newConversations.unshift(existingConversation);
            }

            return {
                ...state,
                privateConversations: newConversations
            }
        }
        
        default: {
            return state;
        }
    }
}