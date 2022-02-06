export enum E_DIRECTION {
    ASC = 'asc',
    DESC = 'desc',
}

export enum E_ITEM {
    CAR = 'car',
    OWNER = 'owner',
}

export enum E_ITEM_LIST {
    CARS = 'cars',
    OWNERS = 'owners',
}

export const itemType = (listType: E_ITEM_LIST): E_ITEM => {
    switch (listType) {
        case E_ITEM_LIST.CARS:
            return E_ITEM.CAR;
        case E_ITEM_LIST.OWNERS:
            return E_ITEM.OWNER;
    }
};

export const itemIdType = (listType: E_ITEM_LIST | E_ITEM): E_ITEM_ID => {
    switch (listType) {
        case E_ITEM.CAR:
        case E_ITEM_LIST.CARS:
            return E_ITEM_ID.CAR;
        case E_ITEM.OWNER:
        case E_ITEM_LIST.OWNERS:
            return E_ITEM_ID.OWNER;
    }
};

export enum E_ITEM_ID {
    CAR = 'car_pk',
    OWNER = 'owner_pk',
}

// export enum E_LIST {
//     CARS = 'cars',
//     OWNERS = 'owners',
// }
// export enum E_DETAIL {
//     CAR = 'car',
//     OWNER = 'owner',
// }

export enum E_GENDER {
    MALE = 'm',
    FEMALE = 'f',
}

export enum E_BASE_ITEM {
    ID = 'id',
    COMMENT = 'comment',
    // API_KEY = 'api_key',
}

export enum E_CAR_ITEM {
    MODEL = 'model',
    MANUFACTURER = 'manufacturer',
    PRODUCTION = 'production',
    COLOR = 'color',
    POWER = 'power',
    MILEAGE = 'mileage',
    OWNER = 'owner_pk',
    // COMMENT = 'comment',
}

export enum E_OWNER_ITEM {
    NAME = 'name',
    PATRONYMIC = 'patronymic',
    LAST_NAME = 'last_name',
    GENDER = 'gender',
    AGE = 'age',
    CARS = 'cars',
}

export type TOnClick = ((event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void) | undefined;

export type TSortedBy = {
    name: string;
    direction: E_DIRECTION;
};

export type TItemFunctions = {
    item: TItem | null;
    loadItem: () => void;
    saveItem: (back?: boolean) => void;
    changeItem: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    changeItemData: <K extends keyof TItem>(name: string, value: any) => void;
    changeGender: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type TItemInfo = {
    item_api_url: string;
    list_api_url: string;
    detailUrl: string;
    idKey: string;
    tooltipPlace: string;
    nameOfItem: string;
    addButton: boolean;
    itemInfo: (item: TItem) => string;
    getTable: (items: TItem[], getButtons: Function, onClick: TOnClick, sortedBy: TSortedBy) => JSX.Element;
    getDefaultSortedBy: () => TSortedBy;
    getNewItemId: () => number;
    getNewItem: () => TItem;
    verifyItem: (item: TItem) => TItem | null;
};

// export type TItemInfo<T> = {
//     url: string;
//     // detailUrl: string;
//     idKey: string;
//     tooltipPlace: string;
//     getNewItemId: () => number;
//     getNewItem: () => T;
//     verifyItem: (item: T) => T | null;
// };

export type TListFunctions = {
    [E_ITEM_LIST.CARS]: TItemInfo;
    [E_ITEM_LIST.OWNERS]: TItemInfo;
};

export type TListOfItemsProps = {
    listType: E_ITEM_LIST;
    owner?: number;
    withAlerts?: boolean;
    // itemInfo?: TItemInfo;
};

// export type TListItems<TItem> = Array<TItem>;

export type TLoadItemsProps = {
    url: string;
    // sortedBy: TSortedBy;
    owner?: number;
};

export type TDeleteItemProps = {
    url: string;
    item_pk: number;
    owner_pk: number;
    listType: E_ITEM_LIST;
};

export type TLoadItemProps = {
    url: string;
    item_pk: number;
};

export type TSaveItemProps = {
    url: string;
    item_pk: number;
    owner_pk: number;
    item: TItem;
};

export type TListType = E_ITEM_LIST;

import { ChangeEvent } from 'react';

export type TGender = E_GENDER;

export enum E_ITEM_KEY {
    CAR = 'car_pk',
    OWNER = 'owner_pk',
}

// export type TItemKey = E_ITEM_KEY;

export type TBaseItem = {
    [E_BASE_ITEM.ID]: number;
    [E_BASE_ITEM.COMMENT]?: string;
    // [E_BASE_ITEM.API_KEY]: TItemKey;
};

// export type TBaseItem = {
//     id: number;
//     comment?: string;
//     // [E_BASE_ITEM.API_KEY]: TItemKey;
// };

export type TCarItem = TBaseItem & {
    [E_CAR_ITEM.MODEL]: string;
    [E_CAR_ITEM.MANUFACTURER]: string;
    [E_CAR_ITEM.PRODUCTION]: string;
    [E_CAR_ITEM.COLOR]: string;
    [E_CAR_ITEM.POWER]: number | undefined;
    [E_CAR_ITEM.MILEAGE]: number | undefined;
    [E_CAR_ITEM.OWNER]: number;
};

// export type TCarItem = TBaseItem & {
//     model: string;
//     manufacturer: string;
//     prodaction: string;
//     color: string;
//     power: number | undefined;
//     mileage: number | undefined;
// };

export type TOwnerItem = TBaseItem & {
    [E_OWNER_ITEM.NAME]: string;
    [E_OWNER_ITEM.PATRONYMIC]: string;
    [E_OWNER_ITEM.LAST_NAME]: string;
    [E_OWNER_ITEM.GENDER]: TGender;
    [E_OWNER_ITEM.AGE]: number | undefined;
    [E_OWNER_ITEM.CARS]: TCarItem[];
};

export type TItem = TCarItem | TOwnerItem;

export type TItemsInfo = {
    [E_ITEM.CAR]: TItemInfo;
    [E_ITEM.OWNER]: TItemInfo;
};

export type TItems = {
    [E_ITEM.CAR]: TCarItem;
    [E_ITEM.OWNER]: TOwnerItem;
};

export type TItemType = E_ITEM;

export type TItemsProps<T> = {
    // owner?: number;
    // withAlerts?: boolean;
    itemInfo: TItemInfo;
};

export type TSetItem<T> = (item: T) => void;

export type TReduxState = {
    loading: boolean;
    [E_ITEM_LIST.OWNERS]: TOwnerItem[];
    [E_ITEM_LIST.CARS]: TCarItem[];
    [E_ITEM.OWNER]: TOwnerItem;
    [E_ITEM.CAR]: TCarItem;
    [E_ITEM_ID.OWNER]: number;
    [E_ITEM_ID.CAR]: number;
};

export type TReduxStateKeys = keyof TReduxState;
export type TOwnerItemKeys = keyof TOwnerItem;
export type TItemKeys = keyof TItem;
