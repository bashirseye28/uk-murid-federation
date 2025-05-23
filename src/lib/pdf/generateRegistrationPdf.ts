// lib/pdf/generateRegistrationPDF.ts
import jsPDF from 'jspdf';

interface RegistrationPDFData {
  name: string;
  email: string;
  phone: string;
  dahiraCity: string;
  childrenUnder16: number;
  date: string;
}

export async function generateRegistrationPDF(data: RegistrationPDFData): Promise<string> {
  const doc = new jsPDF();
  const logoUrl = 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746670607/logo_fdhstb.png';

  // Load logo as Base64
  const logoBase64 = await fetch(logoUrl)
    .then(res => res.blob())
    .then(blob => new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    }));

  // Header
  doc.addImage(logoBase64, 'PNG', 85, 10, 40, 40);
  let y = 60;
  doc.setFontSize(20).setFont('helvetica', 'bold');
  doc.text('Registration Receipt', 105, y, { align: 'center' });

  y += 15;
  doc.setFontSize(16).text('UK Murid Federation', 20, y);
  y += 8;
  doc.setFontSize(11);
  doc.text('Email: mouride.uk@gmail.com', 20, y);
  y += 6;
  doc.text('Website: https://ukmouride.co.uk', 20, y);

  y += 8;
  doc.setLineWidth(0.5);
  doc.line(20, y, 190, y);

  y += 12;
  doc.setFontSize(13).setFont('helvetica', 'bold');
  doc.text('Registration Details:', 20, y);

  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(`Name: ${data.name}`, 20, y);
  y += 7;
  doc.text(`Email: ${data.email}`, 20, y);
  y += 7;
  doc.text(`Phone: ${data.phone}`, 20, y);
  y += 7;
  doc.text(`Dahira/City: ${data.dahiraCity}`, 20, y);
  y += 7;
  doc.text(`Children Under 16: ${data.childrenUnder16}`, 20, y);
  y += 7;
  doc.text(`Date: ${data.date}`, 20, y);

  y += 15;
  doc.setLineWidth(0.3);
  doc.line(20, y, 190, y);

  y += 12;
  doc.setFontSize(11).setFont('times', 'italic');
  doc.text('Thank you for registering. May Allah bless your efforts.', 105, y, { align: 'center' });

  // Export as base64
  const pdfOutput = doc.output('datauristring');
  return pdfOutput;
}