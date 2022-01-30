import { E_DETAIL, TBaseItem } from '../../components/Detail/DetailTypes';

type TItemStore<T> = {
    loadItem: () => void;
    saveItem: () => void;
    changeItemData: (name: string, datra: string) => void;
    item: T | null;
};

const useItemStore = <T extends TBaseItem>(itemType: E_DETAIL): TItemStore<T> => {
    return {
        loadItem: () => {},
        saveItem: () => {},
        changeItemData: (name, data) => {},
        item: null,
    };
};

export default useItemStore;
