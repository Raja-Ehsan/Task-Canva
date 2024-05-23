import React, { useRef, useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import URLImage from './URLImage';

const Canvas = ({ texts, images, setTexts, setImages, selectedId, setSelectedId }) => {
  const stageRef = useRef(null);

  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const handleImageClick = (id) => {
    setSelectedId(id);
  };

  const handleTextClick = (id) => {
    setSelectedId(id);
  };

  const handleTextDoubleClick = (id) => {
    const newText = prompt('Edit text:', texts.find((text) => text.id === id)?.text);
    if (newText !== null) {
      setTexts((prevTexts) =>
        prevTexts.map((text) =>
          text.id === id ? { ...text, text: newText } : text
        )
      );
    }
  };

  return (
    <div className="canvas-container">
      <Stage width={600} height={650} style={{ backgroundColor: 'white' }} ref={stageRef} onClick={handleStageClick}>
        <Layer>
          {texts.map((text) => (
            <Text
              key={text.id}
              ref={text.ref}
              text={text.text}
              x={text.x}
              y={text.y}
              fontSize={text.fontSize}
              draggable
              onClick={() => handleTextClick(text.id)}
              onDblClick={() => handleTextDoubleClick(text.id)}
              onDragEnd={(e) => {
                const { x, y } = e.target.position();
                setTexts((prevTexts) =>
                  prevTexts.map((txt) =>
                    txt.id === text.id ? { ...txt, x, y } : txt
                  )
                );
              }}
            />
          ))}
          {images.map((image) => (
            <URLImage key={image.id} image={image} setImages={setImages} imageclick={handleImageClick} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
