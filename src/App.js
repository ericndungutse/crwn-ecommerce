import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selectors';
import HomePage from './pages/home/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/authentication/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { ReactComponent as Logo } from './assets/crown.svg';
import Checkout from './pages/checkout/checkout.component';

import './App.css';

class App extends React.Component {
	unSubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					});
				});
			} else {
				setCurrentUser(userAuth);
			}
		});
	}

	componentWillUnmount() {
		this.unSubscribeFromAuth();
	}

	render() {
		const { currentUser } = this.props;

		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route path='/checkout' component={Checkout} />
					<Route
						path='/signin'
						render={() =>
							currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
						}
					/>
				</Switch>
			</div>
		);

		if (!currentUser) {
			return (
				<div className='initial-loading'>
					<Logo />
				</div>
			);
		} else {
			return (
				<div>
					<Header />
					<Switch>
						<Route exact path='/' component={HomePage} />
						<Route path='/shop' component={ShopPage} />
						<Route
							path='/signin'
							render={() =>
								this.props.currentUser ? (
									<Redirect to='/' />
								) : (
									<SignInAndSignUpPage />
								)
							}
						/>
					</Switch>
				</div>
			);
		}
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
