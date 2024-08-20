import { Alert, StyleSheet, View } from 'react-native'
import { icons } from '../../../constants';
import HomeButtons from '../../../buttons/HomeButtons';
import { router } from 'expo-router';
import { useAuth } from '../../../context/AuthProvider';
import RequestTrainerNotification from '../../../components/RequestTrainerNotification';
import MedicButton from '../../../buttons/MedicButton';
import RequestWaterRefill from '../../../components/RequestWaterRefill';
import WaterRefillButton from '../../../buttons/WaterRefillButton';

const Home = () => {
  const { user, session } = useAuth();

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
    <>
      <View style={styles.container}>
        <HomeButtons
          title='My Games'
          icon={icons.frisbee}
          buttonStyle='bg-[#FA7930]'
          handlePress={() => handlePress('mygames')}
        />
        <HomeButtons
          title='Watch Live'
          icon={icons.video}
          buttonStyle='bg-[#FF026C]'
          handlePress={() => router.push('https://www.youtube.com/channel/UCUY1pzGlosJcOY_7prcQRtA')}
        />
        <MedicButton />
        <HomeButtons
          title='Field Map'
          icon={icons.map}
          buttonStyle='bg-[#B6C846]'
          handlePress={() => router.push('/home/fieldmap')}
        />
        <WaterRefillButton />
      </View>
      <RequestWaterRefill />
      <RequestTrainerNotification />
    </>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 20,
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 25
  },
  tokenContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  tokenTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tokenText: {
    fontSize: 12,
    wordWrap: 'break-word',
  },
  updateTokenButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  updateTokenButtonText: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
  },
})