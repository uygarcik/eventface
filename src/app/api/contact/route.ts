import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Ad, e-posta ve mesaj zorunlu" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Geçersiz e-posta adresi" }, { status: 400 });
    }

    // Save to database
    await prisma.contact.create({
      data: { name, email, phone: phone || null, company: company || null, message },
    });

    // Send notification email
    await resend.emails.send({
      from: "Phogo <info@phogo.app>",
      to: "frkntncr1@gmail.com",
      replyTo: email,
      subject: `Yeni Demo Talebi — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: #4B4FAE; padding: 20px 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Yeni Demo Talebi</h1>
          </div>
          <div style="background: #f8f9ff; padding: 24px; border: 1px solid #e5e7f0; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b; width: 130px; font-size: 14px;">Ad Soyad</td><td style="padding: 8px 0; font-weight: bold; color: #1e293b;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">E-posta</td><td style="padding: 8px 0; font-weight: bold; color: #1e293b;"><a href="mailto:${email}" style="color: #4B4FAE;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Telefon</td><td style="padding: 8px 0; font-weight: bold; color: #1e293b;">${phone}</td></tr>` : ""}
              ${company ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Şirket</td><td style="padding: 8px 0; font-weight: bold; color: #1e293b;">${company}</td></tr>` : ""}
            </table>
            <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 13px; margin-bottom: 8px;">Mesaj:</p>
              <p style="margin: 0; color: #1e293b; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            <div style="margin-top: 20px; text-align: center;">
              <a href="mailto:${email}" style="background: #4B4FAE; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">Hemen Yanıtla</a>
            </div>
          </div>
          <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">phogo.app · Otomatik bildirim</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
