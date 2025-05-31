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

  const formatYouTubeEmbed = (url: string): string => {
    try {
      if (url.includes("youtu.be")) {
        const id = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      }

      if (url.includes("youtube.com/watch")) {
        const videoId = new URL(url).searchParams.get("v");
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      return url; // fallback
    } catch {
      return url;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasImage = !!form.src.trim();
    const hasVideo = !!form.video.trim();
    if (!form.alt || !form.description || (!hasImage && !hasVideo)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formattedVideo = hasVideo
      ? formatYouTubeEmbed(form.video.trim())
      : "";

    setLoading(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          video: formattedVideo,
        }),
      });

      if (!res.ok) throw new Error("Upload failed");

      toast.success("Gallery item added!");
      setForm({ src: "", alt: "", description: "", video: "" });
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-mourid-green">
        Upload to Gallery
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="alt">Title / Alt Text *</Label>
          <Input name="alt" value={form.alt} onChange={handleChange} required />
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
          <Label htmlFor="src">
            Image URL (Cloudinary) - leave blank if video
          </Label>
          <Input
            name="src"
            type="url"
            value={form.src}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="video">YouTube Link - leave blank if image</Label>
          <Input
            name="video"
            type="url"
            value={form.video}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="border border-mourid-green text-mourid-green hover:bg-mourid-green hover:text-white transition-colors"
        >
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
