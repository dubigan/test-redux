import React from 'react';
import { ThCell } from '../parts/ThCell';
import { Table } from '../lib/Table/Table';
import { TItem, TOnClick, TOwnerItem, TSortedBy } from '../types/types';

const getTable = (items: TItem[], getButtons: Function, onClick: TOnClick, sortedBy: TSortedBy) => {
    // console.log('getTable', items);
    return (
        <Table className="table table_striped table_bordered table_hover">
            <thead>
                <tr>
                    <ThCell id="last_name" title="Фамилия" index={1} onClick={onClick} sortedBy={sortedBy} />
                    <ThCell id="name" title="Имя" index={2} onClick={onClick} sortedBy={sortedBy} />
                    <th id="patronymic">Отчество</th>
                    <ThCell id="gender" title="Пол" index={4} onClick={onClick} sortedBy={sortedBy} />
                    <ThCell id="age" title="Возраст" index={4} onClick={onClick} sortedBy={sortedBy} />
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items?.map((item, index: number) => {
                    const it = item as TOwnerItem;
                    return (
                        <tr key={index}>
                            <td>{it.last_name}</td>
                            <td>{it.name}</td>
                            <td>{it.patronymic}</td>
                            <td>{it.gender === 'f' ? 'Жен' : 'Муж'}</td>
                            <td>{it.age}</td>
                            <td style={{ width: 100 + 'px' }}>{getButtons(String(it.id))}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default getTable;
