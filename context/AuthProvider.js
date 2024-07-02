import { useContext, createContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [session, setSession] = useState(null);

	useEffect(() => {
		const session = supabase.auth.getSession().then(() => {
			setSession(session)
		});

		const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session ? session.user : null);
		});

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};