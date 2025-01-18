import {FaEquals} from "react-icons/fa6";
import React from "react";
import data from '../assets/specialProblems.json'
import {FractionDisplay} from "./FractionDisplay.tsx";
import {NumberDisplay} from "./NumberDisplay.tsx";
import {getOperationIcon} from "./utils.tsx";
import {Block, Problem} from "../types.ts";

const SpecialProblemDisplay = ({problem}: { problem: Problem }) => {
  return (
    <div className="flex justify-center items-center flex-wrap border-2 border-gray-400 w-3/4 m-1 rounded-lg h-full">
      <div className={"flex justify-around w-3/4 h-1/2 items-center text-2xl"}>
        <div className={"flex w-1/4"}>
          {problem.firstNumber.includes("/") ? <FractionDisplay fraction={problem.firstNumber}/> :
            <NumberDisplay number={problem.firstNumber}/>}
        </div>
        <div className={"flex w-1/4"}>
          {getOperationIcon(problem.type)}
        </div>
        <div className={"flex w-1/4"}>
          {problem.secondNumber.includes("/") ? <FractionDisplay fraction={problem.secondNumber}/> :
            <NumberDisplay number={problem.secondNumber}/>}
        </div>
        <div className={"flex w-1/4"}>
          <FaEquals/>
        </div>
      </div>
    </div>
  );
};
export default SpecialProblemDisplay;
