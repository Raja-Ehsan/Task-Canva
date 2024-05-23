import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Canvas from './components/Canvas/Canvas';

const App = () => {
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleTextAdd = () => {
    const text = prompt('Enter text:');
    if (text) {
      setTexts((prevTexts) => [
        ...prevTexts,
        { id: Date.now(), text, x: 300, y: 300, fontSize: 20, ref: React.createRef() },
      ]);
    }
  };

  const handleImageUpload = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setUploadedImages((prevImages) => [
      ...prevImages,
      { id: Date.now(), url }
    ]);
  };

  const handleAddImageToCanvas = (image) => {
    if (!images.some(img => img.url === image.url)) {
      setImages((prevImages) => [
        ...prevImages,
        { ...image, x: 300, y: 300, scale: 0.2, ref: React.createRef() },
      ]);
    } else {
      alert('This image is already added to the canvas.');
    }
  };

  const incrementSize = () => {
    if (selectedId) {
      setTexts((prevTexts) =>
        prevTexts.map((text) =>
          text.id === selectedId
            ? { ...text, fontSize: Math.min(text.fontSize + 5, 100) }
            : text
        )
      );
      setImages((prevImages) =>
        prevImages.map((image) =>
          image.id === selectedId
            ? { ...image, scale: Math.min(image.scale + 0.05, 1.0) }
            : image
        )
      );
    }
  };

  const decrementSize = () => {
    if (selectedId) {
      setTexts((prevTexts) =>
        prevTexts.map((text) =>
          text.id === selectedId
            ? { ...text, fontSize: Math.max(text.fontSize - 5, 10) }
            : text
        )
      );
      setImages((prevImages) =>
        prevImages.map((image) =>
          image.id === selectedId
            ? { ...image, scale: Math.max(image.scale - 0.05, 0.1) }
            : image
        )
      );
    }
  };
  
  const deleteSelectedItem = () => {
    setTexts((prevTexts) => prevTexts.filter(text => text.id !== selectedId));
    setImages((prevImages) => prevImages.filter(image => image.id !== selectedId));
    setSelectedId(null);
  };

  return (
    <>
    <h1 style={{marginLeft:'20px',color:"white"}}>Task - Canva</h1>
    <div className="app">
    <Sidebar
        handleTextAdd={handleTextAdd}
        handleImageUpload={handleImageUpload}
        incrementSize={incrementSize}
        decrementSize={decrementSize}
        selectedId={selectedId}
        images={images}
        deleteSelectedItem={deleteSelectedItem}
        uploadedImages={uploadedImages}
        handleAddImageToCanvas={handleAddImageToCanvas}
      />
      <Canvas
        texts={texts}
        images={images}
        setTexts={setTexts}
        setImages={setImages}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
    </>
  );
};

export default App;




// import React from 'react';
// import CanvasApp from './components/Canvas';
// const App = () => {
//   return (
//     <div>
//       <h1 style={{marginLeft:'20px',color:"white"}}>Task - Canva</h1>
//       <CanvasApp/>
//     </div>
//   );
// };

// export default App;
