import React from 'react';

import SignIn from './../../components/signin/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import './sign-in-and-sign-up.styles.scss';

const signInAndSignUpPage = () => (
	<div className='sign-in-and-sign-up'>
		<SignIn />
		<SignUp />
	</div>
);

export default signInAndSignUpPage;
