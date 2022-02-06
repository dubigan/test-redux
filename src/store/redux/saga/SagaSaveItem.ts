import { E_SAGA_TYPES } from './../types';
import { call, takeEvery } from 'redux-saga/effects';
import { TSaveItemProps } from '../../../components/types/types';
import api from '../../../pages/api/api';

const saveItem = async (props: TSaveItemProps) => {
    const { url, owner_pk, item } = props;
    if (!item) return;
    const res = await api.queryServer(url, {
        item,
        owner_pk,
        item_pk: item.id,
    });
};

export function* workerSaveItem(action: any) {
    console.log('workerSaveItem');
    yield call(saveItem, action.payload.data);
}

export function* whatcherSaveItem() {
    console.log('watcherSaveItem');
    yield takeEvery(E_SAGA_TYPES.SAGA_SAVE_ITEM, workerSaveItem);
}
