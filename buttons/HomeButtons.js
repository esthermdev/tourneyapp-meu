import { Image } from '@rneui/base'
import { StyleSheet, Text, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
const { width } = Dimensions.get('window');
const buttonWidth = (width - 70) / 2;

const HomeButtons = ({ title, icon, buttonStyle, handlePress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, buttonStyle, disabled && styles.disabledButton]}
      onPress={handlePress}
      disabled={disabled}
    >
      <Image
        source={icon}
        resizeMode='contain'
        style={{ width: 25, height: 25 }}
      />
      <Text className='text-white font-outfitbold text-lg'>{title}</Text>
    </TouchableOpacity>
  )
}

export default HomeButtons;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 22,
    minHeight: 120,
    width: buttonWidth,
  }
})