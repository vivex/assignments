import React from 'react';
import PropTypes from 'prop-types';
import {Grid, TextField, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import connect from '../../../../utils/root-scope';
import InputField from '../../../Shared/Form/InputField';

const useStyles = makeStyles(theme => ({
    button: {

    },
    textField: {
       margin: theme.spacing(1),
    },
    buttonWrapper: {
    }
}));

const ProductRow = (props) => {
    const classes = useStyles();
    const {id, setInRootScope, rootScope, onDelete } = props;
    let product = rootScope.products.find((p) => p.id === id);

    const { name, quantity, unitPrice, notes, totalPrice = 0 } = product;

    const handleChange = (fieldName) => (evt)=> {
        product[fieldName] = evt.target.value;
        if (fieldName === 'unitPrice' || fieldName === 'quantity') {
            //TODO Move it to middleware
            product.totalPrice = product.quantity * product.unitPrice;
        }
        setInRootScope('products', rootScope.products);
    };

    const onDeleteWrapper = (evt) => {
        onDelete(id);
    };

    return (
        <Grid container>
            <Grid item xs={1} className={classes.textField}>
                <InputField label="ID" readOnly={true}
                            value={id} variant="outlined"
                            onChange={handleChange('id')}
                         />
            </Grid>
            <Grid item  xs={3} className={classes.textField}>
                <InputField label="Product Name"
                            validationRules={['required']}
                            value={name} variant="outlined"
                            onChange={handleChange('name')}/>

            </Grid>
            <Grid item xs={1} className={classes.textField}>
                <InputField label="Qty"
                            type="number"
                            validationRules={['no_negative', 'required']}
                            inputProps={{ min: 0, step: "1" }}
                            value={quantity} variant="outlined"
                            onChange={handleChange('quantity')}
                            />

            </Grid>
            <Grid item  xs={1} className={classes.textField}>
                <InputField label="Unit Price"
                            validationRules={['no_negative', 'required']}
                            type="number"
                            value={unitPrice} variant="outlined"
                            onChange={handleChange('unitPrice')}
                            />
            </Grid>
            <Grid item  xs={1} className={classes.textField}>
                <InputField label="Total Price"
                            type="number"
                            readOnly={true}
                            value={totalPrice} variant="outlined"
                            onChange={handleChange('totalPrice')}
                            />
            </Grid>
            <Grid item  xs={3} className={classes.textField}>
                <InputField label="Notes"
                            type="text"
                            value={notes} variant="outlined"
                            onChange={handleChange('notes')}
                            />

            </Grid>
            <Grid  item xs={1} className={classes.buttonWrapper}  className={classes.textField}>
                <Button variant="outlined" color="secondary" className={classes.button} onClick={onDeleteWrapper}>DELETE</Button>
            </Grid>
    </Grid>);
};

ProductRow.propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.number,
    unitPrice: PropTypes.number,
    totalPrice: PropTypes.number,
    notes: PropTypes.string,
    onDelete: PropTypes.func,
    setInRootScope: PropTypes.func,
    rootScope: PropTypes.object,
};

export default connect(ProductRow);