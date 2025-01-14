import React from 'react';
import MathProblemDisplay from './MathProblemDisplay';
import Player from './Player';
import AnswerInput from './AnswerInput';

const GameBoard: React.FC = () => {
  const handleAnswerSubmit = (answer: string) => {
    console.log(`Answer submitted: ${answer}`);
    // Implement logic to check answer and update game state
  };

  return (
    <div>
      <h1>Math Adventure Sugoroku!</h1>
      <Player name="Player 1" position={0} />
      <Player name="Player 2" position={0} />
    <div>
      <h1>Math Adventure Sugoroku!</h1>
      {/* Add board layout and components here */}
      <MathProblemDisplay />
      <MathProblemDisplay />
      <AnswerInput onSubmit={handleAnswerSubmit} />
    </div>
  );
};

export default GameBoard;
