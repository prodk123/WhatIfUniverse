import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, message } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ success: false, message: 'Message is required.' }, { status: 400 });
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'b1678c0d-6b92-40fc-91ef-1b405ca78438';

    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[What If Universe] New Feedback: ${category || 'General'}`,
        from_name: 'What If Universe Anonymous Feedback',
        category: category || 'General Feedback',
        message: message.trim(),
        submitted_at: new Date().toISOString(),
      }),
    });

    const data = await web3Response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: data.message || 'Error submitting feedback.' },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error processing feedback.' },
      { status: 500 }
    );
  }
}
