import React from 'react';

const AnswerInput = ({answer, setAnswer}: {answer: string, setAnswer: (answer: string) => void}) => {
  return (
    <div className="flex h-full border-2 border-gray-400 w-2/3 p-4 rounded-lg">
      <input className={"w-full h-24 border-2 border-gray-700 text-xl text-center"} value={answer} onChange={(e) => setAnswer(e.target.value)}/>
    </div>
  );
};

export default AnswerInput;
