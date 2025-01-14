import React, { useState } from 'react';
import {FractionProblem, GameState, MathProblem, Player} from "../types.ts";

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [
      { id: 1, name: 'Player 1', position: 0 },
      { id: 2, name: 'Player 2', position: 0 },
    ],
    currentPlayerIndex: 0,
    boardSize: 30, // Example board size
    mathProblems: [
      // ... your math problems
      { id: 1, question: '5 + 3', answer: 8 },
      { id: 2, question: '10 - 4', answer: 6 },
      { id: 3, question: '2 x 6', answer: 12 },
      { id: 4, question: '15 / 3', answer: 5 },
    ],
    fractionProblems: [
      // ... your fraction problems
      { id: 1, question: '1/2 + 1/4', answer: '3/4' },
      { id: 2, question: '3/5 - 1/5', answer: '2/5' },
    ],
    currentProblems: [], // Will be populated at the start of each turn
    currentFractionProblem: null,
    userAnswer: '',
    isFractionBlockActive: false,
    feedbackMessage: '',
  });

  // Helper functions to update the game state safely
  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  };

  const getCurrentPlayer = () => gameState.players[gameState.currentPlayerIndex];

  const moveToNextPlayer = () => {
    updateGameState({
      currentPlayerIndex: (gameState.currentPlayerIndex + 1) % gameState.players.length,
      currentProblems: [], // Clear problems for the next turn
      feedbackMessage: '',
    });
    generateMathProblems(); // Generate new problems for the next player
  };

  const generateMathProblems = () => {
    // Logic to randomly select 4 math problems from gameState.mathProblems
    const shuffledProblems = [...gameState.mathProblems].sort(() => 0.5 - Math.random());
    updateGameState({ currentProblems: shuffledProblems.slice(0, 4) });
  };

  const handleProblemSelection = (selectedProblem: MathProblem) => {
    // (Potentially highlight the selected problem)
  };

  const handleAnswerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateGameState({ userAnswer: event.target.value });
  };

  const handleSubmitAnswer = () => {
    const currentPlayer = getCurrentPlayer();

    if (gameState.isFractionBlockActive && gameState.currentFractionProblem) {
      if (gameState.userAnswer === gameState.currentFractionProblem.answer) {
        updateGameState({
          isFractionBlockActive: false,
          currentFractionProblem: null,
          feedbackMessage: 'Correct!',
        });
        moveToNextPlayer(); // Allow movement on the *next* turn
      } else {
        updateGameState({ feedbackMessage: 'Incorrect. You stay on the block and miss your next turn.' });
        moveToNextPlayer(); // Move to the next player, effectively skipping the current player's next turn
      }
    } else if (!gameState.isFractionBlockActive) {
      const selectedProblem = gameState.currentProblems.find(
        (problem) => problem.id === parseInt(gameState.userAnswer, 10) // Assuming problem ID is used for selection
      );

      if (selectedProblem && parseInt(gameState.userAnswer, 10) === selectedProblem.answer) {
        const newPosition = Math.min(
          currentPlayer.position + selectedProblem.answer,
          gameState.boardSize - 1
        );
        const updatedPlayers = gameState.players.map((player) =>
          player.id === currentPlayer.id ? { ...player, position: newPosition } : player
        );

        updateGameState({ players: updatedPlayers, feedbackMessage: 'Correct!' });

        // Check if landed on "分数ブロック"
        if (newPosition === /* The index of your "分数ブロック" */ 5) {
          activateFractionBlock();
        } else {
          moveToNextPlayer();
        }
      } else {
        updateGameState({ feedbackMessage: 'Incorrect. No movement.' });
        moveToNextPlayer();
      }
    }

    updateGameState({ userAnswer: '' }); // Clear the input
  };

  const activateFractionBlock = () => {
    // Logic to select a random fraction problem
    const randomFractionProblem =
      gameState.fractionProblems[Math.floor(Math.random() * gameState.fractionProblems.length)];
    updateGameState({
      isFractionBlockActive: true,
      currentFractionProblem: randomFractionProblem,
      feedbackMessage: 'You landed on a 分数ブロック! Solve the problem.',
    });
  };

  React.useEffect(() => {
    if (gameState.currentProblems.length === 0) {
      generateMathProblems();
    }
  }, [gameState.currentPlayerIndex]);

  return (
    <div>
      <h1>Math Adventure Sugoroku!</h1>
      <Board players={gameState.players} boardSize={gameState.boardSize} />

      <MathProblemDisplay
        problems={gameState.isFractionBlockActive ? [gameState.currentFractionProblem] : gameState.currentProblems}
        onSelectProblem={handleProblemSelection}
        isFractionBlockActive={gameState.isFractionBlockActive}
      />

      <AnswerInput
        value={gameState.userAnswer}
        onChange={handleAnswerInputChange}
        onSubmit={handleSubmitAnswer}
        isFractionBlockActive={gameState.isFractionBlockActive}
      />

      <p>{`Current Player: ${getCurrentPlayer().name}`}</p>
      {gameState.feedbackMessage && <p>{gameState.feedbackMessage}</p>}
    </div>
  );
};

const Board: React.FC<{ players: Player[]; boardSize: number }> = ({ players, boardSize }) => {
  const squares = Array.from({ length: boardSize }, (_, index) => index);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(10, 50px)`, gap: '5px' }}>
      {squares.map((index) => (
        <div
          key={index}
          style={{
            width: '50px',
            height: '50px',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: index === 5 ? 'yellow' : 'white', // Example "分数ブロック"
          }}
        >
          {players.map(
            (player) =>
              player.position === index && <div key={player.id}>P{player.id}</div>
          )}
        </div>
      ))}
    </div>
  );
};

const MathProblemDisplay: React.FC<{
  problems: (MathProblem | FractionProblem | null)[];
  onSelectProblem?: (problem: MathProblem) => void;
  isFractionBlockActive: boolean;
}> = ({ problems, onSelectProblem, isFractionBlockActive }) => {
  return (
    <div>
      <h3>{isFractionBlockActive ? '分数ブロック Problem' : 'Choose a Math Problem'}</h3>
      {problems.map((problem) => {
        if (problem) {
          return (
            <div key={problem.id}>
              {isFractionBlockActive ? problem.question : `${problem.id}. ${problem.question}`}
              {!isFractionBlockActive && onSelectProblem && (
                <button onClick={() => onSelectProblem(problem as MathProblem)}>Select</button>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const AnswerInput: React.FC<{
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isFractionBlockActive: boolean;
}> = ({ value, onChange, onSubmit, isFractionBlockActive }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={isFractionBlockActive ? 'Enter your fraction answer' : 'Enter the problem number'}
      />
      <button onClick={onSubmit}>Submit Answer</button>
    </div>
  );
};

export default Game;
