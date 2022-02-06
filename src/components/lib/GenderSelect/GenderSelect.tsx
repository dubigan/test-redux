import React from 'react';
import { E_GENDER } from '../../types/types';
import ToggleButtonGroup, { TToggleButtonGroupProps, TToggleButtonGroup } from '../input/ToggleButtons.styled';

const GenderSelect: TToggleButtonGroup = (props: TToggleButtonGroupProps) => {
    return (
        <ToggleButtonGroup
            name={props.name ? props.name : 'gender'}
            values={props.values ? props.values : GenderSelect.values}
            //type="radio"
            checkValue={props.checkValue}
            onChange={props.onChange}
        />
    );
};

GenderSelect.values = [
    { label: 'Муж', value: E_GENDER.MALE },
    { label: 'Жен', value: E_GENDER.FEMALE },
];

export default GenderSelect as TToggleButtonGroup;
