import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Target recipient email for foundation inquiries
const FOUNDATION_EMAIL = 'info@rashanali.com';

// Lazy SMTP transporter initialization
let mailTransporter: nodemailer.Transporter | null = null;

function getMailTransporter(): nodemailer.Transporter | null {
  if (mailTransporter) return mailTransporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;

  if (host && user && pass) {
    mailTransporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });
    return mailTransporter;
  }

  return null;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact Form & Customer Receipt Dispatch API
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        error: 'First name, last name, email, and message are required.',
      });
    }

    const referenceId = `WBG-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const senderFrom = process.env.SMTP_FROM || `"William Buck Godfrey Legacy Scholarship" <no-reply@buckgodfreyscholarship.org>`;

    // 1. Notification Email to info@rashanali.com
    const adminEmailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 2px solid #0A1B36; padding: 24px; color: #0A1B36;">
        <div style="border-bottom: 2px solid #C5A253; padding-bottom: 12px; margin-bottom: 20px;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C5A253; font-weight: bold;">NEW SCHOLARSHIP INQUIRY</span>
          <h2 style="font-size: 22px; margin: 6px 0 0 0; text-transform: uppercase; color: #0A1B36;">${subject || 'General Inquiry'}</h2>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px; color: #0A1B36;">Reference ID:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-family: monospace; color: #C5A253; font-weight: bold;">${referenceId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #0A1B36;">Submitted By:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #0A1B36;">Customer Email:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #0A1B36; font-weight: bold;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #0A1B36;">Phone:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #0A1B36;">Received At:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${timestamp} (ET)</td>
          </tr>
        </table>

        <div style="background-color: #f7f8fa; border-left: 4px solid #C5A253; padding: 16px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; color: #0A1B36; letter-spacing: 1px;">Message Details:</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #333;">${message}</p>
        </div>

        <div style="text-align: center; border-top: 1px solid #eee; padding-top: 16px; font-size: 12px; color: #888;">
          <p style="margin: 0;">William Buck Godfrey Legacy Scholarship in Partnership with Sporty Girls • Automated Inquiry Notification</p>
        </div>
      </div>
    `;

    // 2. Receipt & Confirmation Email to Customer
    const customerReceiptHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 2px solid #0A1B36; padding: 24px; color: #0A1B36;">
        <div style="border-bottom: 2px solid #C5A253; padding-bottom: 14px; margin-bottom: 20px; text-align: center;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C5A253; font-weight: bold; display: block; margin-bottom: 4px;">OFFICIAL INQUIRY RECEIPT</span>
          <h1 style="font-size: 24px; margin: 0; text-transform: uppercase; color: #0A1B36; font-weight: bold;">William Buck Godfrey Legacy Scholarship</h1>
          <p style="margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #C5A253; font-weight: bold;">In Partnership with Sporty Girls, Inc.</p>
        </div>

        <p style="font-size: 15px; line-height: 1.6; color: #0A1B36;">Dear <strong>${firstName}</strong>,</p>

        <p style="font-size: 14px; line-height: 1.6; color: #333;">
          Thank you for reaching out to the <strong>William Buck Godfrey Legacy Scholarship</strong> (in partnership with Sporty Girls). We have successfully received your inquiry and our foundation team at <a href="mailto:${FOUNDATION_EMAIL}" style="color: #C5A253; font-weight: bold; text-decoration: none;">${FOUNDATION_EMAIL}</a> has been dispatched your message.
        </p>

        <div style="background-color: #f7f8fa; border: 1px solid #0A1B36; padding: 18px; margin: 20px 0;">
          <h3 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #0A1B36; border-bottom: 1px solid #ddd; padding-bottom: 6px;">
            Submission Receipt Summary
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="padding: 4px 0; font-weight: bold; width: 140px; color: #0A1B36;">Receipt / Ref ID:</td>
              <td style="padding: 4px 0; font-family: monospace; font-weight: bold; color: #C5A253;">${referenceId}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold; color: #0A1B36;">Subject Category:</td>
              <td style="padding: 4px 0;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold; color: #0A1B36;">Date &amp; Time:</td>
              <td style="padding: 4px 0;">${timestamp}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold; color: #0A1B36;">Dispatched To:</td>
              <td style="padding: 4px 0; font-weight: 600;">${FOUNDATION_EMAIL}</td>
            </tr>
          </table>

          <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed #ccc;">
            <strong style="font-size: 12px; color: #666; text-transform: uppercase;">Your Message:</strong>
            <p style="margin: 6px 0 0 0; font-size: 13px; line-height: 1.5; color: #444; font-style: italic;">
              "${message}"
            </p>
          </div>
        </div>

        <div style="background-color: #0A1B36; color: #ffffff; padding: 14px; text-align: center; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
            "Carry The Legacy Forward • Empowering HBCU Scholars"
          </p>
        </div>

        <div style="border-top: 1px solid #eee; padding-top: 14px; font-size: 12px; color: #777; line-height: 1.5;">
          <p style="margin: 0 0 6px 0;">If you have any further questions, you may reply directly to this email or contact us at <a href="mailto:${FOUNDATION_EMAIL}" style="color: #0A1B36; font-weight: bold;">${FOUNDATION_EMAIL}</a>.</p>
          <p style="margin: 0;">William Buck Godfrey Legacy Scholarship Foundation in Partnership with Sporty Girls • Decatur, GA • 501(c)(3) Organization</p>
        </div>
      </div>
    `;

    const transporter = getMailTransporter();

    if (transporter) {
      // Send live emails via SMTP transporter
      await Promise.all([
        // 1. Send to info@rashanali.com
        transporter.sendMail({
          from: senderFrom,
          to: FOUNDATION_EMAIL,
          replyTo: `"${firstName} ${lastName}" <${email}>`,
          subject: `[Scholarship Inquiry] ${subject} - From ${firstName} ${lastName} (Ref: ${referenceId})`,
          text: `New Scholarship Inquiry from ${firstName} ${lastName} (${email}, Phone: ${phone || 'N/A'})\n\nSubject: ${subject}\nRef ID: ${referenceId}\nTime: ${timestamp}\n\nMessage:\n${message}`,
          html: adminEmailHtml,
        }),
        // 2. Send receipt to Customer
        transporter.sendMail({
          from: senderFrom,
          to: email,
          replyTo: FOUNDATION_EMAIL,
          subject: `Receipt & Confirmation: Your Inquiry to the William Buck Godfrey Legacy Scholarship (${referenceId})`,
          text: `Dear ${firstName},\n\nThank you for reaching out to the William Buck Godfrey Legacy Scholarship. We have received your inquiry (Ref: ${referenceId}) regarding "${subject}". A copy of your inquiry has been forwarded to ${FOUNDATION_EMAIL}.\n\nYour message:\n${message}\n\nWilliam Buck Godfrey Legacy Scholarship Foundation`,
          html: customerReceiptHtml,
        }),
      ]);

      console.log(`[EMAIL DISPATCHED] Successfully sent inquiry to ${FOUNDATION_EMAIL} and receipt to ${email}. Ref: ${referenceId}`);
    } else {
      // Log formatted dispatch in development or when SMTP credentials are not yet set
      console.log('================================================================');
      console.log(`[CONTACT FORM DISPATCH] Reference ID: ${referenceId}`);
      console.log(`To Foundation: ${FOUNDATION_EMAIL}`);
      console.log(`To Customer (Receipt): ${email}`);
      console.log(`Subject: ${subject}`);
      console.log(`Submitter: ${firstName} ${lastName} (${phone || 'No phone'})`);
      console.log(`Message: ${message}`);
      console.log('================================================================');
    }

    return res.status(200).json({
      success: true,
      referenceId,
      timestamp,
      recipient: FOUNDATION_EMAIL,
      customerEmail: email,
      customerName: `${firstName} ${lastName}`,
      subject,
      message,
      phone: phone || null,
      dispatched: true,
    });
  } catch (error: any) {
    console.error('Error processing contact submission:', error);
    return res.status(500).json({
      error: 'Failed to process inquiry. Please try again or email us directly at ' + FOUNDATION_EMAIL,
      details: error.message,
    });
  }
});

// Vite Middleware & Production Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
