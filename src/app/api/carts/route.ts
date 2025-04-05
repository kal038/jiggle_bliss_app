import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
    const supabase = await createClient()
    const { data } = await supabase.from('carts').select('*')

    return NextResponse.json({ carts: data })
}
