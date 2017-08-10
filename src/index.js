import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { persistState } from 'redux-devtools';

import './index.css';
import App from './App';
import DevTools from './DevTools';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const getDebugSessionKey = () => {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
};

const createStoreWithMiddleware = compose(
    DevTools.instrument(),
    persistState(getDebugSessionKey())
)(createStore);
const configureStore = initialState => {
    return createStoreWithMiddleware(reducers, initialState);
};


const store = configureStore({});


ReactDOM.render(
    <Provider store={store}>
        <div>
            <App/>
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
