import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public/gallery.json');

interface GalleryItem {
  src?: string;
  video?: string;
  alt: string;
  description: string;
  createdAt?: number;
}

export async function GET() {
  try {
    const file = await fs.readFile(filePath, 'utf8');
    const data: GalleryItem[] = JSON.parse(file || '[]');

    // ✅ Sort by createdAt descending (newest first)
    data.sort((a: GalleryItem, b: GalleryItem) => (b.createdAt || 0) - (a.createdAt || 0));

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('❌ GET error:', error);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newItem = await req.json();

    if (
      !newItem ||
      (!newItem.src && !newItem.video) ||
      !newItem.alt ||
      !newItem.description
    ) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), { status: 400 });
    }

    const itemWithTimestamp: GalleryItem = {
      ...newItem,
      createdAt: Date.now(),
    };

    const file = await fs.readFile(filePath, 'utf8');
    const gallery: GalleryItem[] = JSON.parse(file || '[]');

    gallery.unshift(itemWithTimestamp);

    await fs.writeFile(filePath, JSON.stringify(gallery, null, 2));

    return new Response(JSON.stringify(gallery), { status: 200 });
  } catch (error) {
    console.error('❌ POST error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save item' }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { index } = await req.json();

    if (typeof index !== 'number') {
      return new Response(JSON.stringify({ error: 'Invalid index' }), { status: 400 });
    }

    const file = await fs.readFile(filePath, 'utf8');
    const gallery: GalleryItem[] = JSON.parse(file || '[]');

    if (index < 0 || index >= gallery.length) {
      return new Response(JSON.stringify({ error: 'Index out of bounds' }), { status: 404 });
    }

    gallery.splice(index, 1);

    await fs.writeFile(filePath, JSON.stringify(gallery, null, 2));

    return new Response(JSON.stringify(gallery), { status: 200 });
  } catch (error) {
    console.error('❌ DELETE error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete item' }), { status: 500 });
  }
}