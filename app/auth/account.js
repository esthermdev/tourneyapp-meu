import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { router } from 'expo-router'

export default function Account({ session }) {
	const [profile, setProfile] = useState([])
  const [loading, setLoading] = useState(true)
  const [fullName, setFullName] = useState('')
  const [teamId, setTeamId] = useState(null)
	const [isTeamIdSet, setIsTeamIdSet] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('')


  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, team_id, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullName(data.full_name)
        setTeamId(data.team_id)
        setAvatarUrl(data.avatar_url)
				setIsTeamIdSet(!!data.team_id);
				setProfile(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ full_name, team_id, avatar_url }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        full_name,
        team_id,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      } else {
				setIsTeamIdSet(!!team_id);
			}
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Welcome {fullName}!</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Full name" value={fullName || ''} onChangeText={(text) => setFullName(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Team ID" value={teamId !== null ? teamId.toString() : ''} onChangeText={(text) => setTeamId(parseInt(text))} disabled={isTeamIdSet} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Save'}
          onPress={() => updateProfile({ full_name: fullName, team_id: teamId, avatar_url: avatarUrl })}
          disabled={loading}
        />
      </View>

			<View style={styles.verticallySpaced}>
				<Button title='Go to Home' onPress={() => router.push('(tabs)/home')}/>
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  )
}

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
  mt20: {
    marginTop: 20,
  },
})