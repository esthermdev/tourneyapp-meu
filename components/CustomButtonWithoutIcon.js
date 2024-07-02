import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButtonWithoutIcon = ({ title, handlePress, buttonStyles, disabled }) => {

  	return (
		<TouchableOpacity 
			onPress={handlePress}
			activeOpacity={0.7}
			className={`justify-center items-center ${buttonStyles}`}
			disabled={disabled}
		>
			<Text className={`text-primary font-outfitsemibold text-lg text-white`}>{title}{' '}
			</Text>
		</TouchableOpacity>
	)
}

export default CustomButtonWithoutIcon;

const styles = StyleSheet.create({
	iconStyle: {
		paddingLeft: 5,
		marginTop: 8
	}
});