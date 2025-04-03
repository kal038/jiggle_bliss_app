import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Server-side API endpoint to serve a single product by ID | GET | DELETE
 * @param request - The incoming request object
 * @param params - The route parameters, including the product ID
 * @returns A JSON response containing the product data or an error message
 * @throws 404 if the product is not found
 */

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const supabase = await createClient()
    const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

    if (!data) {
        return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
        )
    }
    return NextResponse.json(
        { product: data },
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const supabase = await createClient()
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
        return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
        )
    }
    return NextResponse.json(
        { message: 'Product deleted successfully' },
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
}
