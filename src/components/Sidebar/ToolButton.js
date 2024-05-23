import React from 'react';

const ToolButton = ({ onClick, label, disabled, fullWidth }) => {
  return (
    <button
      className={`tool-button ${fullWidth ? 'full-width' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ToolButton;
