import React from 'react';

const PlayerInfo = ({playerId}: {playerId: number}) => {
  return (
    <div className="flex justify-center items-center border-2 border-gray-400 p-4 w-full">
      {/* Information about the current player */}
      <p className={"font-bold text-xl"}>Player {playerId}</p>
    </div>
  );
};

export default PlayerInfo;
