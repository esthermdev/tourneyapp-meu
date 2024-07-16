import { Image, ScrollView, StyleSheet } from 'react-native'
import { images } from '../../../constants';

const FieldMap = () => {
  return (
    <>
      <ScrollView 
          contentContainerStyle={styles.container}
          maximumZoomScale={2}
          minimumZoomScale={1}
      >
          <Image 
              source={images.fieldMap}
              className='w-full rotate-90 h-full'
              resizeMode='contain'
              style={styles.image}
          />
      </ScrollView>
    </>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        aspectRatio: 1
    }
})

export default FieldMap