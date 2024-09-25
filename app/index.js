import React from 'react';
import { Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import CustomButtonWithIcon from '../buttons/CustomButtonWithIcon';
import images from '../constants/images';
import { router } from 'expo-router';
import { ScaledSheet, s, vs, ms } from 'react-native-size-matters';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={images.logoW}
            resizeMode='contain'
            style={styles.logo}
          />
        </View>
        <View style={styles.imageContainer}>
          <Text maxFontSizeMultiplier={1.3} style={styles.welcomeText}>Welcome to</Text>
          <Image
            source={images.lpTitleLogo}
            resizeMode='contain'
            style={styles.mainImage}
          />
        </View>
        <View style={styles.textContainer}>
          <CustomButtonWithIcon
            title='Continue'
            buttonStyles={styles.continueButton}
            handlePress={() => router.push('(tabs)/home')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '20@vs'
  },
  logo: {
    width: '90@ms0.2',
    height: '90@ms0.2',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: '250@s',
    height: '250@s',
    aspectRatio: 1,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    margin: '25@s',
    gap: '20@vs'
  },
  welcomeText: {
    fontFamily: 'Outfit-Regular',
    fontSize: '25@ms',
    textAlign: 'center',
  },
  titleText: {
    fontFamily: 'Outfit-Bold',
    fontSize: '38@ms',
    textAlign: 'center',
  },
  yearText: {
    fontFamily: 'Outfit-Bold',
    fontSize: '25@ms',
    textAlign: 'center',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EA1D25',
    borderRadius: 100,
    paddingHorizontal: 25,
    paddingVertical: 22,
    width: '100%',
  },
});