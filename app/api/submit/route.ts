import { NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Replace with your Gmail
        pass: process.env.GMAIL_PASS, // Set this in your environment variables
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER, // Replace with your Gmail
      to: 'Anthonyyousef01@gmail.com',
      subject: "💝 New Valentine's Date Response!",
      html: `
        <h1>New Valentine's Date Response</h1>
        <p><strong>Answer:</strong> ${data.answer}</p>
        <p><strong>Activity:</strong> ${data.activity}</p>
        <p><strong>Food Choice:</strong> ${data.food}</p>
        <p><strong>Date:</strong> ${new Date(
          data.date
        ).toLocaleDateString()}</p>
        <p><strong>Additional Notes:</strong> ${
          data.notes || 'No notes provided'
        }</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
