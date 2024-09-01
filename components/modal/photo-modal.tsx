'use client'

import { uploadPlaylistImage } from '@/actions/upload-playlist-image'
import { Box, Button, LoadingOverlay } from '@mantine/core'
import {
   IconBan,
   IconCircleCheck,
   IconUpload,
   IconX,
} from '@tabler/icons-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

export default function PhotoModal({
   onClose,
   playlist_id,
}: {
   onClose: () => void
   playlist_id: string
}) {
   const [visible, toggle] = useState(false)
   const [preview, setPreview] = useState<string | null>(null)
   const [fileName, setFileName] = useState<string>('')
   const [base64, setBase64] = useState<string | null>(null)

   const onDrop = useCallback(
      (acceptedFiles: File[], fileRejections: any[]) => {
         if (fileRejections.length > 0) {
            const error = fileRejections[0].errors[0]
            if (error.code === 'file-too-large') {
               toast.error('Image is larger than 150KB')
            }
            return
         }

         const reader = new FileReader()
         setFileName(acceptedFiles[0].name)
         reader.readAsDataURL(acceptedFiles[0])
         reader.onload = (event) => {
            if (event?.target?.result) {
               const result =
                  typeof event.target.result === 'string'
                     ? event.target.result
                     : ''
               const base64 = result.split(',')[1]
               setBase64(base64)
            }
            setPreview(event.target?.result as string)
         }
      },
      []
   )

   function sizeValidator(file: File) {
      if (file.size > 150 * 1024) {
         return {
            code: 'file-too-large',
            message: `Image is larger than 150KB`,
         }
      }
      return null
   }

   const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
      isDragAccept,
   } = useDropzone({
      onDrop,
      multiple: false,
      accept: {
         'image/png': ['.png'],
         'image/jpeg': ['.jpeg', '.jpg'],
      },
      validator: sizeValidator,
      maxSize: 150 * 1024,
   })

   const handleUpload = async () => {
      toggle((pre) => !pre)
      try {
         if (base64) {
            await uploadPlaylistImage(playlist_id, base64)
         } else {
            toast.error('No image selected')
         }
         toast.success('Cover upload successfully')
         onClose()
      } catch (error: any) {
         toast.error(error?.message || 'Server did not respond')
      } finally {
         toggle((pre) => !pre)
      }
   }

   return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40">
         <Box
            className="w-full max-w-lg rounded-md bg-white p-4 shadow"
            pos="relative"
         >
            <LoadingOverlay
               visible={visible}
               zIndex={1000}
               overlayProps={{ radius: 'sm', blur: 2 }}
            />
            <div>
               <div className="flex justify-end">
                  <button onClick={onClose}>
                     <IconX />
                  </button>
               </div>
               <div className="p-2">
                  <div
                     {...getRootProps()}
                     className={`flex flex-col items-center gap-3 rounded-lg border-2 border-dashed p-4 ${
                        isDragReject && isDragActive
                           ? 'border-red-500'
                           : isDragAccept && isDragActive
                             ? 'border-green-500'
                             : 'border-black/30'
                     }`}
                  >
                     {preview ? (
                        <Image
                           height={150}
                           width={150}
                           src={preview}
                           alt="Preview"
                        />
                     ) : (
                        <>
                           {isDragReject && isDragActive ? (
                              <IconBan size={56} className="text-red-500" />
                           ) : isDragAccept && isDragActive ? (
                              <IconCircleCheck
                                 size={56}
                                 className="text-green-500"
                              />
                           ) : (
                              <IconUpload size={56} />
                           )}
                           <h2>
                              {isDragAccept && isDragActive
                                 ? 'Just drop here'
                                 : isDragReject && isDragActive
                                   ? 'Only png, jpg, jpeg are allowed'
                                   : 'Upload Photo'}
                           </h2>
                           <p>
                              {isDragAccept && isDragActive
                                 ? 'Everything looks good'
                                 : fileName
                                   ? fileName
                                   : 'Maximum image size is 150 KB.'}
                           </p>
                        </>
                     )}
                     <input {...getInputProps()} />
                  </div>
                  <div className="mt-4">
                     <Button onClick={handleUpload} fullWidth color="dark">
                        Upload
                     </Button>
                  </div>
               </div>
            </div>
         </Box>
      </div>
   )
}
