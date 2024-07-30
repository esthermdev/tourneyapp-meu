import { useState, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native'
import { icons } from '../../../constants';
import HomeButtons from '../../../components/HomeButtons';
import FieldSelectionModal from '../../../components/FieldSelectionModal';
import { router } from 'expo-router';
import { useAuth } from '../../../context/AuthProvider';

const Home = () => {
  const { user } = useAuth();

  const [isFieldModalVisible, setFieldModalVisible] = useState(false);
  const [isFieldSelectionVisible, setIsFieldSelectionVisible] = useState(false);

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

  const handleMedicPress = () => {
    Alert.alert(
      "Call for medical assistance?",
      "",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => setIsFieldSelectionVisible(true) }
      ]
    );
  };

  const handleFieldSelection = async (fieldNumber) => {
    setFieldModalVisible(false);
    
    console.log(`Medical assistance requested at Field ${fieldNumber}`);
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
        title='Watch Live'
        icon={icons.video}
        buttonStyle='bg-[#FF026C]'
        handlePress={() => router.push('https://www.youtube.com/channel/UCUY1pzGlosJcOY_7prcQRtA')}
      />
      <HomeButtons 
        title='Medic'
        icon={icons.medic}
        buttonStyle='bg-[#2871FF]'
        handlePress={handleMedicPress}
      />
      <HomeButtons 
        title='Field Map'
        icon={icons.map}
        buttonStyle='bg-[#B6C846]'
        handlePress={() => router.push('/home/fieldmap')}
      />
      <FieldSelectionModal 
        visible={isFieldSelectionVisible}
        onClose={() => setIsFieldSelectionVisible(false)}
        onSelectField={handleFieldSelection}
      />
    </View>
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
  }
})