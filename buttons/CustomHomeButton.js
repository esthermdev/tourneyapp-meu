import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ms } from 'react-native-size-matters';

const { width } = Dimensions.get('window');
const buttonWidth = (width - 70) / 2;


const CustomHomeButton = ({ handlePress, align, disabled, title, icon, color }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, { backgroundColor: color, alignItems: align }, disabled && styles.disabledButton]}
      onPress={handlePress}
      disabled={disabled}
    >
      {!disabled ? (
        <FontAwesome5 name={icon} size={25} color='#fff' />
      ) : <></>}
      <Text maxFontSizeMultiplier={1} style={[styles.text, { textAlign: align }]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomHomeButton;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 22,
    minHeight: 120,
    width: buttonWidth,
  },
  text: {
    textAlign: 'left',
    fontSize: ms(16),
    fontFamily: 'Outfit-Bold',
    color: '#fff'
  }
})