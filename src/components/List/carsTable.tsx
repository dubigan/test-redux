import React from 'react';
import { ThCell } from '../parts/ThCell';
import { Table } from '../lib/Table/Table';
import { TCarItem, TItem, TOnClick, TSortedBy } from '../types/types';

const getTable = (items: TItem[], getButtons: Function, onClick: TOnClick, sortedBy: TSortedBy) => {
    return (
        <Table className="table table_striped table_bordered table_hover">
            <thead>
                <tr>
                    <ThCell id="manufacturer" title="Производитель" index={1} onClick={onClick} sortedBy={sortedBy} />
                    <ThCell id="model" title="Модель" index={2} onClick={onClick} sortedBy={sortedBy} />
                    <ThCell id="production" title="Дата выпуска" index={3} onClick={onClick} sortedBy={sortedBy} />
                    <ThCell id="color" title="Цвет" index={4} onClick={onClick} sortedBy={sortedBy} />
                    <ThCell id="power" title="Мощность" index={5} onClick={onClick} sortedBy={sortedBy} />
                    <ThCell id="mileage" title="Пробег" index={6} onClick={onClick} sortedBy={sortedBy} />
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index: number) => {
                    const it = item as TCarItem;
                    return (
                        <tr key={index}>
                            <td>{it.manufacturer}</td>
                            <td>{it.model}</td>
                            <td>{it.production}</td>
                            <td>{it.color}</td>
                            <td>{it.power}</td>
                            <td>{it.mileage}</td>
                            <td style={{ width: 10 + 'rem' }}>{getButtons(String(it.id))}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default getTable;
