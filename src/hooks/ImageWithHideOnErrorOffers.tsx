import React, { useState, useEffect } from "react";
import Image from "next/image";
import Product3 from "../../public/images/product3.png";
const ImageWithHideOnErrorOffers = ({
  src,
  fallbackSrc,
  width,
  height,
  ...rest
}) => {
  const [imgSrc, set_imgSrc] = useState(src);

  useEffect(() => {
    if (src) {
      set_imgSrc(src);
    }
  }, [src]);

  function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
  return (
    <Image
      {...rest}
      quality={65}
      width={width ? width : 500}
      height={height ? height : 500}
      style={{ borderRadius: 10 }}
      objectFit="cover"
      src={isValidHttpUrl(imgSrc) ? imgSrc : Product3}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          set_imgSrc(fallbackSrc);
        }
      }}
      onError={() => {
        set_imgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithHideOnErrorOffers;
