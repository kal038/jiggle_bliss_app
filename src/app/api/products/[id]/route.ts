import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

/**
 * Server-side API endpoint to serve a single product by ID
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

  //Response.json(bodyData, responseOptions)
    
  return Response.json({ product: data }, { status: 200 }) // return product:[{data}], this is called the wrapper object pattern, allow us to add more data to the response in the future e.g. status, error, etc
}