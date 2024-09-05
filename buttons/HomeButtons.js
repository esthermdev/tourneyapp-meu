import { Image } from '@rneui/base'
import { StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HomeButtons = ({ title, icon, buttonStyle, handlePress, disabled }) => {
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      className={`${buttonStyle} ${disabled ? 'opacity-50' : ''}`}
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
    width: 160,
    height: 136,
    padding: 20,
    justifyContent: 'space-between',
    borderRadius: 22
  }
})