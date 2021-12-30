import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
	apiKey: 'AIzaSyBu4YV6-ZQiip65wdetEguQw-4K3bqhzDQ',
	authDomain: 'crown-001.firebaseapp.com',
	projectId: 'crown-001',
	storageBucket: 'crown-001.appspot.com',
	messagingSenderId: '710328724791',
	appId: '1:710328724791:web:a619db5fdbf8d88876feb2',
	measurementId: 'G-HXKNEV11KX',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
