import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/base';

const CustomButtonWithIcon = ({ title, handlePress, buttonStyles, iconName }) => {
  	return (
		<TouchableOpacity 
			onPress={handlePress}
			activeOpacity={0.7}
			className={`justify-center items-center ${buttonStyles}`}
		>
			<Text className={`text-primary font-outfitsemibold text-xl text-white`}>{title}{' '}
				<Icon type='ionicon' name='arrow-forward' color='#fff' style={styles.iconStyle}/>
			</Text>
		</TouchableOpacity>
	)
}

export default CustomButtonWithIcon;

const styles = StyleSheet.create({
	iconStyle: {
		paddingLeft: 5,
		marginTop: 8
	}
});