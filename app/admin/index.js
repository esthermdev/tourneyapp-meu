import { Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import { router } from 'expo-router';

const AdminScreen = () => {
  const { user, profile } = useAuth();

  const adminOptions = [
    { title: 'Update Scores', route: 'admin/update-scores' },
    { title: 'Update Schedule', route: 'admin/update-schedule' },
  ];

  const handlePress = (screen) => {
    if (!user || profile.role !== 'admin') {
      Alert.alert(
        "Access denied",
        "You are not allowed to access this page.",
        [{ text: "OK" }]
      );
    } else {
      router.push(`/${screen}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      {adminOptions.map((option, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.optionButton}
          onPress={() => handlePress(option.route)}
        >
          <Text style={styles.optionText}>{option.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    optionButton: {
      backgroundColor: '#EA1D25',
      padding: 15,
      borderRadius: 5,
      marginBottom: 10,
    },
    optionText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
    },
    errorText: {
      fontSize: 18,
      color: 'red',
      textAlign: 'center',
    },
  });
  

export default AdminScreen;