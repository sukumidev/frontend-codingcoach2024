import React from 'react';
import '../styles.css'

const CompileButton = ({ onClick }) => {
  return (
    <button className="submit-button" onClick={onClick}>
      Submit
    </button>
  );
};

export default CompileButton;
