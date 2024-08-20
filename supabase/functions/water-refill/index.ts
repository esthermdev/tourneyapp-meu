import { createClient } from 'jsr:@supabase/supabase-js@2'

interface WaterRefill {
  id: string
  field_number: number
}

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record: WaterRefill
  schema: 'public'
  old_record: null | WaterRefill
}

const supabase = createClient(
  Deno.env.get('EXPO_PUBLIC_SUPABASE_URL')!,
  Deno.env.get('EXPO_PUBLIC_SUPABASE_ANON_KEY')!
)

Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json()

  // Only proceed if this is an INSERT operation
  if (payload.type !== 'INSERT') {
    return new Response(JSON.stringify({ message: 'No action taken' }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { data: volunteers } = await supabase
    .from('profiles')
    .select('id, expo_push_token')
    .eq('is_volunteer', true)
    .eq('is_logged_in', true)

  if (volunteers && volunteers.length > 0) {
    const notification = {
      title: 'Refill Water Jugs',
      body: `Please refill water jugs at Field ${payload.record.field_number}`,
      data: { requestId: payload.record.id },
    }

    const messages = volunteers.map(volunteer => ({
      to: volunteer.expo_push_token,
      ...notification,
    }))

    const res = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Deno.env.get('EXPO_ACCESS_TOKEN')}`,
      },
      body: JSON.stringify(messages),
    }).then((res) => res.json())

    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ message: 'No action taken' }), {
    headers: { 'Content-Type': 'application/json' },
  })
})