import {useState} from "react";
import {FaArrowRight} from "react-icons/fa6";

export default function PlayerCount({setPlayerCount}: {
  setPlayerCount: (count: number) => void
}) {
  const [input, setInput] = useState<string>()
  return (
    <div className={"relative flex w-full bg-gray-500 h-screen justify-center items-center"}>
      <div className={"flex flex-col w-96 bg-white rounded-2xl"}>
        <p className={"text-2xl text-center"}>何人で遊びますか？</p>
        <div className={"flex flex-row justify-center"}>
          <input className={"flex border-2 p-2 m-2 rounded w-1/4"} onChange={(event) => setInput(event.target.value)}/>
          <FaArrowRight size={45} className={"cursor-pointer bg-gray-300 m-4 ml-0 p-2 rounded-xl top-1/2 left-1/2 text-2xl"} onClick={() => setPlayerCount(Number(input))}/>
        </div>
      </div>
    </div>
  )
}
