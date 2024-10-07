import { useContext, createContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [session, setSession] = useState(null);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	// const loginWithToken = async ({ access_token, refresh_token }) => {
	// 	const signIn = async () => {
	// 		await supabase.auth.setSession({
	// 			access_token,
	// 			refresh_token,
	// 		});

	// 		return await supabase.auth.refreshSession();
	// 	};

	// 	const {
	// 		data: { user: supabaseUser },
	// 	} = await signIn();

	// 	setUser(supabaseUser);
	// };

	const getProfile = async (userId) => {
		try {
			const { data, error } = await supabase
				.from('profiles')
				.select('*, is_admin')
				.eq('id', userId)
				.single();

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
			setUser(session?.user)
			if (session?.user) {
				getProfile(session.user.id);
			}
			setLoading(false);
		});

		const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
			console.log(`Supabase auth event: ${event}`);
			setSession(session);
			setUser(session?.user)
			if (session?.user) {
				await getProfile(session.user.id);
			} else {
				setProfile(null);
			}
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