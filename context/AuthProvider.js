import { useContext, createContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [session, setSession] = useState(null);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	console.log(session)

	const getProfile = async (userId) => {
		try {
			const { data, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', userId)

			if (error) throw error;
			setProfile(data);
			return data;
		} catch (error) {
			console.error('Error fetching profile:', error.message);
			return null;
		}
	};

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ?? null);
			if (session?.user) {
				getProfile(session.user.id);
			}
			setLoading(false);
		});

		const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
			console.log(`Supabase auth event: ${event}`);
			setSession(session);
			setUser(session?.user ?? null);
			if (session?.user) {
				await getProfile(session.user.id);
			} else {
				setProfile(null);
			}
			setLoading(false);
		});

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	const value = {
		user,
		session,
		profile,
		loading,
		getProfile,
		setProfile,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};