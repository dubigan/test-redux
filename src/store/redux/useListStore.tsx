import { TBaseItem } from '../../components/Detail/DetailTypes';
import { TDeleteItemProps, TLoadItemsProps } from '../../components/List/ListTypes';

type TListStore<T> = {
    loadItems: (props: TLoadItemsProps) => void;
    deleteItem: (props: TDeleteItemProps) => void;
    list: T[];
};

const useListStore = <T extends TBaseItem>(): TListStore<T> => {
    return {
        loadItems: (props: TLoadItemsProps) => {},
        deleteItem: (props: TDeleteItemProps) => {},
        list: [],
    };
};

export default useListStore;
