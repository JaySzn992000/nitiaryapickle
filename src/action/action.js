// Done

// ADD_TO_CART

export const addToCart = (item, size) => {
return {
type: "ADD_TO_CART",
payload: { ...item, size, quantity: 1 }, 
};
};


// REMOVE_TO_CART

export const removeFromCart = (index) => ({
type: "REMOVE_FROM_CART",
payload: index,
});


