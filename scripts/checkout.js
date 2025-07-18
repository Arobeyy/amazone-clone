import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
//import '../data/car.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

//promise is a class takes a fun as parameter and runs it immediately
//resolve is a function, let's us control when to go to next the step

//promise.all() runs multiple promises at the same time and wait for all of them to finish

//Async = makes a function return a promise
//Await = makes an async function wait for a promise

async function loadPage() {
  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

  renderCheckoutHeader();
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

]).then((values) => {
  console.log(values);

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
