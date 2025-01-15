import React from "react";

export const NumberDisplay = ({number}: { number: string }) => {
  return (
    <div className="inline-flex flex-col items-center justify-center">
      <div className="">{number}</div>
    </div>
  );
}
