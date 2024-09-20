import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { icons } from '../../../constants';
import HomeButtons from '../../../buttons/HomeButtons';
import { router } from 'expo-router';
import { useAuth } from '../../../context/AuthProvider';
import MedicButton from '../../../buttons/MedicButton';
import WaterRefillButton from '../../../buttons/WaterRefillButton';
import RequestCartButton from '../../../buttons/RequestCartButton';
import TrainerNotification from '../../../components/TrainerNotification';
import CartNotification from '../../../components/CartNotification';
import { ScrollView } from 'react-native-gesture-handler';



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
    <>
      <ScrollView contentContainerStyle={styles.mainButtonsContainer}>
        <HomeButtons
          title='My Games'
          icon={icons.frisbee}
          buttonStyle={{ backgroundColor: '#FA7930' }}
          handlePress={() => handlePress('mygames')}
        />
        <HomeButtons
          title='Watch Live'
          icon={icons.video}
          buttonStyle={{ backgroundColor: '#FF026C' }}
          handlePress={() => router.push('https://www.youtube.com/channel/UCUY1pzGlosJcOY_7prcQRtA')}
        />
        <HomeButtons
          title='Field Map'
          icon={icons.map}
          buttonStyle={{ backgroundColor: '#B6C846' }}
          handlePress={() => router.push('/home/fieldmap')}
        />
        <MedicButton />
        <WaterRefillButton buttonStyle={styles.button} />
        <RequestCartButton />
        <TrainerNotification />
        <CartNotification />
      </ScrollView>
      <View style={styles.donationButtonContainer}>
        <TouchableOpacity
          onPress={() => router.push('https://maineultimate.org/s/171999/MU+General+Donation')}
          style={styles.donationButton}
        >
          <Text className='font-outfitsemibold text-lg text-center items-center'>Donation</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Home;

const styles = StyleSheet.create({
  mainButtonsContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 25,
    backgroundColor: '#fff',
    gap: 15,
    alignContent: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  donationButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingBottom: 25
  },
  donationButton: {
    padding: 15,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#EA1D25',
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