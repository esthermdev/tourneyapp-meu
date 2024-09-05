import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native';
import { supabase } from '../../utils/supabase';
import { Button } from '@rneui/base';
import { router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from '../../context/AuthProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const { profile, setProfile } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

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

  useEffect(() => {
    setLoading(true);
    if (session) {
      setExpoPushToken(profile?.expo_push_token);
      setTeamId(profile?.team_id ?? '');
      setFullName(profile?.full_name ?? '');
      setAvatarUrl(profile?.avatar_url ?? '');
    };
    setLoading(false);
  }, [session, profile]);

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
        setProfile(updates);
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

  // When user signs out
  const signOut = async () => {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ is_logged_in: false })
      .eq('id', session.user.id);

    if (updateError) {
      throw updateError;
    }

    // Then, sign out
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      throw signOutError;
    }
  };

  const DropdownComponent = useMemo(() => {
    return (
      <Dropdown

        style={styles.dropdown}
        selectedTextStyle={styles.dropdownSelectedText}
        placeholderStyle={styles.dropdownPlaceholder}
        containerStyle={styles.dropdownList}
        activeColor='#FFEBEC'
        renderRightIcon={() => (
          <View>
            <Ionicons name="caret-down" size={24} color="#333243" />
          </View>
        )}
        data={teams}
        labelField='name'
        valueField='id'
        placeholder='Select a team...'
        value={teamId}
        onChange={item => setTeamId(item.id)}
        search
        inputSearchStyle={styles.searchInput}
        searchPlaceholder="Search..."
        renderItem={item => (
          <View>
            <Text style={styles.dropdownItemText}>{item.name}</Text>
          </View>
        )}
      />
    );
  }, [teams, teamId]);

  return (
    <SafeAreaView className='h-full' style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu" size={30} color="#EA1D25" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Text style={styles.header}>My Account</Text>
            <Text style={styles.inputLabel}>Your Email</Text>
            <TextInput
              label="Email"
              value={session?.user?.email}
              editable={false}
              style={styles.input}
              className='text-gray-400'
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
              {DropdownComponent}
            </View>

            <Button
              title={loading ? 'Updating ...' : 'Update Profile'}
              onPress={() => updateProfile({ full_name: fullName, team_id: teamId, avatar_url: avatarUrl })}
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
              style={{ marginTop: 10 }}
              title="Press to Send Notification"
              onPress={async () => {
                await sendPushNotification(expoPushToken);
              }}
            />
            <Text>{profile.id}</Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    fontSize: 16,
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
    borderRadius: 30,
    fontFamily: 'Outfit-Regular',
    fontSize: 18
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
    color: '#333243',
    marginBottom: 5,
  },
  dropdown: {
    height: 60,
    borderColor: '#8F8DAA',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  searchInput: {
    borderColor: '#CBC9E1',
    borderRadius: 12,
    margin: 0,
    fontFamily: 'Outfit-Light'
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
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    color: 'black',
    padding: 15
  },
  dropdownPlaceholder: {
    color: 'black',
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
  },
  dropdownSelectedText: {
    color: 'black',
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
  },
  primaryButton: {
    height: 60,
    backgroundColor: '#EA1D25',
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10,
  },
  secondaryButton: {
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#EA1D25',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#EA1D25',
  },
});