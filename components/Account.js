import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  AppState
} from 'react-native';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthProvider';
import { Button } from '@rneui/base';
import { router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import SearchModal from '../components/SearchModal';

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export default function Account({ session }) {
  const { profile, getProfile } = useAuth()

  const [expoPushToken, setExpoPushToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeams, setFilteredTeams] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    if (session?.user) {
      getProfile(session?.user?.id)
    }
    fetchTeams()
    setLoading(false)
  }, [session]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setTeamId(profile.team_id || null);
      setIsAdmin(profile.is_admin || false);
      setAvatarUrl(profile.avatar_url || '');
      setExpoPushToken(profile?.expo_push_token)
    }
  }, [profile]);


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

  async function updateProfile({ full_name, team_id, avatar_url }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        full_name,
        team_id,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error
      } else {
        setFullName(profile?.full_name);
        setTeamId(profile?.team_id);
        getProfile(session?.user?.id)
      }

    } catch (error) {
      if (error) {
        Alert.alert(error.message)
      };

    } finally {
      Alert.alert(
        'Profile successfully updated.',
        '',
        [
          {
            text: 'Close',
            style: 'cancel'
          },
          {
            text: 'Go home',
            onPress: () => router.push('(tabs)/home')
          }
        ],
        { cancelable: false }
      );
      setLoading(false);
    }
  };

  const signOut = async () => {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ is_logged_in: false })
      .eq('id', session.user.id);

    if (updateError) {
      throw updateError;
    }

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      throw signOutError;
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = teams.filter(team =>
      team.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTeams(filtered);
  };

  const TeamSelector = useMemo(() => {
    return (
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.dropdownSelectedText}>
          {teamId === null ? 'None (non-player)' : (teams.find(team => team.id === teamId)?.name || 'Select a team...')}
        </Text>
        <Ionicons name="caret-down" size={24} color="#333243" />
      </TouchableOpacity>
    );
  }, [teams, teamId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu" size={30} color="#EA1D25" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>My Account</Text>
        <Text style={styles.inputLabel}>Your Email</Text>
        <TextInput
          label="Email"
          value={session?.user?.email}
          editable={false}
          style={styles.input}
          className='text-gray-300'
        />
        <Text style={styles.inputLabel}>Your Name</Text>
        <TextInput
          value={fullName || ''}
          onChangeText={(text) => setFullName(text)}
          autoCapitalize='words'
          style={styles.input}
        />
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Your Team</Text>
          {TeamSelector}
        </View>
        <Button
          title={loading ? 'Updating ...' : 'Update Profile'}
          onPress={() => updateProfile({
            full_name: fullName,
            team_id: teamId,
          })
          }
          disabled={loading}
          buttonStyle={styles.primaryButton}
          titleStyle={styles.buttonText}
        />
        <Button
          title="Sign Out"
          onPress={signOut}
          buttonStyle={styles.secondaryButton}
          titleStyle={[styles.buttonText, styles.secondaryButtonText]}
        />
        <Button
          style={{ marginTop: 20 }}
          title="Press to Test Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
      </ScrollView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  inputLabel: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: '#333243',
    marginBottom: 5,
  },
  input: {
    height: 60,
    borderColor: '#8F8DAA',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 100,
    fontFamily: 'Outfit-Regular',
    fontSize: 18
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: '#333243',
    marginBottom: 5,
  },
  dropdown: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#8F8DAA',
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  dropdownList: {
    borderColor: '#8F8DAA',
    borderWidth: 1,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      height: 10
    },
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: 4,
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    color: 'black',
    padding: 15
  },
  dropdownPlaceholder: {
    color: 'black',
    fontFamily: 'Outfit-Regular',
    fontSize: 18,
  },
  dropdownSelectedText: {
    color: 'black',
    fontFamily: 'Outfit-Regular',
    fontSize: 18,
  },
  primaryButton: {
    height: 60,
    backgroundColor: '#EA1D25',
    paddingHorizontal: 20,
    borderRadius: 100,
    marginBottom: 10,
  },
  secondaryButton: {
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#EA1D25',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 18,
  },
  secondaryButtonText: {
    color: '#EA1D25',
  },
});