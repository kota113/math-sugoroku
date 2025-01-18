import React from 'react';
import {BLOCKS} from "../blocks.ts";
import {PathWay} from "../types.ts";
import './Board.css'
import {FaAnglesUp, FaDivide} from "react-icons/fa6";

const ringColors = {
  0: 'border-red-500 border-4',
  1: 'border-blue-500 border-4',
  2: 'border-emerald-500 border-4',
  3: 'border-purple-500 border-4',
  4: 'border-amber-500 border-4',
  5: 'border-fuchsia-500 border-4'
}


function listPathWayBlocks(pathWay: PathWay) {
  const pathWayBlocks = [];
  if (pathWay.direction === 'horizontal') {
    if (pathWay.operation === 'increment') {
      for (let i = 0; i < pathWay.length; i++) {
        pathWayBlocks.push(pathWay.startBlockId + i);
      }
    } else {
      for (let i = 0; i < pathWay.length; i++) {
        pathWayBlocks.push(pathWay.startBlockId - i);
      }
    }
  } else {
    if (pathWay.operation === 'increment') {
      for (let i = 0; i < pathWay.length; i++) {
        pathWayBlocks.push(pathWay.startBlockId + (i * 12));
      }
    } else {
      for (let i = 0; i < pathWay.length; i++) {
        pathWayBlocks.push(pathWay.startBlockId - (i * 12));
      }
    }
  }
  return pathWayBlocks;
}

function getRotation(currentPathWay: PathWay, nextPathWay: PathWay | null) {
  let rotateClass = '';
  if (nextPathWay) {
    if (currentPathWay.direction == "horizontal") {
      if (currentPathWay.operation == "increment") {
        if (nextPathWay.operation == "increment") {
          rotateClass = '';
        } else rotateClass = 'rotate-90';
      } else {
        if (nextPathWay.operation == "increment") {
          rotateClass = '-rotate-90';
        } else rotateClass = 'rotate-180';
      }
    } else {
      if (currentPathWay.operation == "increment") {
        if (nextPathWay.operation == "increment") {
          rotateClass = 'rotate-180';
        } else rotateClass = 'rotate-90';
      } else {
        if (nextPathWay.operation == "increment") {
          rotateClass = '-rotate-90';
        } else rotateClass = '';
      }
    }
  } else {
    if (currentPathWay.direction == "horizontal") {
      if (currentPathWay.operation == "increment") {
        rotateClass = '';
      } else rotateClass = 'rotate-180';
    } else {
      if (currentPathWay.operation == "increment") {
        rotateClass = 'rotate-90';
      } else rotateClass = '-rotate-90';
    }
  }
  return rotateClass;
}

const Board = ({currentPosition, pathWays, currentPlayerId}: {
  currentPosition: Record<number, number>,
  pathWays: PathWay[],
  currentPlayerId: number
}) => {
  if (pathWays.length === 0) return null;
  return (
    <div className="grid grid-cols-12 gap-1 border-8 border-yellow-400 bg-yellow-50 p-4 w-full h-3/4 rounded-xl">
      {[...Array(96)].map((_, index) => {
        const block = BLOCKS.filter((block) => (block.id == index + 1))?.[0];
        if (!block) return (
          <div
            key={index}
            className={'opacity-0'}
          >
            {index + 1}
          </div>
        )
        const blockIndex = BLOCKS.findIndex((block) => (block.id == index + 1));
        const involvedPathWays = pathWays.filter((pathWay) => (listPathWayBlocks(pathWay).includes(block.id)))
        const currentPathWay = involvedPathWays[0];
        const nextPathWay = involvedPathWays[1];
        const imageSrc = nextPathWay ? 'bend.svg' : 'straight.svg';
        const rotateClass = getRotation(currentPathWay, nextPathWay);
        const filterClass = block.type == "normal" ? `black-filter` : block.type == "event" ? 'orange-filter' : 'green-filter';
        const bgColour = block.type == "normal" ? 'bg-white' : block.type == "event" ? 'bg-orange-100' : 'bg-green-100';
        let ringColor =
          currentPosition[0] == blockIndex ? 'border-red-500 border-4' :
            currentPosition[1] == blockIndex ? 'border-blue-500 border-4' :
              currentPosition[2] == blockIndex ? 'border-emerald-500 border-4' :
                currentPosition[3] == blockIndex ? 'border-purple-500 border-4' :
                  currentPosition[4] == blockIndex ? 'border-amber-500 border-4' :
                    currentPosition[5] == blockIndex ? 'border-fuchsia-500 border-4' :
                      'border-gray-500';
        ringColor = currentPosition[currentPlayerId] == blockIndex ? ringColors[currentPlayerId] : ringColor
        const currentPlayerBg = currentPosition[currentPlayerId] == blockIndex ?
          currentPosition[0] == blockIndex ? 'bg-red-200' :
            currentPosition[1] == blockIndex ? 'bg-blue-200' :
              currentPosition[2] == blockIndex ? 'bg-emerald-200' :
                currentPosition[3] == blockIndex ? 'bg-purple-200' :
                  currentPosition[4] == blockIndex ? 'bg-amber-200' :
                    currentPosition[5] == blockIndex ? 'bg-fuchsia-200' :
                      'border-gray-500' : ""
        return (
          <div
            key={index}
            className={`relative w-16 h-16 border-2 ${ringColor} rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors ${currentPosition[currentPlayerId] == blockIndex ? currentPlayerBg : bgColour}`}
          >
            <img alt={""} src={imageSrc} className={`absolute z-10 w-16 h-16 ${rotateClass} ${filterClass}`}/>
            {
              block.type === "divide" ?
                <FaDivide className={"absolute z-20 stroke-neutral-950"} color={"green"} size={40}/> :
                block.type === "event" ?
                  <FaAnglesUp className={"absolute z-20 stroke-black"} style={{strokeWidth: 4}}
                              color={"#ffb374"} size={35}
                  /> : null
            }
          </div>
        )
      })}
    </div>
  )
    ;
};

export default Board;
