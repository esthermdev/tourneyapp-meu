import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { router } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from '../../context/AuthProvider';

export default function Account({ session }) {
  const { profile, setProfile } = useAuth();

  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

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
  }

  return (
    <View style={styles.container}>
      <Text>Welcome {fullName}!</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Full Name" value={fullName || ''} onChangeText={(text) => setFullName(text)} autoCapitalize='words' />
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text className='text-base text-gray-500 font-bold'>Your Team</Text>
        <Dropdown
          style={styles.dropdown}
          itemTextStyle={{color: 'white'}} 
          activeColor='purple'
          itemContainerStyle={{backgroundColor: 'lightgray'}}
          data={teams}
          labelField='name'
          valueField='id'
          placeholder='Select a team..'
          value={teamId}
          search
          searchPlaceholder="Search..."
          onChange={item => {
            setTeamId(item.id)
          }}
        />
        {teamId && <Text h5>Selected Team ID: {teamId}</Text>}
      </View>
      
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ full_name: fullName, team_id: teamId, avatar_url: avatarUrl })}
          disabled={loading}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  dropdown: {
    marginTop: 10, 
    backgroundColor: 'pink', 
    padding: 10
  },
  mt20: {
    marginTop: 20,
  },
})