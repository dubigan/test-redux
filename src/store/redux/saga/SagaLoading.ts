import { E_SAGA_TYPES, E_REDUX_TYPES } from './../types';
import { put, takeEvery } from 'redux-saga/effects';

type TWorkerAction = {
    payload: boolean;
};

export function* workerLoading(action: any) {
    console.log('workerLoadingSaga', action);
    yield put({
        type: E_REDUX_TYPES.LOADING,
        payload: action.payload,
    });
}

export function* watchLoading() {
    yield takeEvery(E_SAGA_TYPES.SAGA_LOADING, workerLoading);
    // console.log('watchLoadingSaga');
}
