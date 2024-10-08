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
import { ms } from 'react-native-size-matters';
import { useButtonState } from '../../../context/ButtonStateContext';
import CustomHomeButton from '../../../buttons/CustomHomeButton';

const Home = () => {
  const { user } = useAuth();
  const { buttonStates } = useButtonState();

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
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <ScrollView contentContainerStyle={styles.mainButtonsContainer}>
        <HomeButtons
          title='My Games'
          icon={icons.frisbee}
          buttonStyle={{ backgroundColor: '#FF026C' }}
          handlePress={() => handlePress('mygames')}
        />
        <CustomHomeButton
          title='Report Spirit Scores'
          color='#41A603'
          icon='hands-helping'
          align='flex-start'
          handlePress={() => router.push('https://docs.google.com/forms/d/15NrrAtvd2mt_RGdpkTYDTYHGXHP0RTiIJEI0GXFwfp4/viewform?edit_requested=true')}
        />
        <HomeButtons
          title='Watch Live'
          icon={icons.video}
          buttonStyle={{ backgroundColor: '#FFA700' }}
          handlePress={() => router.push('https://www.youtube.com/@maineultimate/streams')}
        />
        <HomeButtons
          title='Field Map'
          icon={icons.map}
          buttonStyle={{ backgroundColor: '#B6C846' }}
          handlePress={() => router.push('/home/fieldmap')}
        />
        <RequestCartButton disabled={!buttonStates.requestCart} />
        <MedicButton disabled={!buttonStates.medic} />
        <WaterRefillButton disabled={!buttonStates.waterRefill} />
        <CustomHomeButton
          title='Meet our Volunteers!'
          icon='people-carry'
          color='#8660D6'
          handlePress={() => router.push('home/volunteers')}
        />
      </ScrollView>
      <View style={styles.donationButtonContainer}>
        <TouchableOpacity
          onPress={() => router.push('https://maineultimate.org/s/171999/MU+General+Donation')}
          style={styles.donationButton}
        >
          <Text maxFontSizeMultiplier={1} className='font-outfitsemibold text-center items-center' style={styles.donationText}>Donation</Text>
        </TouchableOpacity>
      </View>
      <TrainerNotification />
      <CartNotification />
    </View>
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
    paddingHorizontal: 15,
    padding: 15
  },
  donationButton: {
    padding: 15,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#EA1D25',
  },
  donationText: {
    fontSize: ms(18)
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