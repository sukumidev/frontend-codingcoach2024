import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import CompileButton from './CompileButton';

const CodeEditor = ({ exercise, onSubmit }) => {
  const [code, setCode] = useState(exercise ? exercise.starter_code : '// Write your code here');

  const onChangeCode = (newValue) => {
    setCode(newValue);
  };

  const handleSubmit = () => {
    onSubmit(code);
  };

  return (
    <div>
      <h3>{exercise.question}</h3>
      <p>{exercise.description}</p>
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true,
        }}
        onChange={onChangeCode}
      />
      <CompileButton onClick={handleSubmit} />
    </div>
  );
};

export default CodeEditor;
