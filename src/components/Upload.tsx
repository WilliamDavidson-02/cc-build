import React, { FC } from 'react';
import Button from './Buttons';
import Typography from './Typography';
import { upload } from '/icons/index';

type UploadProps = {
children?: React.ReactNode;
title: string;
};

const Upload: FC<UploadProps> = ({children, title}) => {

  const handleDrop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileselect');
    fileInput?.click();
  };

  return(
    <div className=''>
      <label className=''>
        <Typography variant='h3' >
          {title}
        </Typography>
      </label>
        <input 
          type='file' 
          id="fileselect" 
          multiple accept="image/x-png,image/gif,image/jpeg,image/jpe,image/jpg,.svg,.svgz"
          className='w-full h-full' 
        />
        <Button className="bg-[#F9F9F9] border-[#E2E2E2] text-[#151515] w-full h-full" onClick={handleDrop} >
          <img src={upload} alt="upload" className="w-6 h-6" />
          {children}
        </Button>
          
        
    </div>
  );
};

export default Upload;