import {FaEquals} from "react-icons/fa6";
import React from "react";
import data from '../assets/specialProblems.json'
import {FractionDisplay} from "./FractionDisplay.tsx";
import {NumberDisplay} from "./NumberDisplay.tsx";
import {getOperationIcon} from "./utils.tsx";
import {Block} from "../types.ts";

const SpecialProblemDisplay = ({ block }: { block: Block }) => {
  const problem = data[block.id.toString()];
  return (
    <div className="flex justify-around w-full h-full items-center">
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
      {/*<div className={"flex"}>*/}
      {/*  {problem.answer.includes("/") ? <FractionDisplay fraction={problem.answer}/> : problem.answer}*/}
      {/*</div>*/}
    </div>
  );
};
export default SpecialProblemDisplay;
