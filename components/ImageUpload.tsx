
"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Image as ImageIcon, CloudUpload } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  onImageUpload: (file: File) => void
}

export function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
      onImageUpload(file)
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"]
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
      setPreview(null)
    }
  }

  return (
    <div className="w-full">
      <Card className="border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors bg-white/50 backdrop-blur-sm">
        <CardContent className="p-6">
          {preview ? (
            <div className="relative group">
              <div className="relative h-80 w-full mx-auto rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold">Preview</p>
                <p className="text-sm opacity-90">Click anywhere to change</p>
              </div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={cn(
                "cursor-pointer",
                "rounded-xl",
                "border-2 border-dashed",
                "p-12",
                "text-center",
                "transition-all duration-300",
                "hover:border-primary hover:bg-primary/5",
                "hover:shadow-lg",
                isDragActive && "border-primary bg-primary/10 scale-[1.02]",
                "bg-gradient-to-br from-white to-gray-50"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-6">
                <div className={cn(
                  "rounded-full p-5 transition-all duration-300",
                  isDragActive 
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white animate-bounce" 
                    : "bg-gradient-to-r from-blue-100 to-purple-100"
                )}>
                  {isDragActive ? (
                    <CloudUpload className="h-10 w-10" />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-primary" />
                  )}
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-2xl">
                    {isDragActive ? "Drop your photo here!" : "Upload a Photo"}
                  </h3>
                  <p className="text-muted-foreground">
                    {isDragActive 
                      ? "Release to upload" 
                      : "Drag & drop or click to browse"}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span>PNG, JPG, JPEG</span>
                    <span>•</span>
                    <span>Max 5MB</span>
                  </div>
                </div>
                <Button 
                  variant="default" 
                  className="px-8 py-2 h-auto font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Choose File
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}