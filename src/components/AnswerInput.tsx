import React, { useState } from 'react';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answer);
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your answer"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AnswerInput;
