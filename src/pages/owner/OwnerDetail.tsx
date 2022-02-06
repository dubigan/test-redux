import React, { ChangeEvent, useEffect } from 'react';
import { useItemFunctions } from '../../components/Detail/useItemFunctions';
import Cars from '../cars';
import Alerts from '../../components/lib/alert/Alerts';
import Card from '../../components/lib/Card/Card';
import { Row } from '../../components/lib/Row/Row';
import { Button } from '../../components/lib/Button/Button';
import Form from '../../components/lib/Form/Form';
import GenderSelect from '../../components/lib/GenderSelect/GenderSelect';
import { TooltipContent } from '../../components/lib/Tooltip';
import useItemInfo, { EMPTY_CAR_ID } from '../../components/Detail/useItemInfo';
import { digitsOnly, redirect } from '../../components/lib/utils/utils';
import { TextField } from '../../components/lib/input/TextField';
import { TextArea } from '../../components/lib/input/TextArea';
import api from '../api/api';
import { useRouter } from 'next/router';
import { useAlerts } from '../../components/lib/alert/AlertContext';
import {
    E_GENDER,
    E_ITEM,
    E_ITEM_ID,
    E_ITEM_KEY,
    E_ITEM_LIST,
    TGender,
    TOwnerItem,
} from '../../components/types/types';
import useItemIdStore from '../../store/redux/useItemIdStore';

const OwnerDetail = () => {
    const history = useRouter();
    const context = useAlerts();

    const { loadItem, saveItem, changeItem, changeItemData, item } = useItemFunctions(E_ITEM.OWNER);
    const owner = item as TOwnerItem;
    const { setItemPk: setOwnerPk } = useItemIdStore(E_ITEM_ID.OWNER);
    const { setItemPk: setCarPk } = useItemIdStore(E_ITEM_ID.CAR);
    const itemInfo = useItemInfo(E_ITEM.OWNER);

    const saveItemWithoutBack = () => () => saveItem(false);

    const btnNewCarClick = async () => {
        if (!owner) return;
        setOwnerPk(owner.id);
        setCarPk(EMPTY_CAR_ID);
        try {
            const res = await api.queryServer(itemInfo.item_api_url, {
                btn_add: '',
                // url: window.location.pathname,
                // owner_pk: item!.id,
            });
            redirect(history, res.data.redirect);
        } catch (e: any) {
            context.setAlerts(e);
        }
    };

    const stringToGender = (value: string): TGender => {
        if (value.startsWith(E_GENDER.FEMALE)) return E_GENDER.FEMALE;
        return E_GENDER.MALE;
    };

    const changeGender = (e: ChangeEvent<HTMLInputElement>) => {
        changeItemData('gender', stringToGender(e.target.value));
        // console.log('OwnerDetail.changeGender.item', e.target.value, item);
    };

    useEffect(() => {
        loadItem();
    }, []);

    return (
        <div>
            <Alerts />
            <Card>
                <Card.Title>Автовладелец</Card.Title>
                <Card.Body>
                    <Row>
                        <div className="form">
                            <Form.Group className="form__group form__group_owner-input">
                                <TextField
                                    select={false}
                                    name="name"
                                    value={owner?.name ?? ''}
                                    placeholder="Имя"
                                    onChange={changeItem}
                                />
                                <TextField
                                    name="patronymic"
                                    value={owner?.patronymic ?? ''}
                                    placeholder="Отчество"
                                    onChange={changeItem}
                                />
                                <TextField
                                    name="last_name"
                                    type="text"
                                    placeholder="Фамилия"
                                    value={owner?.last_name ?? ''}
                                    onChange={changeItem}
                                />
                                <GenderSelect name="gender" checkValue={owner?.gender ?? ''} onChange={changeGender} />
                                <TextField
                                    name="age"
                                    maxLength={3}
                                    placeholder="Возраст"
                                    value={owner?.age ?? ''}
                                    onChange={changeItem}
                                    onKeyPress={digitsOnly}
                                />
                            </Form.Group>
                            <Form.Group className="form__group form__group_owner-comment">
                                <TextArea
                                    rows={14}
                                    value={owner?.comment ?? ''}
                                    name="comment"
                                    placeholder="Комментарий"
                                    onChange={changeItem}
                                />
                            </Form.Group>
                        </div>
                    </Row>
                    <hr />
                    <Button
                        className="btn-primary btn-primary_owner-save tooltip"
                        variant="primary"
                        onClick={saveItemWithoutBack()}
                    >
                        <TooltipContent>Сохранить&nbsp;информацию&nbsp;об&nbsp;автовладельце</TooltipContent>
                        Сохранить
                    </Button>
                </Card.Body>
            </Card>
            <Card>
                <Card.Title>Автомобили</Card.Title>
                <Card.Header>
                    <Row>
                        <Button
                            variant="primary"
                            className="btn-primary btn-primary_owner-add-car tooltip"
                            name="add_car"
                            onClick={btnNewCarClick}
                            disabled={(owner?.id ?? -1) < 0}
                        >
                            <TooltipContent>Добавить&nbsp;автомобиль</TooltipContent>
                            Добавить автомобиль
                        </Button>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Cars withAlerts={false} owner={item?.id} listType={E_ITEM_LIST.CARS} />
                </Card.Body>
            </Card>
        </div>
    );
};

export default OwnerDetail;
