import PlayerInfo from "./components/Player.tsx";
import ProblemDisplay from "./components/ProblemDisplay.tsx";
import AnswerInput from "./components/AnswerInput.tsx";
import Board from "./components/Board.tsx";
import {GameManager} from "./gameManager.ts";
import {BLOCKS} from "./blocks.ts";
import problemsData from './assets/problems.json'
import {Block, PathWay, Problem} from "./types.ts";
import {useEffect, useMemo, useState} from "react";
import {FaArrowRight, FaX} from "react-icons/fa6";
import SpecialProblemDisplay from "./components/SpecialProblemDisplay.tsx";
import data from "./assets/specialProblems.json";
import generateProblems from "./components/utils/generateProblems.ts";
import SwitchPlayerModal from "./components/modals/SwitchPlayerModal.tsx";
import GameClearModal from "./components/modals/GameClearModal.tsx";
import LevelUpModal from "./components/modals/LevelUpModal.tsx";

function App() {
  const gameManager = useMemo(() => new GameManager(BLOCKS, problemsData as Problem[], 1), [])
  const [switchPlayerModalVisible, setSwitchPlayerModalVisible] = useState(false);
  const [levelUpModalVisible, setLevelUpModalVisible] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [pathWays, setPathWays] = useState<PathWay[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [gameClearedPlayer, setGameClearedPlayer] = useState<number[]>([])
  const [specialProblem, setSpecialProblem] = useState<Problem | null>(null);
  const [block, setBlock] = useState<Block>();
  const [level, setLevel] = useState<'easy' | 'normal' | 'hard'>('easy');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Record<number, number>>({
    0: 67,
    1: 67
  });
  const [answerBtnColour, setAnswerBtnColour] = useState<'green' | 'red'>('green');
  const [answerInput, setAnswerInput] = useState<string>("");
  async function showLevelUpModal() {
    setLevelUpModalVisible(true);
    await sleep(1500);
    setLevelUpModalVisible(false);
  }
  useEffect(() => {
    setPathWays(gameManager.pathways)
  }, [gameManager]);
  useEffect(() => {
    async function _() {
      const block = BLOCKS[currentPosition[currentPlayer]];
      setBlock(block);
      setSpecialProblem(data[currentPosition[currentPlayer]]??null as Problem|null)
      const newLevel = currentPosition[currentPlayer] >= 15? 'normal': currentPosition[currentPlayer] >= 50? 'hard': 'easy'
      if (level != newLevel) {
        if ((level == 'easy' && ['normal', 'hard'].includes(newLevel)) || (level == 'normal' && newLevel == 'hard'))
        await showLevelUpModal();
      }
      setLevel(newLevel)
      setProblems(generateProblems(newLevel, 2))
      if (currentPosition[currentPlayer] >= 68) {
        setGameClearedPlayer((_prev) => [..._prev, currentPlayer]);
      }
    }
    _().then();
  }, [currentPlayer, currentPosition, gameManager, level]);
  const moveGradually = (steps: number) => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps) {
        setCurrentPosition(prev => ({
          ...prev,
          [currentPlayer]: prev[currentPlayer] + 1
        }));
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 200); // 200ms between each step
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function answerProblem() {
    const correctAnswer = !specialProblem? selectedProblem?.answer : specialProblem.answer;
    let moveForwardCount = parseInt(correctAnswer);
    // if there's a block with the type "divide" or "event" in the way, reduce the moveForwardCount to the number of blocks in the way
    // todo: 負の数に対応する
    const divideBlocks = BLOCKS.filter((block, index) => (block.type === "divide")&&index>currentPosition[currentPlayer]&&index<=currentPosition[currentPlayer]+parseInt(correctAnswer));
    if (divideBlocks.length > 0) {
      moveForwardCount = BLOCKS.findIndex((block) => block == divideBlocks[0]) - currentPosition[currentPlayer]
    }
    setAnswerInput("");
    setSelectedProblem(null);
    if (answerInput == correctAnswer) {
      // Handle correct answer
      moveGradually(moveForwardCount);
      await sleep(moveForwardCount*200+1000);
      setCurrentPlayer((currentPlayer+1)%2)
      // setProblems(gameManager.getRandomProblems(2, level))
    } else {
      // Handle incorrect answer
      // setProblems(gameManager.getRandomProblems(2, level))
      setAnswerBtnColour("red")
      await sleep(moveForwardCount*200+500);
      setCurrentPlayer((currentPlayer+1)%2)
      setTimeout(() => {
        setAnswerBtnColour('green')
      }, 1000);
    }
    if (gameClearedPlayer.length > 0) return
    setSwitchPlayerModalVisible(true);
    await sleep(1500);
    setSwitchPlayerModalVisible(false);
  }

  return (
    <div className="relative min-h-screen bg-gray-100 flex justify-center items-start">
      <div className="flex max-w-screen-2xl h-screen bg-white shadow-md rounded-lg overflow-hidden">
        {/* Main Game Area */}
        <div className="flex flex-col w-full">
          <PlayerInfo playerId={currentPlayer}/>
          <Board currentPosition={currentPosition} pathWays={pathWays} currentPlayerId={currentPlayer} />
          <div className={"flex flex-row justify-between"}>
            {block?.type == "divide" ? <SpecialProblemDisplay problem={specialProblem}/> :
              <ProblemDisplay problems={problems} selectedProblem={selectedProblem}
                              setSelectedProblem={setSelectedProblem}/>
            }
            <div className={"flex w-1/4"}>
              <AnswerInput answer={answerInput} setAnswer={setAnswerInput}/>
              <div
                onClick={answerProblem}
                className={`flex m-1 h-full w-1/4 ${answerBtnColour == 'green' ? "bg-green-500" : "bg-red-500"} rounded-xl items-center justify-center cursor-pointer transition-all`}>
                {answerBtnColour == "green" ? <FaArrowRight color={"white"} size={18}/> :
                  <FaX color={"white"} size={18}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <LevelUpModal isVisible={levelUpModalVisible}/>
      <GameClearModal playerName={gameClearedPlayer[0]?.toString()} isVisible={gameClearedPlayer.length > 0}/>
      <SwitchPlayerModal playerName={currentPlayer.toString()} isVisible={switchPlayerModalVisible && gameClearedPlayer.length == 0}/>
    </div>
  );
}

export default App;
