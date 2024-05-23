import React, { useState, useEffect, useRef } from 'react';
import { Image as KonvaImage } from 'react-konva';

const URLImage = ({ image, setImages, imageclick,mouseEnter,mouseLeave }) => {
  const [img, setImg] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const loadImage = () => {
      const img = new window.Image();
      img.src = image.url;
      img.onload = () => {
        setImg(img);
      };
    };
    loadImage();
  }, [image.url]);

  useEffect(() => {
    if (img && imageRef.current) {
      imageRef.current.image(img);
      imageRef.current.getLayer().batchDraw();
    }
  }, [img]);

  return (
    <KonvaImage
    
    onMouseEnter={mouseEnter}
    onMouseLeave={mouseLeave}
      ref={image.ref}
      draggable
      x={image.x}
      y={image.y}
      image={img}
      scale={{ x: image.scale, y: image.scale }}
      onClick={() =>imageclick(image.id)}
      onDragEnd={(e) => {
        const { x, y } = e.target.position();
        setImages((prevImages) =>
          prevImages.map((img) =>
            img.id === image.id ? { ...img, x, y } : img
          )
        );
      }}
    />
  );
};

export default URLImage;
