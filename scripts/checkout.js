import {renderOrderSummary} from './checkout/order-summary.js';
import {renderPaymentSummary} from './checkout/payment-summary.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';


async function loadPage() {
    try {
        // throw 'error1';
        await loadProductsFetch();

        await new Promise((resolve, reject) => {
            // throw 'error2';
            loadCart(() => {
                // reject('error3);
                resolve();
            });
        });
    } 
    catch(error) {
        console.log('Unexpected Error. Please  try again later');
    }


    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})

*/