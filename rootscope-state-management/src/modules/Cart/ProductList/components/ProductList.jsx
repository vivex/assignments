import React, {useEffect} from 'react';
import {Grid, Button, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProductRow from '../components/ProductRow';
import Form from '../../../Shared/Form/Form';

const uuidv1 = require('uuid/v1');


const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(3, 2),
        padding: theme.spacing(3, 2),
    },
    formGrid: {
        padding: theme.spacing(3),
    },
    buttonFooter: {
        padding: theme.spacing(1)
    }
}));

const ProductList = (props) => {

    const {setInRootScope, rootScope, listenOn} = props;
    const classes = useStyles();
    const _getEmptyProduct = ()  => {
        return {id: uuidv1()};
    };

    useEffect(() => {
        listenOn(['products', 'billingAddress', 'shippingAddress', 'dates']);
        if (!rootScope.products) {
            setInRootScope('products', [_getEmptyProduct()]);
        }
    });

    const onAddProductClick = (evt) => {
        if (!rootScope.products) {
            setInRootScope('products', [_getEmptyProduct()]);
        } else {
            rootScope.products.push(_getEmptyProduct());
            setInRootScope('products', rootScope.products);
        }
    };

    const onDelete = (id) => {
        let indexToBeDeleted = rootScope.products.findIndex(product => product.id === id);
        if (indexToBeDeleted > -1) {
            rootScope.products.splice(indexToBeDeleted, 1);
            setInRootScope('products', rootScope.products);
        }
    };

    const ADDRESS_FIELDS = [
        {
            label: 'First Name',
            name: 'firstName',
            type: 'text',
        },
        {
            label: 'Last Name',
            name: 'lastName',
            type: 'text',
        },
        {
            label: 'Address Line 1',
            name: 'addressLine1',
            type: 'text',
        },
        {
            label: 'Address Line 2',
            name: 'addressLine2',
            type: 'text',
        },
        {
            label: 'City',
            name: 'city',
            type: 'text',
        },
        {
            label: 'State',
            name: 'state',
            type: 'text',
        },
        {
            label: 'Zip Code',
            name: 'zipCode',
            type: 'text',
        },
        {
            label: 'Country',
            name: 'country',
            type: 'text',
        },
    ];

    const DATE_FORM = [
        {
            label: 'Order Date',
            name: 'orderDate',
            type: 'date',
        },
        {
            label: 'Expected Delivery ',
            name: 'expectedDelivery',
            type: 'date',
        },
    ];

    const onBillingAddressChange = (fieldName, value)  => {
      const obj = {};
      obj[fieldName] = value;
      setInRootScope('billingAddress', {...rootScope.billingAddress, ...obj})
    };
    const onShippingAddressChange = (fieldName, value) => {
        const obj = {};
        obj[fieldName] = value;
        setInRootScope('shippingAddress', {...rootScope.shippingAddress, ...obj})
    };
    const onDateChange = (fieldName, value) => {
        const obj = {};
        obj[fieldName] = value;
        setInRootScope('dates', {...rootScope.dates, ...obj})
    };

    const onSave = () => {
        console.clear();
        console.log('Products');
        console.table(rootScope.products);
        console.log('###########################################');
        console.log('Billing Address');
        console.table(rootScope.billingAddress);
        console.log('###########################################');
        console.log('Shipping Address');
        console.table(rootScope.shippingAddress);
        console.log('###########################################');
        console.log('Dates');
        console.table(rootScope.dates);


    };

    return (<>
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={12} md={6} className={classes.formGrid}>
                    <Form title="Billing Address" gridSize={12} fields={ADDRESS_FIELDS} values={rootScope.billingAddress} onChange={onBillingAddressChange}/>
                </Grid>
                <Grid item xs={12} md={6} className={classes.formGrid}>
                    <Form title="Shipping Address" gridSize={12} fields={ADDRESS_FIELDS} values={rootScope.shippingAddress} onChange={onShippingAddressChange}/>
                </Grid>
                <Grid item md={12} className={classes.formGrid}>
                    <Form gridSize={6} fields={DATE_FORM}  onChange={onDateChange} values={rootScope.dates} />
                </Grid>
            </Grid>
        </Paper>

        <Paper  className={classes.paper}>
            <Grid container>
                <Grid item xs={12}>
                    {rootScope.products ?
                        rootScope.products.map((product) =>
                            <ProductRow id={product.id} key={product.id} onDelete={onDelete}/>)
                        : null}
                </Grid>
                <Grid item  className={classes.buttonFooter}>
                    <Button variant="contained" onClick={onAddProductClick} color="primary">Add Product</Button>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={11}>
                </Grid>
                <Grid item md={1} xs={12} className={classes.buttonFooter}>
                    <Button variant="contained" onClick={onSave} color="primary">Save</Button>
                </Grid>
            </Grid>
        </Paper>
    </>)
};

export default ProductList;