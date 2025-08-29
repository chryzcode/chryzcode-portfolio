import { NextRequest, NextResponse } from 'next/server'
import axios, { AxiosError } from "axios"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, purpose, message, to } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email via Brevo SMTP API
    const API_KEY = process.env.BREVO_API_KEY as string
    const senderEmail = process.env.SENDER_EMAIL as string

    if (!API_KEY || !senderEmail) {
      console.error('Missing environment variables: BREVO_API_KEY or SENDER_EMAIL')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const emailSubject = `New Contact Form Submission from ${name}`
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Purpose:</strong> ${purpose}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;">
          <p>This message was sent from your portfolio contact form at ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `

    const payload = {
      sender: { 
        name: "Portfolio Contact Form", 
        email: senderEmail 
      },
      to: [{ email: to }],
      subject: emailSubject,
      htmlContent: emailHtml,
    }

    try {
      await axios.post("https://api.brevo.com/v3/smtp/email", payload, {
        headers: {
          "api-key": API_KEY,
          "Content-Type": "application/json",
        },
      })
      
      console.log('Contact form email sent successfully via Brevo')
      
      return NextResponse.json({ 
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      })

    } catch (emailError: unknown) {
      if (emailError instanceof AxiosError) {
        console.error("Brevo API Error:", emailError.response?.data || emailError)
      }
      
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
