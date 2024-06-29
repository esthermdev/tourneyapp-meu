import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import images from '../constants/images';
import { router } from 'expo-router';

export default function App() {
  return (
    <View className='bg-white h-full'>
      <View className='h-11'></View>
      <View className='h-28 justify-center items-center'>
        <Image 
          source={images.logoW}
          resizeMethod='contain'
          style={{width: 90, height: 90}}
        />
      </View>
      <View className='flex-1'>
        <Image 
          source={images.frisbeePlayer}
          resizeMethod='contain'
          style={{ height: 400, width: 400}}
        />
      </View>
      <View className='h-[320] px-[35] pt-5 pb-12'>
        <View className='mb-12'>
          <Text className='font-outfitregular text-center' style={{ fontSize: 18 }}>Welcome to</Text>
          <Text className='font-outfitbold text-center py-1' style={{ fontSize: 38 }}>Tournament Name</Text>
          <Text className='font-outfitbold text-center' style={{ fontSize: 16 }}>2024</Text>
        </View>
        <CustomButton 
          title='Continue' 
          buttonStyles='bg-brightRed rounded-full px-[25] py-[22] flex-row' 
          handlePress={() => router.push('(tabs)')}  
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});