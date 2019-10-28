import React from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';


import './App.css';
import ProductList from './modules/Cart/ProductList/containers/ProductList';
function App() {
  return (
    <div className="App">
        <MuiPickersUtilsProvider utils={MomentUtils}>
      <ProductList/>
        </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
