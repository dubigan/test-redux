import { TLoadItemProps, TItem } from './../../../components/types/types';
import { E_SAGA_TYPES, E_REDUX_TYPES } from './../types';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import api from '../../../pages/api/api';

const loadItem = async (props: TLoadItemProps) => {
    console.log('loadItem props', props);
    const { url, item_pk } = props;
    const res = await api.queryServer(url, { item_pk });
    // console.log('ItemStore.loadItem', res.data);
    return res.data as TItem;
};

export function* workerLoadItem(action: any) {
    const item: TItem = yield call(loadItem, action.payload.data);
    console.log('ItemStore.worker', item);
    yield put({
        type: E_REDUX_TYPES.LOAD_ITEM,
        payload: {
            data: item,
            itemType: action.payload.itemType,
        },
    });
}

export function* watchLoadItem() {
    console.log('watchLoadItem');
    yield takeEvery(E_SAGA_TYPES.SAGA_LOAD_ITEM, workerLoadItem);
    // yield fork(workerLoadItem);
}
