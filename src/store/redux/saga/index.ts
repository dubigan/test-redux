import { spawn, fork, takeEvery, all, call, put } from 'redux-saga/effects';
import { E_REDUX_TYPES } from '../types';
import { watchDeleteItem } from './SagaDeleteItem';
import { watchLoading } from './SagaLoading';
import { watchLoadItem } from './SagaLoadItem';
import { watchLoadItems } from './SagaLoadItems';
import { whatcherSaveItem } from './SagaSaveItem';

export function* setLoading(value: boolean) {
    console.log('setLoading', value);
    yield put({
        type: E_REDUX_TYPES.LOADING,
        payload: value,
    });
}

export default function* rootSaga() {
    // console.log('rootSaga');
    // yield spawn(watchLoading);
    const sagas = [watchLoadItems, watchDeleteItem, watchLoadItem, whatcherSaveItem];
    // @ts-ignore
    const retrySagas = yield sagas.map((saga) => {
        return spawn(function* () {
            while (true) {
                try {
                    yield call(saga);
                    break;
                } catch (e: any) {
                    console.log(e);
                }
            }
        });
    });
    yield all(retrySagas);
}
