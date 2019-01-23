import {combineReducers} from 'redux';
import messageReducer from './messageReducer';
import privateConversationReducer from './privateConversationReducer';

export default combineReducers({
    messages: messageReducer,
    privateConversations: privateConversationReducer
})