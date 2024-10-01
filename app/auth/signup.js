import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Button } from '@rneui/themed';
import { router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '../../utils/supabase';
import { ScrollView } from 'react-native-gesture-handler';
import SearchModal from '../../components/SearchModal';
import { validateEmail } from '../../utils/validateEmail';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeams, setFilteredTeams] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from('teams')
      .select('id, name');

    if (error) {
      console.error('Error fetching teams:', error);
    } else {
      setTeams(data);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = teams.filter(team =>
      team.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTeams(filtered);
  };

  async function signUpWithEmail() {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    console.log('Signing up with:', { email, password, fullName, teamId });

    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
          team_id: teamId,
        },
        emailRedirectTo: 'tourneyapp-meu://auth',
      }
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else if (data.user) {
      Alert.alert(
        'Confirmation Email Sent',
        'Please check your email to confirm your account.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/')  // Navigate back to the login screen
          }
        ]
      );
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu" size={30} color="#EA1D25" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.header}>Create Account</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setFullName}
                value={fullName}
                placeholder="Full Name"
                placeholderTextColor='#cdd0d4'
                autoCapitalize='words'
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="email@address.com"
                placeholderTextColor='#cdd0d4'
                autoCapitalize='none'
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                placeholderTextColor='#cdd0d4'
                secureTextEntry
                autoCapitalize='none'
              />
            </View>
            <TouchableOpacity
              style={styles.teamSelector}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.teamSelectorText}>
                {teamId === null ? 'Select a team...' : (teams.find(team => team.id === teamId)?.name || 'Select a team...')}
              </Text>
              <Ionicons name="caret-down" size={24} color="#333243" />
            </TouchableOpacity>
            <View>
              <Button
                title="Sign up"
                disabled={loading}
                onPress={() => signUpWithEmail()}
                buttonStyle={styles.primaryButton}
                titleStyle={styles.buttonText}
              />
            </View>
            <View>
              <Text style={styles.loginText}>Already have an account?</Text>
              <Button
                title='Log in'
                onPress={() => router.back()}
                buttonStyle={styles.secondaryButton}
                titleStyle={[styles.buttonText, styles.secondaryButtonText]}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <SearchModal
        isVisible={isModalVisible}
        teams={searchQuery ? filteredTeams : teams}
        onClose={() => setIsModalVisible(false)}
        onSelect={(id) => setTeamId(id)}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        showNoneOption={true}
        onSelectNone={() => setTeamId(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  menuButton: {
    marginTop: 20,
    marginLeft: 20
  },
  content: {
    padding: 20
  },
  header: {
    fontFamily: 'Outfit-Bold',
    fontSize: 28,
    color: '#EA1D25',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    height: 60,
    borderColor: '#8F8DAA',
    borderWidth: 1,
    paddingHorizontal: 22,
    borderRadius: 100,
    fontFamily: 'Outfit-Regular',
    fontSize: 18
  },
  teamSelector: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#8F8DAA',
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 22,
    marginBottom: 12,
  },
  teamSelectorText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 18,
    color: '#333243',
  },
  primaryButton: {
    height: 60,
    backgroundColor: '#EA1D25',
    paddingHorizontal: 22,
    borderRadius: 100,
    marginBottom: 20,
  },
  secondaryButton: {
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#EA1D25',
    borderWidth: 1,
    paddingHorizontal: 22,
    borderRadius: 100,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
  },
  secondaryButtonText: {
    color: '#EA1D25',
  },
  loginText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: '#333243',
    marginBottom: 10,
    alignSelf: 'center'
  },
});