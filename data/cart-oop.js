import { checkValidDeliveryOption } from "./deliveryOptions.js";

function Cart(localStorageKey) {
  const cart = {
    cartItem: undefined,

    loadFromStorage() {
      this.cartItem = JSON.parse(localStorage.getItem("localStorageKey"));

      if (!this.cartItem) {
        this.cartItem = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "2",
          },
        ];
      }
    },

    saveToStorage() {
      localStorage.setItem("localStorageKey", JSON.stringify(this.cartItem));
    },

    addToCart(productId) {
      if (!productId) return; // Prevent invalid entries

      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = quantitySelector
        ? Number(quantitySelector.value) || 1
        : 1;

      const matchingItem = this.cartItem.find(
        (cartItem) => cartItem.productId === productId
      );

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItem.push({ productId, quantity, deliveryOptionId: "1" });
      }

      this.cartItem = this.cartItem.filter((item) => item.productId);
      this.saveToStorage();

      console.log("Adding to cart:", { productId, quantity });
    },

    removeFromCart(productId) {
      const newCart = [];

      this.cartItem.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItem = newCart;

      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      const matchingItem = this.cartItem.find(
        (cartItem) => cartItem.productId === productId
      );

      if (!matchingItem) {
        console.error(`Product with ID ${productId} not found in cart.`);
        return; // Prevents trying to access properties of undefined
      }

      if (!checkValidDeliveryOption(deliveryOptionId)) {
        return;
      }

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },

    calculateCartQuantity() {
      let cartQuantity = 0;

      this.cartItem.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      return cartQuantity;
    },

    updateQuantity(productId, newQuantity) {
      let matchingItem;

      this.cartItem.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.quantity = newQuantity;

      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
