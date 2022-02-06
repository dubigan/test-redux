import React from 'react';
import ListOfItems from '../../components/List/ListOfItems';
import Header from '../../components/Header/Header';
import { E_ITEM_LIST, TListOfItemsProps } from '../../components/types/types';

const Owners = (props: TListOfItemsProps) => {
    return (
        <>
            <ListOfItems listType={E_ITEM_LIST.OWNERS} />
        </>
    );
};

export default Owners;
