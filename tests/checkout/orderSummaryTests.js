import { renderOrderSummary } from "../../scripts/checkout/order-summary.js";
import { addToCart, cart, loadFromStorage } from "../../data/cart.js";
import {loadProducts} from '../../data/products.js';

describe("Test suite: Render Order Summary", () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeAll((done) => {
        loadProducts(() => {
            done();
        });
    });

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class="checkout-header-middle-section js-checkout-items-count"></div>
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'
                }, {
                    productId: productId2,
                    quantity: 2,
                    deliveryOptionId: '2'     
                }
            ]);
        });
        loadFromStorage();
        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = ''; 
    });

    it('displays the cart', () => {
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

        const secondItem = document.querySelector(`.js-cart-item-container-${productId2}`);
        expect(secondItem).not.toBeNull();
        expect(secondItem.textContent).toContain('Quantity: 2');

        const firstItem = document.querySelector(`.js-cart-item-container-${productId1}`);
        expect(firstItem).not.toBeNull();
        expect(firstItem.textContent).toContain('Quantity: 2');
    });

    it('removes item from cart when delete link is clicked', () => {
        document.querySelector(`.js-delete-link[data-product-id="${productId1}"]`).click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toBeNull();

        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toBeNull();

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    });
});