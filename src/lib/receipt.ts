import jsPDF from 'jspdf';

export interface ReceiptData {
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  cause: string;
  amount: string;
  date: string;
}

/**
 * Generate a PDF receipt and return it as a Buffer.
 */
export async function generateReceiptPDF(data: ReceiptData): Promise<Buffer> {
  const { donorName, donorEmail, donorPhone, cause, amount, date } = data;
  const doc = new jsPDF();

  // Load logo image as base64
  const logoUrl = 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746670607/logo_fdhstb.png';
  const logoRes = await fetch(logoUrl);
  const logoBuffer = await logoRes.arrayBuffer();
  const logoBase64 = Buffer.from(logoBuffer).toString('base64');
  doc.addImage(
    `data:image/png;base64,${logoBase64}`,
    'PNG',
    85,
    10,
    40,
    40
  );

  let y = 60;
  // Title
  doc.setFontSize(20).setFont('helvetica', 'bold');
  doc.text('Donation Receipt', 105, y, { align: 'center' });

  // Organization details
  y += 15;
  doc.setFontSize(18).setFont('helvetica', 'bold');
  doc.text('UK Murid Federation', 20, y);
  y += 9;
  doc.setFontSize(12).setFont('helvetica', 'normal');
  doc.text('Company Number: 13535445', 20, y);
  y += 7;
  doc.text('Email: mouride.uk@gmail.com', 20, y);
  y += 7;
  doc.text('Website: https://ukmouride.co.uk', 20, y);

  // Divider
  y += 10;
  doc.setLineWidth(0.5);
  doc.line(20, y, 190, y);

  // Donor Information
  y += 15;
  doc.setFont('helvetica', 'bold').text('Donor Information:', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text(`Donor Name: ${donorName}`, 20, y);
  y += 7;
  doc.text(`Email: ${donorEmail}`, 20, y);
  y += 7;
  doc.text(`Phone: ${donorPhone}`, 20, y);

  // Donation Details
  y += 10;
  doc.setFont('helvetica', 'bold').text('Donation Details:', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text(`Donation Cause: ${cause}`, 20, y);
  y += 7;
  doc.text(`Amount: £${amount}`, 20, y);
  y += 7;
  doc.text(`Date: ${date}`, 20, y);

  // Divider
  y += 15;
  doc.setLineWidth(0.3);
  doc.line(20, y, 190, y);

  // Thank you message
  y += 12;
  doc.setFontSize(11).setFont('times', 'italic');
  doc.text(
    'May Allah reward you abundantly for your generosity.',
    105,
    y,
    { align: 'center' }
  );

  // Footer note
  y += 15;
  doc.setFontSize(9).setFont('helvetica', 'normal');
  doc.text(
    'This document serves as an official receipt for your donation. Thank you for supporting UK Murid Federation.',
    105,
    y,
    { align: 'center' }
  );

  // Output PDF as Buffer
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
