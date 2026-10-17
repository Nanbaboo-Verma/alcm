import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(toEmail: string, resetUrl: string) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.EMAIL_FROM || "no-reply@alcm.edu";

  // If SMTP is not configured or in development, log the reset URL to console
  if (!host || !user || !pass || user.includes("your-smtp-user")) {
    console.log("-----------------------------------------");
    console.log(`[DEV EMAIL] Password reset email for: ${toEmail}`);
    console.log(`Reset link: ${resetUrl}`);
    console.log("-----------------------------------------");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from,
    to: toEmail,
    subject: "Reset your ALCM account password",
    text: `You requested a password reset. Please click this link to set a new password: ${resetUrl}\n\nThis link is valid for 15 minutes.`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
        <h2 style="color: #1e3a8a;">ALCM Portal Password Reset</h2>
        <p>You requested a password reset for your account.</p>
        <p style="margin: 24px 0;">
          <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Reset Password
          </a>
        </p>
        <p style="font-size: 13px; color: #64748b;">This link is valid for 15 minutes. If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
}
