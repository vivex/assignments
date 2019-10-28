import React from 'react';
import PropTypes from 'prop-types'
import {TextField} from '@material-ui/core';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {getValidation} from './utils';


const InputField = (props) => {
    const {type = 'text', label, variant, value, required,
        onChange, readOnly, textFieldClassName, inputProps, validationRules} = props;
    const validationResult = getValidation(validationRules, value);
    const isErrored = () => {
        if (required && value === '') {
            return true;
        }
        return false;
    };


    const getErrorMsg = () => {
        if (required && value === '') {
            return `${label} is required`;
        }
    };

    if (type === 'text' || type === 'number') {
        return (
            <TextField label={label}
                       type={type}
                       error={isErrored() || !validationResult.isValid}
                       helperText={getErrorMsg() || validationResult.message}
                       variant={variant}
                       value={value || ''}
                       onChange={onChange}
                       inputProps={inputProps}
                       InputProps={{
                           readOnly: readOnly,
                       }}
                       className={textFieldClassName}
                       fullWidth></TextField>
        );
    }

    if (type === 'date') {
        return (
            <KeyboardDatePicker
                disableToolbar
                variant={variant}
                format="DD/MM/YYYY"
                label={label}
                margin="normal"
                value={value}
                onChange={onChange}
                fullWidth
                KeyboardButtonProps={{
                    'aria-label': label,
                }}
            />
        )
    }

};

InputField.propTypes = {
    type: PropTypes.oneOf(['text', 'number', 'date']),
    variant: PropTypes.oneOf(['outlined', 'contained']),
    label: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
};

export default InputField;