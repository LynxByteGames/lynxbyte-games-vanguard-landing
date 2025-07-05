# EmailJS Setup Guide

This guide will help you set up EmailJS to send contact form submissions to bartosz.ludera@lynxbytegames.eu.

## Step 1: Sign up for EmailJS

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account
3. Verify your email address

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

```html
Subject: New Contact Form Submission from {{from_name}}

Hello Bartosz,

You have received a new contact form submission:

**Name:** {{from_name}}
**Email:** {{from_email}}
**Company:** {{company}}
**Message:** {{message}}
**Marketing Consent:** {{accept_marketing}}

You can reply directly to this email to respond to {{from_name}}.

Best regards,
Your Website Contact Form
```

4. Save the template and note down your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

## Step 5: Update Configuration

1. Open `src/config/emailjs.ts`
2. Replace the placeholder values with your actual credentials:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here',
  TEMPLATE_ID: 'your_template_id_here', 
  PUBLIC_KEY: 'your_public_key_here',
  TO_EMAIL: 'bartosz.ludera@lynxbytegames.eu'
};
```

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Fill out the contact form
3. Submit the form
4. Check if you receive the email at bartosz.ludera@lynxbytegames.eu

## Troubleshooting

- Make sure all credentials are correct
- Check the browser console for any error messages
- Verify that your email service is properly connected
- Ensure your template variables match the ones used in the code

## Security Notes

- The public key is safe to use in client-side code
- EmailJS handles the email sending securely
- No backend server is required
- The free plan allows 200 emails per month 