// lib/email/sendRegistrationEmail.ts
import emailjs from '@emailjs/browser';
import { generateRegistrationPDF } from '@/lib/pdf/generateRegistrationPdf';

interface RegistrationInfo {
  name: string;
  email: string;
  phone: string;
  dahiraCity: string;
  childrenUnder16: number;
  amount: string;
  reference: string;
  date: string;
}

export async function sendRegistrationEmail(info: RegistrationInfo) {
  try {
    // 1. Generate the PDF as a Blob
    const pdfArrayBuffer = await generateRegistrationPDF(info);
    const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });

    // 2. Convert PDF to Base64 for EmailJS
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result?.toString().split(',')[1] || '');
      reader.onerror = reject;
      reader.readAsDataURL(pdfBlob);
    });

    // 3. Send via EmailJS
    const result = await emailjs.send(
      'service_8c83y82', // your EmailJS service ID
      'template_dfx60pg', // your EmailJS template ID
      {
        name: info.name,
        email: info.email,
        phone: info.phone,
        dahiraCity: info.dahiraCity,
        childrenUnder16: info.childrenUnder16,
        registration_pdf_base64: base64, // Add this to your EmailJS template as a variable
      },
      {
        publicKey: 'eszGt3iIRtDx18jL1',
      }
    );

    return result;
  } catch (err) {
    console.error('EmailJS error:', err);
    throw new Error('Failed to send registration email.');
  }
}