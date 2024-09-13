import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomButtonWithIcon from '../buttons/CustomButtonWithIcon';
import images from '../constants/images';
import { router } from 'expo-router';

export default function App() {
  return (
    <View className='bg-white h-full'>
      <View className='h-11'></View>
      <View className='flex-3 py-3 justify-center items-center'>
        <Image
          source={images.logoW}
          resizeMode='contain'
          style={{ width: 90, height: 90 }}
        />
      </View>
      <View className='flex-1 justify-center mt-10 items-center'>
        <Image
          source={images.frisbeePlayer}
          resizeMode='contain'
          style={{ width: '100%' }}
        />
      </View>
      <View className='flex-2 px-[35] pt-5 pb-12'>
        <View className='mb-12'>
          <Text className='font-outfitregular text-center' style={{ fontSize: 18, }}>Welcome to</Text>
          <Text className='font-outfitbold text-center' style={{ fontSize: 38, marginVertical: 25 }}>Vacationland</Text>
          <Text className='font-outfitbold text-center' style={{ fontSize: 16 }}>2024</Text>
        </View>
        <CustomButtonWithIcon
          title='Continue'
          buttonStyles='bg-primary rounded-full px-[25] py-[22] flex-row'
          handlePress={() => router.push('(tabs)/home')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
