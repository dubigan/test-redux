import { useSelector, useDispatch } from 'react-redux';
import useItemInfo from '../../components/Detail/useItemInfo';
import { useAlerts } from '../../components/lib/alert/AlertContext';
import {
    E_ITEM_LIST,
    itemType,
    TDeleteItemProps,
    TItem,
    TLoadItemsProps,
    TReduxState,
} from '../../components/types/types';
import { E_SAGA_TYPES } from '../redux/types';
import useLoading from './useLoading';

type TListStore = {
    loadItems: (props: TLoadItemsProps) => void;
    deleteItem: (props: TDeleteItemProps) => void;
    list: TItem[];
    loading: boolean;
};

const useListStore = (listType: E_ITEM_LIST): TListStore => {
    const dispatch = useDispatch();
    const list = useSelector((state: TReduxState) => state[listType]);
    const context = useAlerts();
    const itemInfo = useItemInfo(itemType(listType));

    const { loading, setLoading } = useLoading();

    const deleteItem = (props: TDeleteItemProps) => {
        try {
            dispatch({ type: E_SAGA_TYPES.SAGA_DELETE_ITEM, payload: { data: props, listType } });
            // setItems(res.data);
            context.setAlerts({
                type: 'success',
                message: `${itemInfo!.nameOfItem} успешно удален`,
            });
        } catch (e: any) {
            context.setAlerts(e);
        }
    };

    const loadItems = async (props: TLoadItemsProps) => {
        try {
            // await listStore.loadItems({ url: props.functions!.url, owner: props.owner ?? -1 });
            dispatch({ type: E_SAGA_TYPES.SAGA_LOAD_ITEMS, payload: { data: props, listType } });
        } catch (e: any) {
            context.setAlerts(e);
        }
    };
    // console.log('useListStore', store);
    return {
        loadItems,
        deleteItem,
        list,
        loading,
    };
};

export default useListStore;
