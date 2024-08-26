import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import ScheduleList from '../../../../components/ScheduleList';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MixedScheduleIndex() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={25} color="#EA1D25" />
        </TouchableOpacity>
        <Text style={styles.header}>Mixed</Text>
      </View>
      <ScheduleList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    fontFamily: 'Outfit-Bold',
    fontSize: 35,
    color: '#EA1D25'
  },
  backButton: {
    marginRight: 15,
  },
});