import { useState, useEffect } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, View, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { images } from '../constants';
import { Button, Input } from '@rneui/base';
import { supabase } from '../utils/supabase';
import CustomButtonWithoutIcon from '../components/CustomButtonWithoutIcon';
import { router } from 'expo-router';

const LoginScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [session, setSession] = useState(null);

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
					<View style={styles.logoContainer}>
						<Image 
							source={images.logoB}
							resizeMode='contain'
							style={{ width: 90, height: 90, alignSelf: 'flex-start'}}
						/>
						<Button title='logout' onPress={() => handleSignOut()} />
					</View>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					>
						<View className='bg-white w-full h-[500]' style={styles.loginContainer}>
							<Text className='font-outfitextrabold text-6xl text-brightRed mb-5'>Maine Ultimate</Text>
							<Input 
								placeholder='Email' 
								onChangeText={(text) => setEmail(text)}
								value={email}
								autoCapitalize={'none'}
								inputStyle={styles.inputText} 
								labelStyle={styles.labelContainer} 
								inputContainerStyle={styles.inputContainer}
								containerStyle={{ paddingHorizontal: 0 }}
							/>
							<Input 
								placeholder='Password' 
								onChangeText={(text) => setPassword(text)}
								value={password}
								autoCapitalize={'none'}
								inputStyle={styles.inputText} 
								labelStyle={styles.labelContainer} 
								inputContainerStyle={styles.inputContainer}
								containerStyle={{ paddingHorizontal: 0 }}
							/>
							<CustomButtonWithoutIcon 
								title='Login'
								buttonStyles={`bg-brightRed rounded-full py-[20] ${loading ? 'bg-gray-400' : ''}`}
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
	logoContainer: {
		position: 'absolute',
	top: 70,
	left: 30,
	},	
	loginContainer: {
		borderTopLeftRadius: 46,
		borderTopRightRadius: 46,
		paddingVertical: 40,
		paddingHorizontal: 35
	},
	labelContainer: {
		color: '#333243',
		fontFamily: 'Outfit-Regular'
	},
	inputContainer: {
		fontFamily: 'Outfit-Regular',
		backgroundColor: '#EBEBF0',
		height: 50,
		borderRadius: 60,
		padding: 30,
		borderBottomWidth: 0,
	},
	inputText: {
		fontFamily: 'Outfit-Regular',
		fontSize: 18
	}
});