// handle auth status change and redirect to signing pages

import 'firebase/compat/auth';

import React, { useEffect } from 'react';

import firebase from 'firebase/compat/app';
import initFirebase from '../firebase-config';
import router from 'next/router';

initFirebase();
const auth = firebase.auth();

// eslint-disable-next-line react/display-name
export const withAuth = (Component) => props => {
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (!authUser) {
                router.push('/signin');
            }
        });
    }, []);

    return <Component {...props} />;
};

