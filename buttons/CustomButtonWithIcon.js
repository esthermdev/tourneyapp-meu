import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/base';
import { s, ms } from 'react-native-size-matters';

const CustomButtonWithIcon = ({ title, handlePress, buttonStyles }) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			style={buttonStyles}
		>
			<Text allowFontScaling={false} style={styles.textStyle}>{title}{' '}</Text>
			<Icon type='ionicon' name='arrow-forward' color='#fff' style={styles.iconStyle} size={s(23)} />
		</TouchableOpacity>
	)
}

export default CustomButtonWithIcon;

const styles = StyleSheet.create({
	iconStyle: {
		marginLeft: 5,
		marginTop: 3
	},
	textStyle: {
		fontFamily: 'Outfit-SemiBold',
		color: '#fff',
		fontSize: ms(20)
	}
});