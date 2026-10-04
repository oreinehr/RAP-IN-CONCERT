"use client"

import { useRef, useState } from "react"
import { ImagePlus, Loader2, X } from "lucide-react"
import { toast } from "sonner"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { PRODUCT_IMAGES_BUCKET } from "@/lib/supabase/env"
import { cn } from "@/lib/utils"

const MAX_BYTES = 5 * 1024 * 1024

/** Envia direto do navegador para o Storage (RLS só permite admins). */
async function uploadImage(file: File) {
  if (file.size > MAX_BYTES) throw new Error(`${file.name} passa de 5 MB`)

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const path = `${crypto.randomUUID()}.${ext}`
  const storage = createSupabaseBrowserClient().storage.from(PRODUCT_IMAGES_BUCKET)

  const { error } = await storage.upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
  })
  if (error) throw new Error(error.message)

  return storage.getPublicUrl(path).data.publicUrl
}

type ImageUploadProps = {
  value: string[]
  onChange: (urls: string[]) => void
  multiple?: boolean
  label: string
}

export default function ImageUpload({ value, onChange, multiple, label }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return
    setUploading(true)
    try {
      const selected = multiple ? Array.from(files) : [files[0]]
      const urls = await Promise.all(selected.map(uploadImage))
      onChange(multiple ? [...value, ...urls] : urls)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha no upload")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  const showPicker = multiple || value.length === 0

  return (
    <div className="flex flex-wrap gap-3">
      {value.map((url, index) => (
        <div key={url} className="group relative size-28 overflow-hidden rounded-lg border border-border bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="size-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, i) => i !== index))}
            className="absolute right-1 top-1 rounded-full bg-black/80 p-1 text-white opacity-100 transition-opacity hover:bg-red-600 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            aria-label="Remover imagem"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ))}

      {(showPicker || uploading) && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            "flex size-28 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border text-xs text-muted-foreground transition-colors hover:border-white/40 hover:text-white",
            uploading && "cursor-wait",
          )}
        >
          {uploading ? <Loader2 className="size-5 animate-spin" /> : <ImagePlus className="size-5" />}
          {uploading ? "Enviando…" : label}
        </button>
      )}

      {!multiple && value.length > 0 && !uploading && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="self-end text-xs text-gray-300 underline-offset-4 hover:text-white hover:underline"
        >
          Trocar imagem
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml"
        multiple={multiple}
        hidden
        onChange={(event) => handleFiles(event.target.files)}
      />
    </div>
  )
}
