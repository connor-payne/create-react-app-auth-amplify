import React from 'react';
import { useQRCode } from 'react-qrcodes';

function QRCode() {
  const [inputRef] = useQRCode({
    text: 'https://github.com/bunlong/react-qrcodes',
    options: {
      level: 'M',
      margin: 7,
      scale: 1,
      width: 200,
      color: {
        dark: '#010599FF',
        light: '#FFBF60FF',
      },
    },
  });
  
  return <canvas ref={inputRef} />;
};

export default QRCode;