import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
    const supabase = await createClient()
    const { data } = await supabase.from('products').select('*')

    return NextResponse.json({ products: data }) //return products:[{data}]
}
