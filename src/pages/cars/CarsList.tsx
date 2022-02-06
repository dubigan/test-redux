import React from 'react';
import ListOfItems from '../../components/List/ListOfItems';
import { E_ITEM_LIST, TListOfItemsProps } from '../../components/types/types';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { req } = context;
//   console.log('getServerSideProps', req);
//   // const res = await api.queryServer(req.url ?? '', {});

//   return { props: {} };
// };

const Cars = (props: TListOfItemsProps) => {
    return (
        <>
            <ListOfItems listType={E_ITEM_LIST.CARS} owner={props.owner} withAlerts={props.withAlerts} />
        </>
    );
};

export default Cars;
