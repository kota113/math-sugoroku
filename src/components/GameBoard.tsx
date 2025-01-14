import React from 'react';

const GameBoard: React.FC = () => {
  return (
    <div>
      <h1>Math Adventure Sugoroku!</h1>
      {/* Add board layout and components here */}
      <MathProblemDisplay />
    </div>
  );
};

export default GameBoard;
import MathProblemDisplay from './MathProblemDisplay';
