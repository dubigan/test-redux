import React, { MouseEvent, useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Row } from '../lib/Row/Row';
import { TooltipContent } from '../lib/Tooltip';
import { Button } from '../lib/Button/Button';
import Alerts from '../lib/alert/Alerts';
import Loader from '../Loader/Loader';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import useListStore from '../../store/redux/useListStore';
import { E_DIRECTION, itemIdType, itemType, TItem, TListOfItemsProps, TSortedBy } from '../types/types';
import useItemInfo from '../Detail/useItemInfo';
import useItemIdStore from '../../store/redux/useItemIdStore';

const ListOfItems = (props: TListOfItemsProps) => {
    const { loadItems, deleteItem, list, loading } = useListStore(props.listType);
    // console.log('ListOfItems loading', loading);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<TItem | undefined>(undefined);
    const itemInfo = useItemInfo(itemType(props.listType));
    const [sortedBy, setSortedBy] = useState<TSortedBy>(itemInfo!.getDefaultSortedBy());
    // const [loading, setLoading] = useState(false);
    const history = useRouter();
    const { setItemPk } = useItemIdStore(itemIdType(props.listType));
    // console.log('ListOfItems props', props);

    useEffect(() => {
        loadItems({ url: itemInfo!.list_api_url, owner: props.owner ?? -1 });
        // console.log('ListOfItems.loadItems list', list);
    }, [props.owner, props.listType]);

    const getItemById = (id: number) => list.find((item) => item.id === id);

    const btnSortClick = (e: MouseEvent<HTMLElement>) => {
        const sorted_name = (e.target as HTMLElement).id;
        //console.log('btnSortClick.sorted_name', sorted_name);

        if (!sorted_name) return;
        if (sortedBy.name !== sorted_name) {
            setSortedBy({
                name: sorted_name,
                direction: E_DIRECTION.DESC,
            });
        } else {
            const direction = sortedBy.direction === E_DIRECTION.DESC ? E_DIRECTION.ASC : E_DIRECTION.DESC;
            setSortedBy({
                ...sortedBy,
                direction: direction,
            });
        }
    };

    const btnDelClick = (e: MouseEvent<HTMLButtonElement>) => {
        const item = getItemById(Number((e.target as HTMLButtonElement).value));
        // console.log('ListOfItems.btnDelClick item', item);
        setItemToDelete(item);
        setShowDeleteDialog(true);
    };

    const btnAddClick = async (e: MouseEvent<HTMLElement>) => {
        setItemPk(-1);
        history.push(itemInfo!.detailUrl);
        // try {
        //     const res = await api.queryServer(props.functions.url, { btn_add: "" });
        //     redirect(history, res.data.redirect);
        // } catch (err) {
        //     context.setAlerts({ messages: getErrors(err.response?.data) });
        // }
    };

    const btnEditClick = (e: MouseEvent<HTMLButtonElement>) => {
        const item_pk = +(e.target as HTMLButtonElement).value;

        setItemPk(item_pk);
        history.push(itemInfo!.detailUrl);
    };

    const getItemId = (item: TItem | undefined): number => (item ? item.id : -1);

    const delItem = (confirm: string) => {
        setShowDeleteDialog(false);

        if (confirm === 'true') {
            deleteItem({
                url: itemInfo!.list_api_url,
                item_pk: getItemId(itemToDelete),
                owner_pk: props.owner ?? -1,
                listType: props.listType,
            });
        }
    };

    const getButtons = (id: string) => {
        return (
            <Row>
                <Button value={id} variant="primary" className="btn-primary tooltip" onClick={btnEditClick}>
                    <TooltipContent className="tooltip__content tooltip__content_left">Редактирование</TooltipContent>
                    {'\u27f6'}
                </Button>
                <Button value={id} variant="danger" className="btn-danger btn-danger_del tooltip" onClick={btnDelClick}>
                    <TooltipContent className="tooltip__content tooltip__content_left">Удаление</TooltipContent>
                    &times;
                </Button>
            </Row>
        );
    };

    const getAddButton = () => {
        if (itemInfo!.addButton)
            return (
                <Button variant="primary" className="btn-primary btn-primary_add tooltip" onClick={btnAddClick}>
                    <TooltipContent>Добавление&nbsp;нового&nbsp;автовладельца</TooltipContent>+
                </Button>
            );
        return <></>;
    };

    return (
        <div>
            <Alerts withAlerts={props.withAlerts ?? true} />
            {showDeleteDialog && (
                <DeleteDialog
                    nameOfItem={itemInfo!.nameOfItem}
                    itemToDelete={itemToDelete!}
                    deleteItem={delItem}
                    itemInfo={itemInfo!.itemInfo}
                    onClose={() => setShowDeleteDialog(false)}
                />
            )}
            {loading ? (
                <Loader />
            ) : (
                <>
                    {itemInfo!.getTable(list, getButtons, btnSortClick, sortedBy)}
                    {getAddButton()}
                </>
            )}
        </div>
    );
};

export default ListOfItems;
