import { View, Text, StyleSheet } from 'react-native';
import ScheduleList from '../../../../components/ScheduleList';
import CustomHeader from '../../../../components/CustomHeader';

export default function OpenScheduleIndex() {
  return (
    <View style={styles.container}>
      <CustomHeader title='Men - Upper' route='schedule' />
      <ScheduleList division='men_upper' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});