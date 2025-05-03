'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, onRemove, value = [] }) => {
  const handleUpload = (result: any) => {
    const url = result?.info?.secure_url
    if (url) {
      onChange(url)
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <Image
              src={url}
              alt="Uploaded"
              fill
              className="rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(url)}
              className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 rounded text-xs"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <CldUploadWidget uploadPreset="ecom_admin">
        {({ open }) => {
          return (
            <button onClick={() => open()}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
