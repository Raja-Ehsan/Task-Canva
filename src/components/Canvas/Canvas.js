import React, { useRef } from 'react';
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

  const changeCursorPointer = (e) => {
    const container = e.target.getStage().container();
    container.style.cursor = 'pointer';
  };

  const changeCursorDefault = (e) => {
    const container = e.target.getStage().container();
    container.style.cursor = 'default';
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
              onMouseEnter={changeCursorPointer}
              onMouseLeave={changeCursorDefault}
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
            <URLImage key={image.id} image={image} setImages={setImages} imageclick={handleImageClick} 
            mouseEnter={changeCursorPointer}
            mouseLeave={changeCursorDefault} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
