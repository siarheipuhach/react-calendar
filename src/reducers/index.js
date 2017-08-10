import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import { default as events } from './events';

const reducers = combineReducers({
    form: formReducer,
    events
});

export default reducers;
