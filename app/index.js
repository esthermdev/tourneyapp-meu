import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import CustomButtonWithIcon from '../buttons/CustomButtonWithIcon';
import images from '../constants/images';
import { router } from 'expo-router';
import { ScaledSheet } from 'react-native-size-matters';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={images.logoW}
              resizeMode='contain'
              style={styles.logo}
            />
          </View>
          <View style={styles.centerContainer}>
            <Text maxFontSizeMultiplier={1.3} style={styles.welcomeText}>Welcome to</Text>
            <Image
              source={images.lpTitleLogo}
              resizeMode='contain'
              style={styles.mainImage}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Image
            source={images.bgWelcome}
            resizeMode='stretch'
            style={styles.backgroundImage}
          />
          <CustomButtonWithIcon
            title='Continue'
            buttonStyles={styles.continueButton}
            handlePress={() => router.push('(tabs)/home')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20@vs',
  },
  logo: {
    width: '90@ms0.2',
    height: '90@ms0.2',
  },
  centerContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  mainImage: {
    width: '250@s',
    height: '250@s',
    aspectRatio: 1,
  },
  welcomeText: {
    fontFamily: 'Outfit-Regular',
    fontSize: '25@ms',
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%', // Adjust this value to control the height of the bottom container
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EA1D25',
    borderRadius: 100,
    paddingHorizontal: 25,
    paddingVertical: 22,
    width: '85%', // Adjust as needed
    zIndex: 10, // Ensures the button is above the background image
  },
});