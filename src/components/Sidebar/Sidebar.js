import React, { useRef } from 'react';
import ToolButton from './ToolButton';

const Sidebar = ({ handleTextAdd, handleImageUpload, incrementSize, decrementSize, selectedId, uploadedImages, handleAddImageToCanvas, deleteSelectedItem }) => {
  const uploadRef = useRef(null);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Tools</h1>
      </div>
      <div className="size-controls">
        <h4>Adjust Size</h4>
        <div className="size-buttons">
          <ToolButton onClick={incrementSize} disabled={!selectedId} label="+" />
          <div style={{width:'20px'}}></div>
          <ToolButton onClick={decrementSize} disabled={!selectedId} label="-" />
        </div>
      </div>
      <div className="text-area">
        <h4>Text Area:</h4>
        <ToolButton onClick={handleTextAdd} label="Add Text Box" fullWidth />
      </div>
      <div className="image-area">
        <h4>Image Area:</h4>
        <ToolButton onClick={() => uploadRef.current.click()} label="Upload Image" fullWidth />
        <input type="file" ref={uploadRef} onChange={handleImageUpload} className="file-input" />
      </div>
      <div className="uploaded-images">
        <h3>Uploaded Images:</h3>
        {uploadedImages.map((image) => (
          <div key={image.id} className="uploaded-image-container">
            <img src={image.url} alt={`Uploaded ${image.id}`} className="uploaded-image" />
            <button className="add-button" onClick={() => handleAddImageToCanvas(image)}>Add</button>
          </div>
        ))}
      </div>
      <div className="delete-area">
        <h4>Delete Selected:</h4>
        <ToolButton onClick={deleteSelectedItem} label="Delete" disabled={!selectedId} fullWidth />
      </div>
    </div>
  );
};

export default Sidebar;
