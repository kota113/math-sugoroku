export interface Player {
  id: number;
  name: string;
  position: number;
}

export interface MathProblem {
  id: number;
  question: string;
  answer: number; // Or string if you need more complex answers
}

export interface FractionProblem {
  id: number;
  question: string;
  answer: string; // Fractions are often best represented as strings initially
}

// Consider a union type for the current problem being displayed
export type CurrentProblem = MathProblem | FractionProblem | null;

// State for the game
export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  boardSize: number;
  mathProblems: MathProblem[];
  fractionProblems: FractionProblem[];
  currentProblems: MathProblem[]; // The four problems displayed for selection
  currentFractionProblem: FractionProblem | null; // The fraction problem on the "分数ブロック"
  userAnswer: string;
  isFractionBlockActive: boolean;
  feedbackMessage: string; // To display feedback (correct/incorrect)
}
