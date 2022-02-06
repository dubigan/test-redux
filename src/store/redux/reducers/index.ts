import { TItemKeys } from './../../../components/types/types';
import {
    E_ITEM,
    E_ITEM_ID,
    E_ITEM_LIST,
    TCarItem,
    TItem,
    TOwnerItem,
    TReduxState,
    TReduxStateKeys,
} from '../../../components/types/types';
import { EMPTY_OWNER, EMPTY_CAR, EMPTY_CAR_ID, EMPTY_OWNER_ID } from './../../../components/Detail/useItemInfo';
import { E_REDUX_TYPES } from './../types';

export const initialState: TReduxState = {
    loading: false,
    [E_ITEM_LIST.OWNERS]: [],
    [E_ITEM_LIST.CARS]: [],
    [E_ITEM.OWNER]: EMPTY_OWNER,
    [E_ITEM.CAR]: EMPTY_CAR,
    [E_ITEM_ID.OWNER]: EMPTY_OWNER_ID,
    [E_ITEM_ID.CAR]: EMPTY_CAR_ID,
};

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case E_REDUX_TYPES.LOADING:
            // console.log('reducer loading', action.payload);
            return {
                ...state,
                loading: action.payload,
            };
        case E_REDUX_TYPES.LOAD_ITEMS:
            // console.log('reducer.load-items', action);
            return {
                ...state,
                [action.payload.listType]: action.payload.data,
            };
        case E_REDUX_TYPES.LOAD_ITEM:
            // console.log('reducer.loadItem', action.payload);
            return {
                ...state,
                [action.payload.itemType]: action.payload.data,
            };
        case E_REDUX_TYPES.DELETE_ITEM:
            return {
                ...state,
                [action.payload.listType]: action.payload.data,
            };

        case E_REDUX_TYPES.SET_ITEM_ID:
            return {
                ...state,
                [action.payload.itemIdType]: action.payload.data,
            };
        case E_REDUX_TYPES.CHANGE_ITEM:
            let st: TReduxState = { ...state };
            const item: TItem = { ...st[action.payload.itemType as E_ITEM] };
            // console.log('reducer.changeItem item', item);
            // @ts-ignore
            item[action.payload.name as TItemKeys] = action.payload.data;
            // @ts-ignore
            st[action.payload.itemType as TReduxStateKeys] = item;
            // console.log('reducer.changeItem state', st);
            return st;
        default:
            return state;
    }
}
