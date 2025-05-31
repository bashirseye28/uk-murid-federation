'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface GalleryItem {
  src: string
  alt: string
  description: string
  video: string
  createdAt?: number
}

export default function GalleryManagerPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<GalleryItem>({
    src: '',
    alt: '',
    description: '',
    video: ''
  })

  const pageSize = 6

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      setGallery(data)
    } catch (error) {
      console.error('Failed to load gallery:', error)
      toast.error('Failed to fetch gallery items')
    }
  }

  const handleDelete = async (itemToDelete: GalleryItem) => {
    const confirm = window.confirm('Are you sure you want to delete this item?')
    if (!confirm) return

    const index = gallery.findIndex(
      g => g.src === itemToDelete.src && g.video === itemToDelete.video && g.alt === itemToDelete.alt
    )

    if (index === -1) {
      toast.error('Item not found.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index }),
      })
      if (!res.ok) throw new Error('Delete failed')

      const updated = await res.json()
      setGallery(updated)
      toast.success('Item deleted')
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete item')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: GalleryItem, index: number) => {
    setEditForm(item)
    setEditIndex(index)
    setIsEditing(true)
  }

  const handleEditSave = async () => {
    if (editIndex === null) return
    setLoading(true)
    try {
      const original = gallery[editIndex]
      const updatedItem: GalleryItem = {
        ...editForm,
        createdAt: original.createdAt || Date.now()
      }

      // 1. Delete original
      await fetch('/api/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: editIndex })
      })

      // 2. Post updated item
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      })
      if (!res.ok) throw new Error('Update failed')

      // 3. Refresh gallery
      await fetchGallery()

      toast.success('Item updated')
      setIsEditing(false)
    } catch (err) {
      console.error(err)
      toast.error('Failed to update item')
    } finally {
      setLoading(false)
    }
  }

  const paginated = gallery.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.ceil(gallery.length / pageSize)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-mourid-green">Manage Gallery Items</h1>
        <Link href="/admin/gallery" className="text-sm text-blue-600 hover:underline">
          ← Back to Gallery Uploader
        </Link>
      </div>

      {gallery.length === 0 ? (
        <p className="text-center text-slate-600">No gallery items yet. Add some via the Gallery Editor.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginated.map((item, idx) => (
              <div
                key={`${item.alt}-${item.src || item.video}-${idx}`}
                className="border rounded bg-white shadow p-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">{item.alt}</h3>
                  <p className="text-sm text-slate-600 mb-2">{item.description}</p>
                  {item.src && (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={400}
                      height={300}
                      className="rounded object-cover w-full h-48"
                    />
                  )}
                  {item.video && (
                    <iframe
                      src={item.video}
                      title={item.alt}
                      className="w-full aspect-video rounded mt-2"
                      allowFullScreen
                    />
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(item, (page - 1) * pageSize + idx)}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item)}
                    variant="destructive"
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-6">
              <Button variant="outline" onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
              </Button>
              <span className="px-4 py-2">Page {page} of {totalPages}</span>
              <Button variant="outline" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* EDIT DIALOG */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-mourid-green">
              Edit Gallery Item
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-alt">Title / Alt Text</Label>
              <Input
                id="edit-alt"
                value={editForm.alt}
                onChange={(e) => setEditForm({ ...editForm, alt: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-src">Image URL</Label>
              <Input
                id="edit-src"
                value={editForm.src}
                onChange={(e) => setEditForm({ ...editForm, src: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-video">Video URL</Label>
              <Input
                id="edit-video"
                value={editForm.video}
                onChange={(e) => setEditForm({ ...editForm, video: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-end">
            <Button onClick={handleEditSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}