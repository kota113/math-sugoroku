import React from 'react';
import {BLOCKS} from "../blocks.ts";
import {PathWay} from "../types.ts";
import './Board.css'

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

const Board = ({currentPosition, pathWays}: { currentPosition: number, pathWays: PathWay[] }) => {
  if (pathWays.length === 0) return null;
  return (
    <div className="flex border-2 border-gray-400 p-4 w-full h-3/4 m-1 rounded-lg">
      <div className="grid grid-cols-12 gap-1 w-full h-full">
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
            const imageSrc = nextPathWay ? 'bend.svg': 'straight.svg';
            const rotateClass = getRotation(currentPathWay, nextPathWay);
            return (
              <div
                key={index}
                className={`border-2 border-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors ${currentPosition == blockIndex ? `bg-blue-300` : 'bg-white'}`}
              >
                <img alt={""} src={imageSrc} className={`w-14 h-14 ${rotateClass} orange-filter`}/>
              </div>
            )
        })}
      </div>
    </div>
  );
};

export default Board;
