import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScheduleList from '../../../../components/ScheduleList';
import CustomHeader from '../../../../components/CustomHeader';

export default function MixedScheduleIndex() {
  return (
    <View style={styles.container}>
      <CustomHeader title='Mixed' />
      <ScheduleList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});