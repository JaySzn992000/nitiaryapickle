const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
const storedQuantities = JSON.parse(localStorage.getItem('quantities')) || [];

const initialState = {
cart: storedCart,
};

const rootReducer = (state = initialState, action) => {
switch (action.type) {
case 'ADD_TO_CART': {
const { id, size } = action.payload;
const existingProductIndex = state.cart.findIndex(
(item) => item.id === id && item.size === size
);

let updatedCartAdd;

if (existingProductIndex >= 0) {
updatedCartAdd = state.cart.map((item, index) =>
index === existingProductIndex
? { ...item, quantity: item.quantity + 1 }
: item
);
} else {
updatedCartAdd = [...state.cart, { ...action.payload, quantity: 1 }];
}

localStorage.setItem('cart', JSON.stringify(updatedCartAdd));

return {
...state,
cart: updatedCartAdd,
};
}

case 'REMOVE_FROM_CART': {
const updatedCartRemove = state.cart.filter((_, index) => index !== action.payload);
const updatedQuantitiesRemove = storedQuantities.filter((_, index) => index !== action.payload);

localStorage.setItem('cart', JSON.stringify(updatedCartRemove));
localStorage.setItem('quantities', JSON.stringify(updatedQuantitiesRemove));

return {
...state,
cart: updatedCartRemove,
};
}

default:
return state;
}

};

export default rootReducer;