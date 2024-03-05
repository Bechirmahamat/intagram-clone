import React, { useCallback, useState } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import { Button } from '../ui/button'
const FIleUploader = ({ onChange }: any) => {
    const [fileUrl, setFileUrl] = useState('')
    const [file, setFile] = useState<File[]>([])
    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFile(acceptedFiles)
            onChange(acceptedFiles)
            setFileUrl(URL.createObjectURL(acceptedFiles[0]))
        },
        [file]
    )
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['svg', 'png', 'jpg', 'jpeg'],
        },
    })
    return (
        <div {...getRootProps()} className=''>
            <input {...getInputProps()} className='' />
            {fileUrl ? (
                <div className='w-full p-4 bg-dark-3 rounded-lg border-dark-4 border h-72 flex flex-col gap-1 items-center '>
                    <img
                        src={fileUrl}
                        alt=''
                        className='h-52 w-full object-cover rounded-lg'
                    />

                    <Button className='bg-indigo-950 mt-2 hover:bg-dark-2'>
                        click to choose another image
                    </Button>
                </div>
            ) : (
                <div className='w-full p-4 bg-dark-3 rounded-lg border-dark-4 border h-48 flex flex-col gap-1 items-center'>
                    <img
                        src='/assets/icons/file-upload.svg'
                        alt=''
                        className='h-16'
                    />
                    <h3 className='text-lg'>Drag phot here</h3>
                    <p className='text-xs text-light-3'>SVG, PNG, JPG</p>
                    <Button className='bg-dark-1 hover:bg-dark-2'>
                        Select From Computer
                    </Button>
                </div>
            )}
        </div>
    )
}
export default FIleUploader
