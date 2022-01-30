import React, { MouseEvent, useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Row } from '../lib/Row/Row';
import { TooltipContent } from '../lib/Tooltip';
import { Button } from '../lib/Button/Button';
import Alerts from '../lib/alert/Alerts';
import { useAlerts } from '../lib/alert/AlertContext';
import Loader from '../Loader/Loader';
import api from '../../pages/api/api';
import { getErrors } from '../lib/utils/utils';
import { E_DIRECTION, TSortedBy } from './ListTypes';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import { TListOfItemsProps } from './ListTypes';
import { TBaseItem } from '../Detail/DetailTypes';
import { observer } from 'mobx-react-lite';
// import Loading from '../../store/Loading';
import useListStore from '../../store/mobx/useListStore';
import { CAR_URL_API } from '../Detail/useItemInfo';
import useLoading from '../../store/mobx/useLoading';

const ListOfItems = observer(<TItem extends TBaseItem>(props: TListOfItemsProps<TItem>) => {
    const context = useAlerts();
    const listStore = useListStore<TItem>();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<TItem | undefined>(undefined);
    const [sortedBy, setSortedBy] = useState<TSortedBy>(props.functions!.getDefaultSortedBy());
    // const [loading, setLoading] = useState(false);
    const history = useRouter();
    const loading = useLoading();
    // console.log('ListOfItems props', props);

    useEffect(() => {
        const loadItems = async () => {
            loading.loading = true;
            //console.log('getItems owner', this.props.owner);
            try {
                await listStore.loadItems({ url: props.functions!.url, sortedBy, owner: props.owner ?? -1 });
            } catch (e: any) {
                context.setAlerts(e);
            } finally {
                // setLoading(false);
                loading.loading = false;
            }
        };
        loadItems();
        // console.log('ListOfItems.getItems items', itemsStore.items);
    }, [listStore, sortedBy, props.owner]);

    const getItemById = (id: number) => {
        return listStore.list.filter((item: any) => +item.id === +id)[0];
    };

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
        sessionStorage.removeItem(props.functions!.idKey);
        history.push(props.functions!.detailUrl);
        // try {
        //     const res = await api.queryServer(props.functions.url, { btn_add: "" });
        //     redirect(history, res.data.redirect);
        // } catch (err) {
        //     context.setAlerts({ messages: getErrors(err.response?.data) });
        // }
    };

    const btnEditClick = (e: MouseEvent<HTMLButtonElement>) => {
        const item_pk = (e.target as HTMLButtonElement).value;

        sessionStorage.setItem(props.functions!.idKey, item_pk);
        history.push(props.functions!.detailUrl);
    };

    const getItemId = (item: TItem | undefined): number => (item ? item.id : -1);

    const deleteItem = async (confirm: string) => {
        setShowDeleteDialog(false);

        if (confirm === 'true') {
            // setLoading(true);
            loading.loading = true;
            try {
                const res = await listStore.deleteItem({
                    url: props.functions!.url,
                    item_pk: getItemId(itemToDelete),
                    owner_pk: props.owner ?? -1,
                });
                // setItems(res.data);
                context.setAlerts({
                    type: 'success',
                    message: `${props.functions!.nameOfItem} успешно удален`,
                });
            } catch (e: any) {
                context.setAlerts(e);
            } finally {
                // setLoading(false);
                loading.loading = false;
            }
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
        if (props.functions!.addButton)
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
                    nameOfItem={props.functions!.nameOfItem}
                    itemToDelete={itemToDelete!}
                    deleteItem={deleteItem}
                    itemInfo={props.functions!.itemInfo}
                    onClose={() => setShowDeleteDialog(false)}
                />
            )}
            {loading.loading ? (
                <Loader />
            ) : (
                <>
                    {props.functions!.getTable(listStore.list, getButtons, btnSortClick, sortedBy)}
                    {getAddButton()}
                </>
            )}
        </div>
    );
});

export default ListOfItems;
