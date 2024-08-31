'use client'

import { uploadPlaylistImage } from '@/actions/upload-playlist-image'
import { Box, Button, LoadingOverlay } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
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

function fileToBase64(file: File): Promise<string> {
   return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = () => {
         if (reader.result) {
            // Check if reader.result is a string
            const resultString =
               typeof reader.result === 'string' ? reader.result : ''
            // Remove the Data URL prefix before returning Base64 data
            const base64Data = resultString.split(',')[1]
            resolve(base64Data)
         } else {
            reject(new Error('Failed to read file'))
         }
      }

      reader.onerror = () => {
         reject(new Error('Failed to read file'))
      }

      reader.readAsDataURL(file)
   })
}

export default function PhotoModal({
   onClose,
   playlist_id,
}: {
   onClose: () => void
   playlist_id: string
}) {
   const [visible, { toggle }] = useDisclosure(false)
   const [preview, setPreview] = useState<any>()
   const [fileName, setfileName] = useState<string>('')
   const [isLarge, setIsLarge] = useState(false)
   const [base64, setBase64] = useState<any>()

   const onDrop = useCallback((acceptedFiles: File[]) => {
      const reader = new FileReader()
      setfileName(acceptedFiles[0].name)
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
         setPreview(event.target?.result)
      }
   }, [])

   function sizeValidator(file: File) {
      if (file.size > 256 * 1024) {
         setIsLarge(true)
         return {
            code: 'image-too-large',
            message: `Image is larger than 256KB`,
         }
      }
      setIsLarge(false)
      return null
   }

   const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
      isDragAccept,
      isFocused,
   } = useDropzone({
      onDrop,
      multiple: false,
      accept: {
         'image/png': ['.png'],
         'image/jpeg': ['.jpeg', '.jpg'],
      },
      validator: sizeValidator,
      maxSize: 256 * 2024,
   })

   const handleUpload = async () => {
      toggle()
      try {
         await uploadPlaylistImage(playlist_id, base64)
      } catch (error: any) {
         toast.error(error?.message || 'Something went wrong')
      } finally {
         toggle()
      }
   }

   return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40">
         <Box
            className="w-full max-w-lg rounded-md bg-white p-2 shadow"
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
                     className={`flex flex-col items-center gap-3 rounded-lg border-2 border-dashed p-4 ${isDragAccept && isDragActive ? 'border-green-500' : isDragReject && isDragActive ? 'border-red-500' : 'border-black/30'}`}
                  >
                     {preview ? (
                        <Image height={150} width={150} src={preview} alt="" />
                     ) : (
                        <>
                           {isDragAccept && !isLarge && isDragActive ? (
                              <IconCircleCheck className="size-14 text-green-500" />
                           ) : isDragReject && isDragActive ? (
                              <IconBan className="size-14 text-red-500" />
                           ) : (
                              <IconUpload className="size-14" />
                           )}
                           <h2>
                              {isDragAccept && isDragActive
                                 ? 'Just drop here'
                                 : isDragReject && isDragActive
                                   ? 'Only png,jpg,jpeg are allowed'
                                   : 'Upload Photo'}
                           </h2>
                           <p>
                              {isDragAccept && isDragActive
                                 ? 'Everything looks good'
                                 : fileName
                                   ? fileName
                                   : 'Maximum image size is 256 KB.'}
                           </p>
                        </>
                     )}
                     <input {...getInputProps()} />
                  </div>
                  <div className="mt-2">
                     <Button onClick={handleUpload} fullWidth color="#000000">
                        Upload
                     </Button>
                  </div>
               </div>
            </div>
         </Box>
      </div>
   )
}
