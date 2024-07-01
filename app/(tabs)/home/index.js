import { Image } from '@rneui/base'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { icons } from '../../../constants';
import HomeButtons from '../../../components/HomeButtons';
import { router } from 'expo-router';

const Home = () => {
  return (
    <View style={styles.container}>
      <HomeButtons
        title='My Games'
        icon={icons.frisbee}
        buttonStyle='bg-[#FA7930]'
        handlePress={() => router.push('/home/mygames')}
      />
      <HomeButtons 
        title='Report Scores'
        icon={icons.scoreboard}
        buttonStyle='bg-[#6D28FF]'
        handlePress={() => router.push('/home/reportscores')}
      />
      <HomeButtons 
        title='Watch Live'
        icon={icons.video}
        buttonStyle='bg-[#FF026C]'
      />
      <HomeButtons 
        title='Medic'
        icon={icons.medic}
        buttonStyle='bg-[#2871FF]'
      />
      <HomeButtons 
        title='Field Map'
        icon={icons.map}
        buttonStyle='bg-[#B6C846]'
        handlePress={() => router.push('/home/fieldmap')}
      />
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 20,
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 25
  }
})