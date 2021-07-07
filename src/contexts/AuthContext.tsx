import { createContext, ReactNode, useEffect, useState } from "react";

import { auth, firebase } from "../services/firebase";

export type User = {
	id: string;
	name: string;
	avatar: string;
};

type AuthContextType = {
	user: User | undefined;
	signInWithGoogle(): Promise<void>;
};

type AuthContextProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
	const [user, setUser] = useState<User | undefined>();

	async function signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();

		const res = await auth.signInWithPopup(provider);

		if (res.user) {
			const { displayName, photoURL, uid } = res.user;

			if (!displayName || !photoURL) {
				throw new Error("Missing information on Google account!");
			}

			setUser({
				id: uid,
				avatar: photoURL,
				name: displayName,
			});
		}
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const { displayName, photoURL, uid } = user;

				if (!displayName || !photoURL) {
					throw new Error("Missing information on Google account!");
				}

				setUser({
					id: uid,
					avatar: photoURL,
					name: displayName,
				});
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user, signInWithGoogle }}>
			{props.children}
		</AuthContext.Provider>
	);
}
