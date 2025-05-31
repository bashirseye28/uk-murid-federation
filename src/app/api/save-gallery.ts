import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const galleryPath = path.join(process.cwd(), 'public/gallery.json')
  try {
    fs.writeFileSync(galleryPath, JSON.stringify(req.body, null, 2), 'utf-8')
    return res.status(200).json({ message: 'Gallery updated' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save file' })
  }
}