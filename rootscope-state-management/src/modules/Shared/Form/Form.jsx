import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import InputField from './InputField';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
}));
const Form = (props) => {
    const {title, fields, gridSize, onSubmit, onChange, values = {}} = props;
    const classes = useStyles();

    const onChangeWrapper = (fieldName) => (evt) => {
        let value;
        if (evt.target) {
            value = evt.target.value;
        } else if (evt.constructor.name === 'Moment') {
            value = evt;
        }
        onChange(fieldName, value)
    };

    return (
        <form className={classes.container}>
            <Typography variant="h5" component="h2" gutterBottom>{title}</Typography>
            {
                fields && fields.map((field) => (
                    <Grid item xs={gridSize} key={title+field.name}>
                        <InputField {...field} value={values[field.name]} onChange={onChangeWrapper(field.name)}/>
                    </Grid>
                ))
            }
        </form>
    );
};

Form.propTypes = {
    title: PropTypes.string,
    fields: PropTypes.array,
    gridSize: PropTypes.number,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
};

export default Form;