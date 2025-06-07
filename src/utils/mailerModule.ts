import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'

/*

Whats in this mailerModule? 

1. transporterPayload -> for mail config settings (like: host,port,user,pass etc) 
2. transporter -> for mail config settings (like: host,port,user,pass etc) Using nodeMailer (Note: this is for sending mail functions)
3. emailAdapter -> this is for mailing users.
4. sendAdminCreatedEmail -> for sending email notification after creating new admin account

*/

// transporter -> for mail config settings (like: host,port,user,pass etc)

// const transporterPayload = nodemailerAdapter({
//   defaultFromName: process.env.EMAIL_NAME!,
//   defaultFromAddress: process.env.EMAIL_ADDRESS!,
//   transportOptions: {
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//     secure: true, // true for 465, false for other ports
//   },
// })

// transporter -> for mail config settings (like: host,port,user,pass etc)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
  secure: true,
})

// Email Adapter
export const emailAdapter = nodemailerAdapter({
  defaultFromName: process.env.EMAIL_NAME!, // Optional, your app name
  defaultFromAddress: process.env.SMTP_USER!, // Your email address
  transportOptions: {
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    secure: true, // true for 465, false for other ports
  },
})

const loginUrl = `${process.env.SERVER_URL}/admin/login`

// sendAdminCreatedEmail -> for sending email notification after creating new admin account
export const sendCreatedUserAccountEmail = async (to: string, name: string, role: string) => {
  await transporter.sendMail({
    from: `"${process.env.EMAIL_NAME}" <${process.env.SMTP_USER}>`,
    to,
    subject: `Welcome, ${name}`,
    html: `
      <p>Hello ${name},</p>
      <p>Your <strong>${role}</strong> account has been created successfully.</p>
      <p>please login using  <a href="${loginUrl}">${loginUrl}</a> </p>
    `,
  })
}

export const sendCreatedCustomerAccountEmail = async (to: string, name: string) => {
  await transporter.sendMail({
    from: `"${process.env.EMAIL_NAME}" <${process.env.SMTP_USER}>`,
    to,
    subject: `Welcome, ${name}`,
    html: `
      <p>Hello ${name},</p>
      <p>Welcome to ${process.env.EMAIL_NAME}</p>
      <p>please login using  <a href="${loginUrl}">${loginUrl}</a> </p>
    `,
  })
}
