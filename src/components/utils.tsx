import {FaDivide, FaMinus, FaPlus, FaQuestion} from "react-icons/fa6";
import {FaTimes} from "react-icons/fa";
import React from "react";

export function getOperationIcon(operation: string) {
  switch (operation) {
    case "add":
      return <FaPlus/>
    case "subtract":
      return <FaMinus/>
    case "multiply":
      return <FaTimes/>
    case "divide":
      return <FaDivide/>
    default:
      return <FaQuestion/>
  }
}
