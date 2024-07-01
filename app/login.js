import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { images } from '../constants';

const LoginScreen = () => {
  return (
    <View className='flex-1'>
			<ImageBackground className='h-full justify-end' source={images.loginBg}>
				<View style={styles.logoContainer}>
					<Image 
						source={images.logoB}
						resizeMode='contain'
						style={{ width: 90, height: 90, alignSelf: 'flex-start'}}
					/>
				</View>
				<View className='bg-white w-full h-[400]' style={styles.loginStyle}>
					<Text className='font-outfitextrabold text-6xl text-brightRed'>Maine Ultimate</Text>
				</View>
			</ImageBackground>
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
	logoContainer: {
		position: 'absolute',
    top: 70,
    left: 30,
	},	
	loginStyle: {
		borderTopLeftRadius: 46,
		borderTopRightRadius: 46,
		paddingVertical: 50,
		paddingHorizontal: 35
  },
})