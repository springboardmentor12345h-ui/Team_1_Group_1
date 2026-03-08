import nodemailer from "nodemailer";

/*
========================================
📧 EMAIL SERVICE
Reusable mailer — call sendEmail() from
any controller to send an email.
========================================
*/

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/*
  sendEmail({ to, subject, html })
  - to      : recipient email string
  - subject : email subject
  - html    : HTML body string
*/
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"CampusEventHub" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Email failed to ${to}:`, error.message);
    // We don't throw — email failure should never break the main flow
  }
};

/*
========================================
📧 EMAIL TEMPLATES
========================================
*/
export const emailTemplates = {
  adminApproved: (name) => ({
    subject: "🎉 Your Admin Account Has Been Approved",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #2563eb;">CampusEventHub</h2>
        <h3>Hello ${name},</h3>
        <p>Great news! Your college admin account has been <strong style="color: #16a34a;">approved</strong> by the Super Admin.</p>
        <p>You can now log in and start creating and managing events for your college.</p>
        <a href="${process.env.FRONTEND_URL}/login" style="display:inline-block;margin-top:16px;padding:10px 20px;background:#2563eb;color:white;border-radius:6px;text-decoration:none;">
          Login Now
        </a>
        <p style="margin-top:24px;color:#6b7280;font-size:13px;">If you did not register, please ignore this email.</p>
      </div>
    `,
  }),

  adminRejected: (name) => ({
    subject: "❌ Your Admin Account Request Was Rejected",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #2563eb;">CampusEventHub</h2>
        <h3>Hello ${name},</h3>
        <p>Unfortunately, your college admin account request has been <strong style="color: #dc2626;">rejected</strong> by the Super Admin.</p>
        <p>If you believe this is a mistake, please contact the platform administrator.</p>
        <p style="margin-top:24px;color:#6b7280;font-size:13px;">Thank you for your interest in CampusEventHub.</p>
      </div>
    `,
  }),

  eventCreated: (name, eventTitle, eventId) => ({
    subject: `📅 New Event: ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #2563eb;">CampusEventHub</h2>
        <h3>Hello ${name},</h3>
        <p>A new event has been created on CampusEventHub:</p>
        <div style="background:#f0f9ff;border-left:4px solid #2563eb;padding:12px 16px;border-radius:4px;margin:16px 0;">
          <strong>${eventTitle}</strong>
        </div>
        <a href="${process.env.FRONTEND_URL}/events/${eventId}" style="display:inline-block;margin-top:16px;padding:10px 20px;background:#2563eb;color:white;border-radius:6px;text-decoration:none;">
          View Event
        </a>
        <p style="margin-top:24px;color:#6b7280;font-size:13px;">You are receiving this because you are a registered user of CampusEventHub.</p>
      </div>
    `,
  }),

  eventUpdated: (name, eventTitle, eventId) => ({
    subject: `✏️ Event Updated: ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #2563eb;">CampusEventHub</h2>
        <h3>Hello ${name},</h3>
        <p>An event you may be interested in has been updated:</p>
        <div style="background:#fefce8;border-left:4px solid #ca8a04;padding:12px 16px;border-radius:4px;margin:16px 0;">
          <strong>${eventTitle}</strong>
        </div>
        <a href="${process.env.FRONTEND_URL}/events/${eventId}" style="display:inline-block;margin-top:16px;padding:10px 20px;background:#2563eb;color:white;border-radius:6px;text-decoration:none;">
          View Event
        </a>
      </div>
    `,
  }),

  eventDeleted: (name, eventTitle) => ({
    subject: `🗑️ Event Cancelled: ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #2563eb;">CampusEventHub</h2>
        <h3>Hello ${name},</h3>
        <p>Unfortunately, the following event has been <strong style="color:#dc2626;">cancelled</strong>:</p>
        <div style="background:#fef2f2;border-left:4px solid #dc2626;padding:12px 16px;border-radius:4px;margin:16px 0;">
          <strong>${eventTitle}</strong>
        </div>
        <p>We apologize for any inconvenience.</p>
      </div>
    `,
  }),

  // 📌 PLACEHOLDER — wire in when teammate completes registration feature
  eventRegistered: (name, eventTitle, eventId) => ({
    subject: `✅ Registration Confirmed: ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #2563eb;">CampusEventHub</h2>
        <h3>Hello ${name},</h3>
        <p>Your registration for the following event is confirmed:</p>
        <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:12px 16px;border-radius:4px;margin:16px 0;">
          <strong>${eventTitle}</strong>
        </div>
        <a href="${process.env.FRONTEND_URL}/events/${eventId}" style="display:inline-block;margin-top:16px;padding:10px 20px;background:#2563eb;color:white;border-radius:6px;text-decoration:none;">
          View Event
        </a>
      </div>
    `,
  }),
};
