import { Alert, StyleSheet, Text, View } from 'react-native'
import { icons } from '../../../constants';
import HomeButtons from '../../../components/HomeButtons';
import { router } from 'expo-router';
import { useAuth } from '../../../context/AuthProvider';

const Home = () => {
  const { user } = useAuth();

  const handlePress = (screen) => {
    if (!user) {
      Alert.alert(
        "Authentication Required",
        "You need to log in to access this feature.",
        [{ text: "OK" }]
      );
    } else {
      router.push(`home/${screen}`);
    }
  };

  return (
    <View style={styles.container}>
      <HomeButtons
        title='My Games'
        icon={icons.frisbee}
        buttonStyle='bg-[#FA7930]'
        handlePress={() => handlePress('mygames')}
      />
      <HomeButtons 
        title='Report Scores'
        icon={icons.scoreboard}
        buttonStyle='bg-[#6D28FF]'
        handlePress={() => handlePress('reportscores')}
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
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 20,
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 25
  }
})