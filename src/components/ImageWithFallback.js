import React, { useState } from 'react';
import DefaultImage from '../assets/default.webp';
function ImageWithFallback({src}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleImageError = () => {
    if (!error) {
      setImgSrc(DefaultImage);
      setError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      onError={handleImageError}
      alt={"Media File"}
    />
  );
}

export default ImageWithFallback;
