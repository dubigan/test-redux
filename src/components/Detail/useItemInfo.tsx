import {
    E_BASE_ITEM,
    E_CAR_ITEM,
    E_DIRECTION,
    E_GENDER,
    E_ITEM,
    E_OWNER_ITEM,
    TCarItem,
    TItem,
    TItemsInfo,
    TItemType,
    TOwnerItem,
    TSortedBy,
} from '../types/types';
import getCarsTable from '../List/carsTable';
import getOwnersTable from '../List/ownersTable';

export const EMPTY_CAR_ID = -1;
export const EMPTY_CAR: TCarItem = {
    [E_BASE_ITEM.ID]: EMPTY_CAR_ID,
    [E_CAR_ITEM.MANUFACTURER]: '',
    [E_CAR_ITEM.MODEL]: '',
    [E_CAR_ITEM.PRODUCTION]: new Date().toLocaleDateString('ru'),
    [E_CAR_ITEM.COLOR]: '',
    [E_CAR_ITEM.POWER]: undefined,
    [E_CAR_ITEM.MILEAGE]: undefined,
    [E_BASE_ITEM.COMMENT]: '',
    [E_CAR_ITEM.OWNER]: -1,
    // [E_BASE_ITEM.KEY]: E_ITEM_KEY.CAR,
};

export const EMPTY_OWNER_ID = -10;
//const UNDEFINED_OWNER = -1;

export const EMPTY_OWNER: TOwnerItem = {
    [E_BASE_ITEM.ID]: EMPTY_OWNER_ID, // indicate new owner, -1 means undefined owner
    [E_OWNER_ITEM.CARS]: [],
    [E_OWNER_ITEM.NAME]: '',
    [E_OWNER_ITEM.PATRONYMIC]: '',
    [E_OWNER_ITEM.LAST_NAME]: '',
    [E_OWNER_ITEM.GENDER]: E_GENDER.FEMALE,
    [E_OWNER_ITEM.AGE]: undefined,
    [E_BASE_ITEM.COMMENT]: '',
    // [E_BASE_ITEM.KEY]: E_ITEM_KEY.OWNER,
};

export const CAR_URL_API = '/api/car/';
export const CARS_URL_API = '/api/cars/';
export const CAR_API_KEY = 'car_pk';
export const OWNER_URL_API = '/api/owner/';
export const OWNERS_URL_API = '/api/owners/';
export const OWNER_API_KEY = 'owner_pk';

const itemsInfo: TItemsInfo = {
    [E_ITEM.CAR]: {
        item_api_url: CAR_URL_API,
        list_api_url: CARS_URL_API,
        detailUrl: '/car',
        idKey: CAR_API_KEY,
        tooltipPlace: 'bottom',
        nameOfItem: 'Автомобиль',
        addButton: false,

        itemInfo: (item: TItem) => [(item as TCarItem).manufacturer, (item as TCarItem).model].join(' '),
        getTable: getCarsTable,

        getDefaultSortedBy: () =>
            ({
                name: 'model',
                direction: E_DIRECTION.ASC,
            } as TSortedBy),

        getNewItemId: (): number => EMPTY_CAR_ID,
        getNewItem: () => {
            return EMPTY_CAR;
        },
        verifyItem: (item: TItem) => {
            // if (item.id < 0) return null;
            const it = item as TCarItem;
            it.power = it.power ?? 0;
            it.mileage = it.mileage ?? 0;
            return item;
        },
    },
    [E_ITEM.OWNER]: {
        item_api_url: OWNER_URL_API,
        list_api_url: OWNERS_URL_API,
        detailUrl: '/owner',
        idKey: OWNER_API_KEY,
        tooltipPlace: 'bottom',
        nameOfItem: 'Автовладелец',
        addButton: true,

        itemInfo: (item: TItem) => {
            const it = item as TOwnerItem;
            return [it.last_name, it.name, it.patronymic].join(' ');
        },
        getTable: getOwnersTable,

        getDefaultSortedBy: () =>
            ({
                name: 'last_name',
                direction: E_DIRECTION.ASC,
            } as TSortedBy),

        getNewItemId: (): number => EMPTY_OWNER_ID,
        getNewItem: () => {
            return EMPTY_OWNER;
        },
        verifyItem: (item: TItem) => {
            const it = item as TOwnerItem;
            it.age = it.age ?? 0;
            return item;
        },
    },
};

const useItemInfo = (detailType: TItemType) => {
    return itemsInfo[detailType];
};

export default useItemInfo;
