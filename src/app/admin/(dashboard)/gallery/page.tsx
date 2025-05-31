"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface GalleryItem {
  src: string;
  alt: string;
  description: string;
  video: string;
}

export default function GalleryUploadPage() {
  const [form, setForm] = useState<GalleryItem>({
    src: "",
    alt: "",
    description: "",
    video: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.alt || !form.description || (!form.src && !form.video)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Upload failed");

      setForm({ src: "", alt: "", description: "", video: "" });
      toast.success("Gallery item added!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-mourid-green">Upload to Gallery</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="alt">Title / Alt Text *</Label>
          <Input
            name="alt"
            value={form.alt}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="src">Image URL (Cloudinary) - leave blank if video</Label>
          <Input name="src" value={form.src} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="video">Video Embed URL (YouTube) - leave blank if image</Label>
          <Input name="video" value={form.video} onChange={handleChange} />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}