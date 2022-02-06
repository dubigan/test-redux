import { E_REDUX_TYPES, E_SAGA_TYPES } from './../types';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import api from '../../../pages/api/api';
import { E_ITEM_LIST, TItem, TLoadItemsProps } from '../../../components/types/types';
import { setLoading } from '.';

type TLoadItemsAction = {
    type: E_SAGA_TYPES;
    payload: TItem[];
    listType: E_ITEM_LIST;
};

const loadItems = async (props: TLoadItemsProps): Promise<TItem[]> => {
    const { url, owner } = props;
    const params = {
        owner,
    };
    const res = await api.queryServer(url, params);
    return res.data as TItem[];
};

export function* workerLoadItems(action: any) {
    console.log('workerLoadItems action', action);
    yield call(setLoading, true);
    yield delay(5000);
    const items: TItem[] = yield call(loadItems, action.payload.data);
    // console.log('workerLoadItems items', items);
    yield put({
        type: E_REDUX_TYPES.LOAD_ITEMS,
        payload: {
            data: items,
            listType: action.payload.listType,
        },
    });
    yield call(setLoading, false);

    // yield put({
    //     type: E_REDUX_TYPES.LOADING,
    //     payload: false,
    // });
}

export function* watchLoadItems() {
    console.log('watchLoadItemsSaga');
    yield takeEvery(E_SAGA_TYPES.SAGA_LOAD_ITEMS, workerLoadItems);
}
