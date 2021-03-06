import React from 'react';

import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';
import { auth, signInWithGoogle } from './../../firebase/firebase.utils';
import './sign-in.styles.scss';

class SignIn extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
		};
	}

	handleSubmit = async event => {
		event.preventDefault();

		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
		} catch (error) {
			console.log(error);
		} finally {
			this.setState({ email: '', password: '' });
		}
	};

	handleChange = event => {
		const { value, name } = event.target;

		this.setState({
			[name]: value,
		});
	};

	render() {
		return (
			<div className='sign-in'>
				<h1>I have an account</h1>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						label='Email'
						type='email'
						name='email'
						value={this.state.email}
						handleChange={this.handleChange}
						required
					/>

					<FormInput
						label='Password'
						type='password'
						name='password'
						value={this.state.password}
						handleChange={this.handleChange}
						required
					/>

					<div className='buttons'>
						<CustomButton type='submit'>Sign In</CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
							Sign in with Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
