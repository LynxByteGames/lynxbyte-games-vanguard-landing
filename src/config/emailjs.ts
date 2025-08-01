// EmailJS Configuration
// To set up EmailJS:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an Email Service (Gmail, Outlook, etc.)
// 3. Create an Email Template
// 4. Replace the placeholder values below with your actual credentials

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_j03paou', // Your EmailJS service ID
  TEMPLATE_ID: 'template_dw7n6c6', // Your EmailJS template ID
  PUBLIC_KEY: 'bpQsiICndqyp74CfS', // Your EmailJS public key
  TO_EMAIL: 'bartosz.ludera@lynxbytegames.eu'
};

// Email template variables that will be available:
// - to_email: The recipient email address
// - from_name: Sender's full name
// - from_email: Sender's email address
// - company: Sender's company name
// - message: The message content
// - accept_marketing: Whether they accepted marketing emails
// - reply_to: Email address to reply to 