import { useDispatch, useSelector } from 'react-redux';
import useItemInfo from '../../components/Detail/useItemInfo';
import { E_ITEM, E_ITEM_ID, itemIdType, TItem, TReduxState } from '../../components/types/types';
import { E_REDUX_TYPES, E_SAGA_TYPES } from './types';
import useItemIdStore from './useItemIdStore';

type TItemStore = {
    loadItem: () => void;
    saveItem: () => void;
    changeItemData: (name: string, data: any) => void;
    item: TItem | null;
};

const useItemStore = (itemType: E_ITEM): TItemStore => {
    const dispatch = useDispatch();
    const item = useSelector((state: TReduxState) => state[itemType]);
    const { item_pk } = useItemIdStore(itemIdType(itemType));
    const { item_pk: owner_pk } = useItemIdStore(E_ITEM_ID.OWNER);
    const itemInfo = useItemInfo(itemType);
    const changeItemData = (name: string, data: any) =>
        dispatch({
            type: E_REDUX_TYPES.CHANGE_ITEM,
            payload: {
                data,
                name,
                itemType,
            },
        });
    const loadItem = () => {
        dispatch({
            type: E_SAGA_TYPES.SAGA_LOAD_ITEM,
            payload: {
                data: {
                    url: itemInfo.item_api_url,
                    item_pk,
                },
                itemType,
            },
        });
    };
    const saveItem = () => {
        dispatch({
            type: E_SAGA_TYPES.SAGA_SAVE_ITEM,
            payload: {
                data: {
                    url: itemInfo.item_api_url,
                    owner_pk,
                    item: itemInfo.verifyItem(item),
                },
                itemType,
            },
        });
    };
    return {
        loadItem,
        saveItem,
        changeItemData,
        item,
    };
};

export default useItemStore;
