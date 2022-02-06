import { E_REDUX_TYPES } from './../types';
import { call, put, takeEvery } from 'redux-saga/effects';
import { TDeleteItemProps, TItem } from '../../../components/types/types';
import api from '../../../pages/api/api';
import { E_SAGA_TYPES } from '../types';

// type TDeleteItemProps = {
//     url: string;
//     item_pk: number;
//     owner_pk: number;
// };

const deleteItem = async (props: TDeleteItemProps) => {
    console.log('deleteItem props', props);
    const { url, item_pk, owner_pk } = props;
    const res = await api.queryServer(url, {
        // sorted_by: sortedBy,
        btn_del: '',
        item_pk: item_pk,
        owner: owner_pk ?? -1,
    });
    return res.data as TItem[];
};

export function* workerDeleteItem(action: any) {
    const items: TItem[] = yield call(deleteItem, action.payload.data);
    yield put({
        type: E_REDUX_TYPES.DELETE_ITEM,
        payload: {
            data: items,
            listType: action.payload.listType,
        },
    });
}

export function* watchDeleteItem() {
    yield takeEvery(E_SAGA_TYPES.SAGA_DELETE_ITEM, workerDeleteItem);
}
