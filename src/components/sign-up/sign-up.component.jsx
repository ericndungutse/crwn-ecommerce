import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
	}

	handleOnChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value,
		});
	};

	handleSubmit = async event => {
		event.preventDefault();

		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword)
			return console.log('Passwords do not match');

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await createUserProfileDocument(user, { displayName });

			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		return (
			<div className='sign-up'>
				<h1 className='title'>I do not have account</h1>
				<span>Sign up with your email and password</span>

				<form className='sign-up-form' onSubmit={this.handleSubmit}>
					<FormInput
						type='text'
						name='displayName'
						value={this.state.displayName}
						onChange={this.handleOnChange}
						label='Display Name'
						required
					/>

					<FormInput
						type='email'
						name='email'
						value={this.state.email}
						onChange={this.handleOnChange}
						label='Email'
						required
					/>

					<FormInput
						type='password'
						name='password'
						value={this.state.password}
						onChange={this.handleOnChange}
						label='Password'
						required
					/>

					<FormInput
						type='password'
						name='confirmPassword'
						value={this.state.confirmPassword}
						onChange={this.handleOnChange}
						label='Comfirm Password'
						required
					/>

					<CustomButton type='submit'>SGN UP</CustomButton>
				</form>
			</div>
		);
	}
}

export default SignUp;
