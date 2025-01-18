import React from 'react';

const AnswerInput = ({answer, setAnswer}: {answer: string, setAnswer: (answer: string) => void}) => {
  return (
    <div className="flex justify-center items-center h-full border-4 border-red-400 w-2/3 p-4 rounded-lg m-1">
      <input className={"w-full h-24 border-2 border-gray-700 text-2xl text-center"} value={answer} onChange={(e) => setAnswer(e.target.value)}/>
    </div>
  );
};

export default AnswerInput;
