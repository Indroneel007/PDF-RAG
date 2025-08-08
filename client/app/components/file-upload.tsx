'use client'

import * as React from 'react'
import { Upload } from 'lucide-react'
const FileUploadComponent: React.FC = () => {
  const handleUploadButtonClick = () => {
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.setAttribute('accept', 'application/pdf');

    el.addEventListener('change', (e) => {
      if(el.files && el.files.length > 0) {
        const file = el.files[0]
        if(file){
          const formData = new FormData();
          formData.append('pdf', file);
          fetch('/api/upload/pdf', {
            method: 'POST',
            body: formData
          })
          console.log("file uploaded sucessfully")
        }
      }
    });

    el.click();
  }

  return(
    <>
      <div className='bg-red-500 rounded-lg text-white shadow-2xl p-4 flex justify-center items-center border-white border-1 flex-row hover:bg-red-700'>
        <div onClick={handleUploadButtonClick} className='flex flex-row p-2 justify-center items-center'>
          <h2 className='pr-4'>Upload a file</h2>
          <Upload />
        </div>
      </div>
    </>
  )
}

export default FileUploadComponent