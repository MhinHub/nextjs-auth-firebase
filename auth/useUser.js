// handle user state

import 'firebase/compat/auth';

import {
    getUserFromCookie,
    removeUserCookie,
    setUserCookie,
} from './userCookie';
import { useEffect, useState } from 'react';

import firebase from 'firebase/compat/app';
import initFirebase from '../firebase-config';
import { useRouter } from 'next/router';

initFirebase();

export const mapUserData = async (user) => {
    const { uid, email } = user;
    const token = await user.getIdToken();

    return {
        id: uid,
        email,
        token,
    };
}

const useUser = () => {
    const [user, setUser] = useState();
    const router = useRouter();

    const logout = async () => {
        await firebase.auth()
            .signOut().
            then(() => {
                router.push('/')
            })
            .catch((error) => {
                console.error(error)
            });
    }

    useEffect(() => {
        const cancelAuthListener = firebase.auth()
            .onIdTokenChanged(async (user) => {
                if (!user) {
                    removeUserCookie();
                    setUser();
                    return;
                }

                const userData = await mapUserData(user);
                setUserCookie(userData);
                setUser(userData);
            });

        const userFromCookie = getUserFromCookie();
        if (!userFromCookie) {
            return;
        }
        setUser(userFromCookie);

        return () => {
            cancelAuthListener();
        }
    }, []);

    return { user, logout };
}

export { useUser };


