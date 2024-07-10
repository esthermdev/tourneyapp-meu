import { useContext, createContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Alert } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [session, setSession] = useState(null);
	const [profile, setProfile] = useState([]);

	async function getProfile() {
		if (session && session.user) {
			const { data, error } = await supabase
				.from('profiles')
				.select(`*`)
				.eq('id', session.user.id)
				.single()

			if (error) {
				Alert.alert(error.message)
			} else {
				setProfile(data);
			}
		}
	}

	useEffect(() => {
		const session = supabase.auth.getSession().then(() => {
			setSession(session)
			setUser(session ? session.user : null);
    	console.log('Initial session:', session);
		});

		const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session ? session.user : null);
			if (session) getProfile();
			console.log('Auth state change session:', session);
		});

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	useEffect(() => {
    if (session) getProfile()
  }, [session]);

	console.log(profile)

	return (
		<AuthContext.Provider value={{ user, session, profile, setProfile }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};