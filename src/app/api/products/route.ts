import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const supabase = createRouteHandlerClient({ cookies })
  const { data } = await supabase.from('products').select('*')
  
  return NextResponse.json({ products: data }) //return products:[{data}]
}