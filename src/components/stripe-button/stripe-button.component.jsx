import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		'pk_test_51JJDXRGXhbwVVFOkQYoUJkr9nm18Cx61S250j3yh6nWXCAiVRxOYtlkOFM72lXM0AFPLJOIttxtypoEthicAHkzO00YOICHa0C';

	const onToken = token => {
		console.log(token);
		alert('Payment Successful');
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='CRWN CLOTHING Ltd.'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.zvg'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
