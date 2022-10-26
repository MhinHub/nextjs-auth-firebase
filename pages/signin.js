// render the login channel

import 'firebase/compat/auth';

import StyledFirebaseAuth from 'firebaseui';
import firebase from 'firebase/compat/app';
import initFirebase from '../firebase-config';
import { mapUserData } from '../auth/useUser';
import { setUserCookie } from '../auth/userCookie';

initFirebase();

const firebaseAuthConfig = ({ signInSuccessUrl }) => ({
    signInFlow: 'popup',
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl,
    credentialHelper: 'none',
    callbacks: {
        signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
            const userData = await mapUserData(user);
            setUserCookie(userData);
            return true;
        }
    }
});

const firebaseAuth = () => {
    const signInSuccessUrl = '/private';
    return (
        <StyledFirebaseAuth
            uiConfig={firebaseAuthConfig({ signInSuccessUrl })}
            firebaseAuth={firebase.auth()}
            signInSuccessUrl={signInSuccessUrl}
        />
    );
};

export default firebaseAuth;