import { View, Text, StyleSheet } from 'react-native';
import ScheduleList from '../../../../components/ScheduleList';
import CustomHeader from '../../../../components/CustomHeader';

export default function OpenScheduleIndex() {
  return (
    <View style={styles.container}>
      <CustomHeader title='Open' />
      <ScheduleList division='open' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});