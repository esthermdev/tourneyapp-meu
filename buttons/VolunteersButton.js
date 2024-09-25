import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { ms } from 'react-native-size-matters';

const { width } = Dimensions.get('window');
const buttonWidth = (width - 70) / 2;


const VolunteersButton = ({ disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, disabled && styles.disabledButton]}
      onPress={() => router.push('home/volunteers')}
      disabled={disabled}
    >
      {!disabled ? (
        <FontAwesome5 name='people-carry' size={25} color='#fff' />
      ) : <></>}
      <Text maxFontSizeMultiplier={1.1} style={styles.text}>Meet our volunteers!</Text>
    </TouchableOpacity>
  )
}

export default VolunteersButton;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 22,
    minHeight: 120,
    width: buttonWidth,
    backgroundColor: 'purple'
  },
  text: {
    textAlign: 'center',
    fontSize: ms(18),
    fontFamily: 'Outfit-Bold',
    color: '#fff'
  }
})