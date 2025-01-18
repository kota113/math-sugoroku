import React from 'react';
import {Problem} from "../types";
import {FaEquals} from "react-icons/fa6";
import {FractionDisplay} from "./FractionDisplay.tsx";
import {NumberDisplay} from "./NumberDisplay.tsx";
import {getOperationIcon} from "./utils.tsx";

const ProblemDisplay = ({ problems, selectedProblem, setSelectedProblem }: { problems: Problem[], selectedProblem: Problem | null, setSelectedProblem: (problem: Problem) => void }) => {
  return (
    <div className="flex flex-wrap w-3/4 m-1 rounded-lg h-full bg-red-50 border-red-400 border-4">
      {problems.map((problem) => (
        <div className="flex justify-around w-full h-1/2 items-center text-3xl text-center" key={problem.id}>
          <input
            type="radio"
            className="flex w-1/6"
            checked={selectedProblem == problem}
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
        </div>
      ))}
    </div>
  );
};
export default ProblemDisplay;
