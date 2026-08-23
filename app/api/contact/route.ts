import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: "jashwanth0320@gmail.com",
            replyTo: email,
            subject: `New message from ${name} — Portfolio`,
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0d1117;color:#e2e8f0;border-radius:12px;border:1px solid #1e293b;">
                    <h2 style="color:#00f5d4;margin-bottom:4px;">New Portfolio Message</h2>
                    <p style="color:#475569;font-size:13px;margin-top:0;">Sent via your portfolio contact form</p>
                    <hr style="border-color:#1e293b;margin:16px 0;" />
                    <p><strong style="color:#94a3b8;">From:</strong> ${name}</p>
                    <p><strong style="color:#94a3b8;">Email:</strong> <a href="mailto:${email}" style="color:#00f5d4;">${email}</a></p>
                    <p><strong style="color:#94a3b8;">Message:</strong></p>
                    <p style="background:#050816;padding:16px;border-radius:8px;border-left:3px solid #00f5d4;white-space:pre-wrap;">${message}</p>
                </div>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact API error:", err);
        return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }
}
