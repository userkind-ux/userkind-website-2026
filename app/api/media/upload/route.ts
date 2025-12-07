import { uploadMediaAction } from '@/app/actions/media'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    // Log form data for debugging
    console.log('Form data keys:', Array.from(formData.keys()))
    const file = formData.get('file')
    console.log('File:', file ? { name: (file as File).name, size: (file as File).size, type: (file as File).type } : 'null')
    console.log('Filename:', formData.get('filename'))
    console.log('Alt text:', formData.get('alt_text'))
    console.log('Media type:', formData.get('media_type'))
    
    const result = await uploadMediaAction(formData)

    if (result.error) {
      console.error('Upload action error:', result.error)
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Upload route error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload media' },
      { status: 500 }
    )
  }
}

