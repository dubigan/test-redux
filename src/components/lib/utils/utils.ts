import { E_ALERT } from './../alert/AlertTypes';
import { KeyboardEvent } from 'react';
import { TError, TAlertsState } from '../alert/AlertTypes';

const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

export const getErrors = (data: Object): TError[] => {
    if (!data) return [{ type: E_ALERT.ERROR, message: 'Unknown error' }];
    return Object.keys(data).map((key: any) => {
        // console.log("utils.getErrors", getKeyValue(data, key));
        return { type: E_ALERT.ERROR, message: getKeyValue(data, key) };
    });
};

export const redirect = (history: any, redirect: string, dir = '') => {
    // console.log("utils.redirect", redirect);
    redirect && (dir === 'back' ? history.back() : history.push(redirect));
};

export const digitsOnly = (e: KeyboardEvent<Element>) => {
    let charCode = e.code;
    //console.log(charCode);
    if (+charCode < 48 || +charCode > 57) {
        // digits only
        e.preventDefault();
    }
};

export const getKey = () => Math.ceil(Math.random() * 1000000);
