import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import reducer, { initialState } from './reducers';
import { useMemo } from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

let store: any;

function initStore(preloadedState = initialState) {
    return createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware(sagaMiddleware)));
}
export const initializeStore = (preloadedState: any) => {
    let _store = store ?? initStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export function useStore(state: any) {
    const stor = useMemo(() => initializeStore(state), [state]);
    sagaMiddleware.run(rootSaga);
    return stor;
}

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__(applyMiddleware(sagaMiddleware)));

// export default store;
