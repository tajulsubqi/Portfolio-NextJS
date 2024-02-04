import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const { email, subject, message } = await request.json()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "subqitajul7@gmail.com",
        pass: "pcud dyrt dzlf qjog",
      },
    })

    const mailOption = {
      from: `${email}`,
      to: "subqitajul7@gmail.com",
      subject: "Send Email",
      html: `
        <div style="font-family: 'Arial', sans-serif; background-color: #f5f5f5; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">New Email Submission</h2>
          <hr style="border: 1px solid #ddd;">
          <p style="color: #555; font-size: 16px;"><strong>Email:</strong> ${email}</p>
          <p style="color: #555; font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
          <p style="color: #555; font-size: 16px;"><strong>Message:</strong></p>
          <p style="color: #555; font-size: 16px; padding-left: 20px;">${message}</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOption)

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
