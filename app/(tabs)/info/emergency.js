import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';

const EmergencyScreen = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title='Emergency' route='info' />
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.contentHeader}>Maine Ultimate's Emergency Preparedness Plan: Wainwright</Text>

        <Text style={styles.contentSubHeader}>Emergency Personnel:</Text>
        <Text style={styles.content}>
          Certified Athletic Trainer (ATC) located in a central spot, the Red Shed or designated central spot, within the Quads/Wainwright during practices, games, and tournaments.
        </Text>

        <Text style={styles.contentSubHeader}>Emergency Communication:</Text>
        <Text style={styles.content}>
          The ATC(s) onsite carries a cell phone and radio (if applicable). Coaches on the fields should carry a cell phone and/or radio. Contact information should be shared between coaches and ATC(s) for quicker communication.
        </Text>

        <Text style={styles.contentSubHeader}>Emergency Equipment:</Text>
        <Text style={styles.content}>
          Maine Ultimate provides access to an AED for the Athletic Trainer. The Athletic Trainer should supply their own medical kit. Emergency supplies are stored in the Red Shed including a splint kit, crutches, wound care necessities, and other items as needed.
        </Text>

        <Text style={styles.contentSubHeader}>Roles of the Certified Athletic Trainer:</Text>
        <Text style={styles.content}>
          • Immediate evaluation and care of injured or ill athlete(s) on the field.{'\n'}
          • Determine the need for and delegate the activation of EMS.{'\n'}
          • Return to Play (RTP) decision-making on the injured athlete.{'\n'}
          • Physician referral of injured athlete (if needed).{'\n'}
          • Contacting Maine Ultimate President or site representative regarding emergency situations or serious injuries.{'\n'}
          • Contacting parent(s) of injured athletes under 18.
        </Text>

        <Text style={styles.contentSubHeader}>Roles of Student Athletic Trainer (ATS) and/or Coaches:</Text>
        <Text style={styles.content}>
          • Call 911 (provide necessary information).{'\n'}
          • Scene control: limit scene to sports medicine personnel and move bystanders away.{'\n'}
          • Provide secondary help in immediate care, if requested by the Athletic Trainer.{'\n'}
          • Assign a lookout to direct arriving EMS personnel to the scene.
        </Text>

        <Text style={styles.contentSubHeader}>Roles of Coaches if ATC is NOT present:</Text>
        <Text style={styles.content}>
          • Activate EMS in ALL emergency situations.{'\n'}
          • Call 911 (provide necessary information).{'\n'}
          • Assign a lookout to direct arriving EMS personnel to the scene.{'\n'}
          • Notify the Athletic Trainer and Maine Ultimate President/onsite Representative of the incident.{'\n'}
          • For non-emergencies, contact the Athletic Trainer or designated medical personnel for return to play questions.
        </Text>

        <Text style={styles.contentSubHeader}>Roles of Maine Ultimate Staff:</Text>
        <Text style={styles.content}>
          Ensure Wainwright's field access route is clear and accessible to emergency personnel. Ensure a Wainwright Staff member has unlocked and opened any necessary gates on the field access route. Aid in crowd control if necessary.
        </Text>

        <Text style={styles.contentSubHeader}>Storm Safety Location:</Text>
        <Text style={styles.content}>
          In the event of lightning or severe storm warning, move all individuals inside the main building, inside cars, or inside buses.
        </Text>

        <Text style={styles.contentSubHeader}>Venue Address:</Text>
        <Text style={styles.content}>
          Wainwright Sports Complex{'\n'}
          125 Gary L Maietta Parkway{'\n'}
          South Portland, Maine 04106
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollview: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
  },
  contentHeader: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(22),
    color: '#EA1D25',
    marginBottom: ms(15),
    textDecorationLine: 'underline'
  },
  contentSubHeader: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: ms(18),
    color: '#333',
    marginTop: ms(15),
    marginBottom: ms(5),
  },
  content: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(16),
    color: '#333',
    lineHeight: ms(22),
  },
});

export default EmergencyScreen;