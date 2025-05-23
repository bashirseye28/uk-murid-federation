// lib/sendRegistrationEmail.ts
import emailjs from '@emailjs/browser';
import { RegistrationInfo } from '@/components/Donate/RegistrationForm';

export async function sendRegistrationEmail(data: RegistrationInfo) {
  const { name, email, phone, dahiraCity, childrenUnder16 } = data;

  // ✅ Send email directly via EmailJS using template placeholders
  const result = await emailjs.send(
    'service_8c83y82',         // your service ID
    'template_dfx60pg',        // your template ID
    {
      name,
      email,
      phone,
      dahiraCity,
      childrenUnder16: String(childrenUnder16), // Send as string
    },
    'eszGt3iIRtDx18jL1'         // your public key
  );

  return result;
}