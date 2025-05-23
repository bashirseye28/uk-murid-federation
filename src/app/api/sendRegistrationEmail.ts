// utils/sendRegistrationEmail.ts
import emailjs from '@emailjs/browser';

export async function sendRegistrationEmail(
  formData: {
    name: string;
    email: string;
    phone: string;
    dahiraCity: string;
    childrenUnder16: number;
  },
  pdfBase64: string // base64 string of the PDF
) {
  const serviceId = 'service_8c83y82'; // your EmailJS service ID
  const templateId = 'template_dfx60pg'; // your EmailJS template ID
  const userId = 'YOUR_PUBLIC_KEY'; // your EmailJS public key (user ID)

  const templateParams = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    dahiraCity: formData.dahiraCity,
    childrenUnder16: formData.childrenUnder16,
    'my_file': pdfBase64,
  };

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      userId
    );
    return response;
  } catch (error) {
    console.error('EmailJS send error:', error);
    throw error;
  }
}