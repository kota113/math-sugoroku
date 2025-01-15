import React from 'react';
import {Problem} from "../types";
import {FaEquals} from "react-icons/fa6";
import {FractionDisplay} from "./FractionDisplay.tsx";
import {NumberDisplay} from "./NumberDisplay.tsx";
import {getOperationIcon} from "./utils.tsx";

const ProblemDisplay = ({ problems, selectedProblem, setSelectedProblem }: { problems: Problem[], selectedProblem: Problem | null, setSelectedProblem: (problem: Problem) => void }) => {
  return (
    <div className="flex flex-wrap border-2 border-gray-400 w-3/4 m-1 rounded-lg h-full">
      {problems.map((problem) => (
        <div className="flex justify-around w-full h-1/2 items-center" key={problem.id}>
          <input
            type="radio"
            className="flex w-1/6"
            checked={selectedProblem?.id === problem.id}
            onChange={() => setSelectedProblem(problem)}
          />
          <div className={"flex w-1/4"}>
            {problem.firstNumber.includes("/") ? <FractionDisplay fraction={problem.firstNumber}/> : <NumberDisplay number={problem.firstNumber}/> }
          </div>
          <div className={"flex w-1/6"}>
            {getOperationIcon(problem.type)}
          </div>
          <div className={"flex w-1/4"}>
            {problem.secondNumber.includes("/") ? <FractionDisplay fraction={problem.secondNumber}/> :<NumberDisplay number={problem.secondNumber}/> }
          </div>
          <div className={"flex w-1/6"}>
            <FaEquals/>
          </div>
          {/*<div className={"flex"}>*/}
          {/*  {problem.answer.includes("/") ? <FractionDisplay fraction={problem.answer}/> : problem.answer}*/}
          {/*</div>*/}
        </div>
      ))}
    </div>
  );
};
export default ProblemDisplay;
