import { createSelector } from 'reselect';

const selectCart = state => {
	return state.cart;
};

export const selectCartHidden = createSelector(
	[selectCart],
	cart => cart.hidden
);

export const selectCartItems = createSelector(
	[selectCart],
	cart => cart.cartItems
);

export const selectCartItemsCounter = createSelector(
	[selectCartItems],
	cartItems => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
	[selectCartItems],

	cartItems =>
		cartItems.reduce(
			(acc, cartItem) => acc + cartItem.quantity * cartItem.price,
			0
		)
);
