import { useDispatch, useSelector } from 'react-redux';
import { E_ITEM_ID, TReduxState } from '../../components/types/types';
import { E_REDUX_TYPES } from './types';

const useItemIdStore = (itemIdType: E_ITEM_ID) => {
    // const dispatch = useDispatch();
    // const setItemId = (data: number) => {
    //     dispatch({ type: E_REDUX_TYPES.SET_ITEM_ID, payload: { data, itemIdType } });
    // };
    // const itemId = useSelector((state: TReduxState) => state[itemIdType]);
    const itemId = () => {
        if (typeof window !== 'undefined') return Number(sessionStorage.getItem(itemIdType));
        return -1;
    };
    const setItemId = (data: number) => {
        if (typeof window !== 'undefined') sessionStorage.setItem(itemIdType, data.toString());
    };
    return {
        item_pk: itemId(),
        setItemPk: setItemId,
    };
};

export default useItemIdStore;
