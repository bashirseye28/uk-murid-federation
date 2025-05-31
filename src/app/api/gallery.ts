import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const filePath = path.join(process.cwd(), 'src/data/gallery.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Read gallery
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      const gallery = JSON.parse(fileData);
      res.status(200).json(gallery);
    } catch (err) {
      res.status(500).json({ error: 'Failed to load gallery' });
    }
  }

  else if (req.method === 'POST') {
    // Add new gallery image
    const { src, alt, description, video } = req.body;

    if (!src || !alt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      const gallery = JSON.parse(fileData);

      const newImage = {
        id: Date.now().toString(),
        src,
        alt,
        description: description || '',
        video: video || ''
      };

      const updatedGallery = [newImage, ...gallery];
      fs.writeFileSync(filePath, JSON.stringify(updatedGallery, null, 2));

      res.status(201).json({ message: 'Image added successfully', image: newImage });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save gallery image' });
    }
  }

  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}