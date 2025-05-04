'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useCallback } from 'react'

interface ImageUploadProps {
  value: string[]
  onChange: (url: string) => void
  onRemove: (url: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, onRemove }) => {
  const handleUpload = useCallback((result: any) => {
    const secureUrl = result?.info?.secure_url
    if (secureUrl) {
      onChange(secureUrl)
    } else {
      console.error('Upload failed or no secure_url:', result)
    }
  }, [onChange])

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[300px] h-[200px] rounded overflow-hidden border">
            <Button
              type="button"
              onClick={() => onRemove(url)}
              size="sm"
              className="absolute top-2 right-2 z-10 bg-red-600 text-white"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Image
              src={url}
              alt="Uploaded Image"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <CldUploadWidget
        uploadPreset="ecom_admin"
        onSuccess={handleUpload}
        options={{
          sources: ['local', 'url', 'camera'],
          multiple: false,
          maxFiles: 1,
        }}
      >
        {({ open }) => (
          <Button
            type="button"
            onClick={() => open?.()}
            className="bg-blue-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
