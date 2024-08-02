import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Alert, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { supabase } from '../../utils/supabase';
import { Button, Input } from '@rneui/themed';
import { router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from '../../context/AuthProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Account({ session }) {
  const { profile, setProfile } = useAuth();

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

  return (
    <SafeAreaView style={styles.container}>
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
            <Input
              label="Email"
              value={session?.user?.email}
              disabled
              inputStyle={styles.inputText}
              labelStyle={styles.inputLabel}
              containerStyle={styles.input}
              leftIcon={{ type: 'ionicon', name: 'mail', color: '#EA1D25' }}
            />
            
            <Input
              label="Full Name"
              value={fullName || ''}
              onChangeText={(text) => setFullName(text)}
              autoCapitalize='words'
              inputStyle={styles.inputText}
              labelStyle={styles.inputLabel}
              containerStyle={styles.input}
              leftIcon={{ type: 'ionicon', name: 'person', color: '#EA1D25' }}
            />

            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Your Team</Text>
              <Dropdown
                style={styles.dropdown}
                itemTextStyle={styles.dropdownItemText}
                closeModalWhenSelectedItem={true}
                inputSearchStyle={styles.inputSearch}
                activeColor='#EA1D25'
                containerStyle={styles.dropdownList}
                data={teams}
                labelField='name'
                valueField='id'
                placeholder='Select a team...'
                value={teamId}
                search
                searchPlaceholder="Search..."
                onChange={item => {
                  setTeamId(item.id)
                }}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelectedText}
              />
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
              onPress={() => supabase.auth.signOut()} 
              buttonStyle={styles.secondaryButton}
              titleStyle={[styles.buttonText, styles.secondaryButtonText]}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  input: {
    paddingHorizontal: 0,
    marginBottom: 15,
  },
  inputLabel: {
    fontFamily: 'Outfit-Medium',
    color: '#333243',
  },
  inputText: {
    fontFamily: 'Outfit-Regular',
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
    color: '#333243',
    marginBottom: 5,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  inputSearch: {
    borderColor: '#ccc',
    borderRadius: 4,
    fontFamily: 'Outfit-Regular',
    color: '#999',
  },
  dropdownList: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    color: '#333243',
  },
  dropdownPlaceholder: {
    color: '#999',
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
  },
  dropdownSelectedText: {
    color: '#333243',
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#EA1D25',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderColor: '#EA1D25',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#EA1D25',
  },
});