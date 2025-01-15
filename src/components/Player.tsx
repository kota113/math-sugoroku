import React from 'react';

const PlayerInfo = ({playerId}: {playerId: number}) => {
  return (
    <div className="border-2 border-gray-400 p-4 w-full">
      {/* Information about the current player */}
      Player {playerId}
    </div>
  );
};

export default PlayerInfo;
