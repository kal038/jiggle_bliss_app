import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

/**
 * Server-side endpoint to serve a single product by ID
 */

export async function GET(
  request: Request, 
  { params }: { params: { id: string }}
) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()
    
  return Response.json({ product: data }) //return product:[{data}]
}