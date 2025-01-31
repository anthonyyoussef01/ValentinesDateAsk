import { NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';

// Force the route to be dynamic
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'anthonyyoussef01@gmail.com', 
      subject: "💝 New Valentine's Date Response!",
      html: `
        <h1>New Valentine's Date Response</h1>
        <p><strong>Answer:</strong> ${data.answer}</p>
        <p><strong>Activity:</strong> ${data.activity}</p>
        <p><strong>Food Choice:</strong> ${data.food}</p>
        <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
        <p><strong>Additional Notes:</strong> ${data.notes || 'No notes provided'}</p>
      `,
    };
    
    //TODO: enable these lines when you're ready to send emails
    // await transporter.verify();
    // await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
