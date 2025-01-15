import PlayerInfo from "./components/Player.tsx";
import ProblemDisplay from "./components/ProblemDisplay.tsx";
import AnswerInput from "./components/AnswerInput.tsx";
import Board from "./components/Board.tsx";
import {GameManager} from "./gameManager.ts";
import {BLOCKS} from "./blocks.ts";
import problemsData from './assets/problems.json'
import {PathWay, Problem} from "./types.ts";
import {useEffect, useMemo, useState} from "react";
import {FaArrowRight, FaX} from "react-icons/fa6";
import SpecialProblemDisplay from "./components/SpecialProblemDisplay.tsx";

function App() {
  const gameManager = useMemo(() => new GameManager(BLOCKS, problemsData as Problem[], 1), [])
  const [problems, setProblems] = useState<Problem[]>([]);
  const [pathWays, setPathWays] = useState<PathWay[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [answerBtnColour, setAnswerBtnColour] = useState<'green' | 'red'>('green');
  const [answerInput, setAnswerInput] = useState<string>("");
  useEffect(() => {
    setProblems(gameManager.getRandomProblems(2))
    setPathWays(gameManager.pathways)
    setCurrentPosition(1)
  }, [gameManager]);
  const moveGradually = (steps: number) => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps) {
        const newPositon = currentPosition + 1;
        setCurrentPosition(newPositon);
        gameManager.movePlayer(1);
        const block = BLOCKS.filter((block) => (block.id == newPositon))[0];
        if (block.type !== "normal") {
          clearInterval(interval);
          return;
        }
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 200); // 200ms between each step
  };

  function answerProblem() {
    const correctAnswer = selectedProblem?.answer;
    setAnswerInput("");
    setSelectedProblem(null);
    if (answerInput == correctAnswer) {
      // Handle correct answer
      moveGradually(Number(selectedProblem?.answer));
      gameManager.movePlayer(Number(selectedProblem?.answer));
      setProblems(gameManager.getRandomProblems(2))
    } else {
      // Handle incorrect answer
      setProblems(gameManager.getRandomProblems(2))
      setAnswerBtnColour("red")
      gameManager.switchPlayer()
      setTimeout(() => {
        setAnswerBtnColour('green')
      }, 1000);
    }
  }

  const block = BLOCKS.filter((block) => (block.id == currentPosition + 1))[0];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start">
      <div className="w-4/5 flex max-w-screen-xl h-screen bg-white shadow-md rounded-lg overflow-hidden">
        {/* Player Info (Side Bar) */}
        <div className="flex w-1/4">
          <PlayerInfo/>
        </div>

        {/* Main Game Area */}
        <div className="flex flex-col w-3/4">
          <Board currentPosition={currentPosition} pathWays={pathWays}/>
          <div className={"flex flex-row justify-between"}>
            {block.type == "divide" ? <SpecialProblemDisplay block={block}/> :
              <ProblemDisplay problems={problems} selectedProblem={selectedProblem}
                              setSelectedProblem={setSelectedProblem}/>
            }
            <div className={"flex w-1/4"}>
              <AnswerInput answer={answerInput} setAnswer={setAnswerInput}/>
              <div
                onClick={answerProblem}
                className={`flex h-full w-1/4 ${answerBtnColour == 'green' ? "bg-green-500" : "bg-red-500"} rounded-xl mx-2 items-center justify-center cursor-pointer transition-all`}>
                {answerBtnColour == "green" ? <FaArrowRight color={"white"} size={18}/> :
                  <FaX color={"white"} size={18}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
    ;
}

export default App;
