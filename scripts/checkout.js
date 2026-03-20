import {renderOrderSummary} from './checkout/order-summary.js';
import {renderPaymentSummary} from './checkout/payment-summary.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';


async function loadPage() {
    await loadProductsFetch();

    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

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