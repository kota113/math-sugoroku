import React from "react";

export const FractionDisplay = ({fraction}: { fraction: string }) => {
  const [numerator, denominator] = fraction.split('/');

  return (
    <div className="inline-flex flex-col items-center">
      <div className="">{numerator}</div>
      <div className="border-b border-black w-8"></div>
      <div className="">{denominator}</div>
    </div>
  );
}
