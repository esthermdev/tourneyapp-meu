import { createClient } from 'jsr:@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('EXPO_PUBLIC_SUPABASE_URL')!,
  Deno.env.get('EXPO_PUBLIC_SUPABASE_ANON_KEY')!
)

Deno.serve(async (req) => {
  const { requestId, driverId, action } = await req.json()

  if (action === 'accept') {
    const { data, error } = await supabase
      .from('cart_requests')
      .update({ status: 'confirmed', driver_id: driverId })
      .eq('id', requestId)
      .eq('status', 'pending')
      .select()
      .single()

    if (error) {
      console.error('Error updating request:', error)
      return new Response(JSON.stringify({ error: 'Failed to update request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (data) {
      // Notify the user that a driver has accepted
      // You'll need to implement this part based on how you want to notify the user
      return new Response(JSON.stringify({ message: 'Request accepted' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      return new Response(JSON.stringify({ message: 'Request already taken or expired' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } else if (action === 'cancel') {
    // If a driver cancels, we don't need to do anything as the request will timeout if no one else accepts
    return new Response(JSON.stringify({ message: 'Request cancelled by driver' }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ error: 'Invalid action' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  })
})