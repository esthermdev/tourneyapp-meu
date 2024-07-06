import { useState, useEffect } from 'react';
import { 
	Image, 
	ImageBackground, 
	KeyboardAvoidingView, 
	StyleSheet, 
	Text, 
	View, 
	Platform, 
	TouchableWithoutFeedback, 
	TouchableOpacity, 
	Keyboard, 
	Alert } 
from 'react-native';
import { images } from '../constants';
import { Button, Input } from '@rneui/base';
import { router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { supabase } from '../utils/supabase';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import CustomButtonWithoutIcon from '../components/CustomButtonWithoutIcon';

const LoginScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [session, setSession] = useState(null);

	const navigation = useNavigation();

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		});
	}, []);

	async function signInWithEmail() {
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		setEmail('');
		setPassword('');

		if (error) {
			Alert.alert(
				error.message,
				"User is not recognized.\nPlease try again."
			);
			setEmail('');
			setPassword('');
		} else {
			router.push('home');
			console.log('Login successful');
			setLoading(true);
		}
	}

	async function handleSignOut() {
		supabase.auth.signOut();
		setLoading(false);
		console.log('Logout successful');
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View className='flex-1'>
				<ImageBackground className='h-full justify-end' source={images.loginBg}>
					<TouchableOpacity style={styles.button} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
						<FontAwesome name='bars' color='white' size={20}/>
						<Button title='Test Logout' onPress={() => handleSignOut()} />
					</TouchableOpacity>	
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					>
						<View className='bg-white w-full h-[600]' style={styles.loginContainer}>
							<Image 
								source={images.logoW}
								resizeMode='contain'
								style={{ width: 70, height: 70 }}
							/>
							<Text className='font-outfitextrabold text-6xl text-brightRed pt-5'>Maine Ultimate</Text>
							<Input 
								placeholder='Email' 
								onChangeText={(text) => setEmail(text)}
								value={email}
								label='Log in with your email and password'
								labelStyle={{ paddingVertical: 20, fontFamily: 'Outfit-Regular', color: 'black' }}
								autoCapitalize={'none'}
								inputStyle={styles.inputText} 
								inputContainerStyle={styles.inputContainer}
								containerStyle={{ paddingHorizontal: 0 }}
							/>
							<Input 
								placeholder='Password' 
								onChangeText={(text) => setPassword(text)}
								value={password}
								autoCapitalize={'none'}
								inputStyle={styles.inputText} 
								inputContainerStyle={styles.inputContainer}
								containerStyle={{ paddingHorizontal: 0 }}
							/>
							<CustomButtonWithoutIcon 
								title='Login'
								buttonStyles={`bg-brightRed rounded-full py-[22] ${loading ? 'bg-gray-400' : ''}`}
								handlePress={() => signInWithEmail()}
								disabled={loading}
							/>
						</View>
					</KeyboardAvoidingView>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default LoginScreen;

const styles = StyleSheet.create({
	loginContainer: {
		borderTopLeftRadius: 46,
		borderTopRightRadius: 46,
		paddingVertical: 50,
		paddingHorizontal: 35
	},
	inputContainer: {
		fontFamily: 'Outfit-Regular',
		backgroundColor: '#EBEBF0',
		borderRadius: 60,
		borderBottomWidth: 0,
	},
	inputText: {
		fontFamily: 'Outfit-Regular',
		fontSize: 18,
		paddingVertical: 22,
		paddingHorizontal: 25
	},
	button: {
		position: 'absolute',
		top: 60,
		left: 31,
	},
});